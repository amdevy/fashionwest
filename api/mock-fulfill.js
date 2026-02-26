// DEV ONLY — simulates the webhook flow without a real WayForPay payment
const QRCode = require('qrcode');
const generate = require('nanoid/generate');
const nanoid = require('nanoid');
const { Resend } = require('resend');
const { GoogleSpreadsheet } = require('google-spreadsheet');

async function getSheet() {
  const creds = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

module.exports = async function handler(req, res) {
  console.log('[mock-fulfill] called', req.method);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, ticketType, amount } = req.body;
  console.log('[mock-fulfill] body:', { name, phone, email, ticketType, amount });

  if (!name || !phone || !email || !ticketType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const order_id = nanoid();
    const ticketCode = generate(ALPHABET, 8);

    // Write paid row directly to Sheets
    const sheet = await getSheet();
    await sheet.addRow({
      'Order ID': order_id,
      'Event': 'Fashion West Ukraine 2026',
      'Category': ticketType,
      'Full Name': name,
      'Phone': phone,
      'Email': email,
      'Payment Date': new Date().toLocaleString('uk-UA'),
      'Status': 'paid',
      'Ticket Code': ticketCode,
      'Checked In': 'No',
      'Entry Time': '',
    });

    // Generate QR
    const qrBuffer = await QRCode.toBuffer(ticketCode, { width: 400, margin: 2 });

    // Send email
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: 'Ваш квиток Fashion West Ukraine 2026',
      html: `
        <p>Вітаємо, ${name}!</p>
        <p>Ваш квиток категорії <strong>${ticketType}</strong> підтверджено.</p>
        <p>Код квитка: <strong>${ticketCode}</strong></p>
        <p>Пред'явіть QR-код на вході у день події.</p>
        <p>До зустрічі 2 травня в Darlin', Мукачево!</p>
      `,
      attachments: [
        {
          filename: 'ticket-qr.png',
          content: qrBuffer,
        },
      ],
    });

    console.log('[mock-fulfill] done, ticketCode:', ticketCode);
    return res.status(200).json({ ok: true, ticketCode });
  } catch (err) {
    console.error('mock-fulfill error:', err);
    return res.status(500).json({ error: err.message });
  }
};
