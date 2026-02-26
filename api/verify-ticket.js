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
    const row = rows.find((r) => r['Ticket Code'] === code);

    if (!row) {
      return res.status(200).json({ status: 'not_found' });
    }

    if (row['Status'] !== 'paid') {
      return res.status(200).json({ status: 'not_paid' });
    }

    if (row['Checked In'] === 'Yes') {
      return res.status(200).json({
        status: 'already_used',
        time: row['Entry Time'],
      });
    }

    // Mark as checked in
    row['Checked In'] = 'Yes';
    row['Entry Time'] = new Date().toLocaleString('uk-UA');
    await row.save();

    return res.status(200).json({
      status: 'success',
      name: row['Full Name'],
      category: row['Category'],
    });
  } catch (err) {
    console.error('Verify ticket error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
};
