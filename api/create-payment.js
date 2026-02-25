const crypto = require('crypto');
const nanoid = require('nanoid');
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

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, ticketType, amount } = req.body;

  if (!name || !phone || !email || !ticketType || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const publicKey = process.env.LIQPAY_PUBLIC_KEY;
  const privateKey = process.env.LIQPAY_PRIVATE_KEY;
  const order_id = nanoid();

  // Write pending row to Google Sheets
  try {
    const sheet = await getSheet();
    await sheet.addRow({
      'Order ID': order_id,
      'Event': 'Fashion West Ukraine 2026',
      'Category': ticketType,
      'Full Name': name,
      'Phone': phone,
      'Email': email,
      'Payment Date': '',
      'Status': 'pending',
      'Ticket Code': '',
      'Checked In': 'No',
      'Entry Time': '',
    });
  } catch (err) {
    console.error('Sheets write error:', err);
    return res.status(500).json({ error: 'Failed to record order' });
  }

  // Build LiqPay params
  const params = {
    version: 3,
    public_key: publicKey,
    action: 'pay',
    amount: String(amount),
    currency: 'UAH',
    description: `Ticket ${ticketType}`,
    order_id,
    result_url: 'https://fashionwest.vercel.app/success',
    server_url: 'https://fashionwest.vercel.app/api/liqpay-webhook',
  };

  const data = Buffer.from(JSON.stringify(params)).toString('base64');
  const signature = crypto
    .createHash('sha1')
    .update(privateKey + data + privateKey)
    .digest('base64');

  return res.status(200).json({ data, signature });
};
