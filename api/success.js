const busboy = require('busboy');
const QRCode = require('qrcode');
const generate = require('nanoid/generate');
const { Resend } = require('resend');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

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

function parseBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      return resolve(req.body);
    }

    const contentType = req.headers['content-type'] || '';

    if (contentType.includes('multipart/form-data')) {
      const fields = {};
      const bb = busboy({ headers: req.headers });
      bb.on('field', (name, val) => { fields[name] = val; });
      bb.on('close', () => resolve(fields));
      bb.on('error', reject);
      req.pipe(bb);
      return;
    }

    // fallback: application/x-www-form-urlencoded
    const qs = require('querystring');
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(qs.parse(data)));
    req.on('error', reject);
  });
}

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { orderReference, transactionStatus } = body;

      console.log('[success] body:', JSON.stringify(body));

      if (transactionStatus === 'Approved' && orderReference) {
        const sheet = await getSheet();
        const rows = await sheet.getRows();
        const row = rows.find((r) => r['Order ID'] === orderReference);

        if (row && row['Status'] !== 'paid') {
          const ticketCode = row['Ticket Code'] || generate(ALPHABET, 8);
          const qrBuffer = await QRCode.toBuffer(ticketCode, { width: 400, margin: 2 });

          row['Status'] = 'paid';
          row['Ticket Code'] = ticketCode;
          row['Payment Date'] = new Date().toLocaleString('uk-UA');
          await row.save();

          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: row['Email'],
            subject: 'Ваш квиток Fashion West Ukraine 2026',
            html: `
              <p>Вітаємо, ${row['Full Name']}!</p>
              <p>Ваш квиток категорії <strong>${row['Category']}</strong> підтверджено.</p>
              <p>Код квитка: <strong>${ticketCode}</strong></p>
              <p>Пред'явіть QR-код на вході у день події.</p>
              <p>До зустрічі 2 травня в Darlin', Мукачево!</p>
            `,
            attachments: [{ filename: 'ticket-qr.png', content: qrBuffer }],
          });
        }
      }
    } catch (err) {
      console.error('[success] processing error:', err);
    }
  }

  res.redirect(302, '/success');
}

handler.config = { api: { bodyParser: false } };
module.exports = handler;
