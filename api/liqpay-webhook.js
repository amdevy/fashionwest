const crypto = require('crypto');
const getRawBody = require('raw-body');
const qs = require('querystring');
const QRCode = require('qrcode');
const generate = require('nanoid/generate');
const { Resend } = require('resend');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

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

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const privateKey = process.env.LIQPAY_PRIVATE_KEY;

  // Read raw body (x-www-form-urlencoded)
  let rawBody;
  try {
    rawBody = await getRawBody(req);
  } catch (err) {
    console.error('Raw body error:', err);
    return res.status(400).send('Bad request');
  }

  const parsed = qs.parse(rawBody.toString());
  const { data, signature } = parsed;

  if (!data || !signature) {
    return res.status(400).send('Missing data or signature');
  }

  // Verify signature
  const expectedSignature = crypto
    .createHash('sha1')
    .update(privateKey + data + privateKey)
    .digest('base64');

  if (expectedSignature !== signature) {
    console.error('Invalid LiqPay signature');
    return res.status(400).send('Invalid signature');
  }

  // Decode payload
  let payload;
  try {
    payload = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
  } catch (err) {
    console.error('Payload decode error:', err);
    return res.status(400).send('Invalid data');
  }

  if (payload.status !== 'success') {
    // Not a successful payment — acknowledge and exit
    return res.status(200).send('ok');
  }

  const { order_id } = payload;

  try {
    const sheet = await getSheet();
    const rows = await sheet.getRows();
    const row = rows.find((r) => r.get('Order ID') === order_id);

    if (!row) {
      console.error('Order not found in sheet:', order_id);
      return res.status(200).send('ok');
    }

    // Generate ticket code
    const ticketCode = generate(ALPHABET, 8);

    // Generate QR code as buffer
    const qrBuffer = await QRCode.toBuffer(ticketCode, { width: 400, margin: 2 });

    // Update sheet row
    row.set('Status', 'paid');
    row.set('Ticket Code', ticketCode);
    row.set('Payment Date', new Date().toLocaleString('uk-UA'));
    await row.save();

    // Send email with QR attachment
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: row.get('Email'),
      subject: 'Your Fashion West Ticket',
      html: `
        <p>Hello ${row.get('Full Name')},</p>
        <p>Thank you for your purchase! Your ticket for <strong>${row.get('Category')}</strong> is attached as a QR code.</p>
        <p>Please present this QR code at the entrance on the day of the event.</p>
        <p>Ticket code: <strong>${ticketCode}</strong></p>
        <br/>
        <p>Fashion West</p>
      `,
      attachments: [
        {
          filename: 'ticket-qr.png',
          content: qrBuffer,
        },
      ],
    });

    return res.status(200).send('ok');
  } catch (err) {
    console.error('Webhook processing error:', err);
    return res.status(500).send('Internal error');
  }
};
