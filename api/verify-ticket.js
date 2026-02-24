const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

async function getSheet() {
  const creds = JSON.parse(process.env.GOOGLE_CREDENTIALS.replace(/\\n/g, '\n'));
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

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Missing ticket code' });
  }

  try {
    const sheet = await getSheet();
    const rows = await sheet.getRows();
    const row = rows.find((r) => r.get('Ticket Code') === code);

    if (!row) {
      return res.status(200).json({ status: 'not_found' });
    }

    const status = row.get('Status');
    if (status !== 'paid') {
      return res.status(200).json({ status: 'not_paid' });
    }

    const checkedIn = row.get('Checked In');
    if (checkedIn === 'Yes') {
      return res.status(200).json({
        status: 'already_used',
        time: row.get('Entry Time'),
      });
    }

    // Mark as checked in
    row.set('Checked In', 'Yes');
    row.set('Entry Time', new Date().toLocaleString('uk-UA'));
    await row.save();

    return res.status(200).json({
      status: 'success',
      name: row.get('Full Name'),
      category: row.get('Category'),
    });
  } catch (err) {
    console.error('Verify ticket error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
};
