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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sheet = await getSheet();
    const rows = await sheet.getRows();

    const paid = rows.filter((r) => r['Status'] === 'paid');
    const checkedIn = paid.filter((r) => r['Checked In'] === 'Yes');

    return res.status(200).json({
      total: paid.length,
      checkedIn: checkedIn.length,
      remaining: paid.length - checkedIn.length,
    });
  } catch (err) {
    console.error('stats error:', err);
    return res.status(500).json({ error: err.message });
  }
};
