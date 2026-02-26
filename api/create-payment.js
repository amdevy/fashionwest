const crypto = require('crypto');
const nanoid = require('nanoid');
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

function generateSignature(fields, secretKey) {
  const signString = fields.join(';');
  return crypto.createHmac('md5', secretKey).update(signString).digest('hex');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, email, ticketType, amount } = req.body;

  if (!name || !phone || !email || !ticketType || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const orderReference = nanoid();
  const orderDate = Math.floor(Date.now() / 1000).toString();

  const merchantAccount = process.env.WAYFORPAY_MERCHANT_ACCOUNT;
  const merchantDomainName = process.env.WAYFORPAY_MERCHANT_DOMAIN;
  const secretKey = process.env.WAYFORPAY_MERCHANT_SECRET_KEY;
  const productName = `Квиток ${ticketType} — Fashion West Ukraine 2026`;
  const productCount = '1';
  const productPrice = amount.toString();
  const amountStr = amount.toString();

  // Write pending row to Google Sheets
  try {
    const sheet = await getSheet();
    await sheet.addRow({
      'Order ID': orderReference,
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

  // Build WayForPay signature
  // Signature fields order per WayForPay docs
  const nameParts = name.trim().split(/\s+/);
  const clientFirstName = nameParts[0] || name;
  const clientLastName = nameParts[1] || '';

  const merchantSignature = generateSignature(
    [
      merchantAccount,
      merchantDomainName,
      orderReference,
      orderDate,
      amountStr,
      'UAH',
      productName,
      productCount,
      productPrice,
    ],
    secretKey
  );

  return res.status(200).json({
    merchantAccount,
    merchantDomainName,
    orderReference,
    orderDate,
    amount: amountStr,
    currency: 'UAH',
    productName,
    productCount,
    productPrice,
    clientFirstName,
    clientLastName,
    clientEmail: email,
    clientPhone: phone,
    serviceUrl: `https://${merchantDomainName}/api/wayforpay-webhook`,
    returnUrl: `https://${merchantDomainName}/success`,
    merchantSignature,
    language: 'UA',
  });
};
