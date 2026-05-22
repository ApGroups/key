// Express handler for spending access (grant/revoke)
const { setSpendingAccess } = require('../src/backend/transactions');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId, access } = req.body;
  if (!userId || typeof access !== 'boolean') {
    return res.status(400).json({ error: 'Missing userId or access' });
  }
  setSpendingAccess(userId, access);
  return res.status(200).json({ ok: true, userId, access });
};