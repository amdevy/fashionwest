const crypto = require('crypto');
const getRawBody = require('raw-body');
const QRCode = require('qrcode');
const generate = require('nanoid/generate');
const { Resend } = require('resend');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

async function getSheet() {
  const creds = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  const auth = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
}

function verifySignature(payload, secretKey) {
  const signString = [
    payload.merchantAccount,
    payload.orderReference,
    payload.amount,
    payload.currency,
    payload.authCode,
    payload.cardPan,
    payload.transactionStatus,
    payload.reasonCode,
  ].join(';');
  return crypto.createHmac('md5', secretKey).update(signString).digest('hex');
}

function buildResponse(orderReference, secretKey) {
  const status = 'accept';
  const time = Math.floor(Date.now() / 1000);
  const signString = `${orderReference};${status};${time}`;
  const signature = crypto.createHmac('md5', secretKey).update(signString).digest('hex');
  return { orderReference, status, time, signature };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let payload;
  try {
    const rawBody = await getRawBody(req);
    payload = JSON.parse(rawBody.toString());
  } catch (err) {
    console.error('Body parse error:', err);
    return res.status(400).json({ error: 'Bad request' });
  }

  // Verify WayForPay signature
  const expectedSig = verifySignature(payload, process.env.WAYFORPAY_MERCHANT_SECRET_KEY);
  if (expectedSig !== payload.merchantSignature) {
    console.error('Invalid WayForPay signature');
    return res.status(400).json({ error: 'Invalid signature' });
  }

  if (payload.transactionStatus === 'Approved') {
    try {
      const sheet = await getSheet();
      const rows = await sheet.getRows();
      const row = rows.find((r) => r.get('Order ID') === payload.orderReference);

      if (!row) {
        console.error('Order not found:', payload.orderReference);
      } else {
        // Generate ticket code and QR
        const ticketCode = generate(ALPHABET, 8);
        const qrBuffer = await QRCode.toBuffer(ticketCode, { width: 400, margin: 2 });

        // Update row
        row.set('Status', 'paid');
        row.set('Ticket Code', ticketCode);
        row.set('Payment Date', new Date().toLocaleString('uk-UA'));
        await row.save();

        // Send email
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: row.get('Email'),
          subject: 'Ваш квиток Fashion West Ukraine 2026',
          html: `
            <p>Вітаємо, ${row.get('Full Name')}!</p>
            <p>Ваш квиток категорії <strong>${row.get('Category')}</strong> підтверджено.</p>
            <p>Код квитка: <strong>${ticketCode}</strong></p>
            <p>Пред'явіть QR-код на вході у день події.</p>
            <p>До зустрічі 2 травня в Darlin', Мукачево!</p>
          `,
          attachments: [{ filename: 'ticket-qr.png', content: qrBuffer }],
        });
      }
    } catch (err) {
      console.error('Webhook processing error:', err);
    }
  }

  // REQUIRED: always send signed response or WayForPay will keep retrying
  return res.status(200).json(
    buildResponse(payload.orderReference, process.env.WAYFORPAY_MERCHANT_SECRET_KEY)
  );
};
