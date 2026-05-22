// D-rain/api/walletconnect.js
// WalletConnect Backend Structure (Placeholder)
// This file provides a structure for future WalletConnect integration on the backend.
// WalletConnect is typically used on the client side, but you can use this as a relay/session handler.
// For actual backend relaying, see: https://docs.walletconnect.com/2.0/backend/relay



// --- WalletConnect Backend API (Express.js style handler) ---
// Receives WalletConnect session or transaction data from the client
// POST /api/walletconnect { type: 'session'|'tx', session, tx }

const { isValidEthAddress, isValidTx } = require('./utils/validation');
const sessions = {};
const txLog = [];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { session, tx, type } = req.body;
  if (!type) return res.status(400).json({ error: 'Missing type' });

  if (type === 'session') {
    // Store or update session
    if (!session || !session.accounts || !Array.isArray(session.accounts)) {
      return res.status(400).json({ error: 'Missing session data' });
    }
    const address = session.accounts[0];
    if (!isValidEthAddress(address)) {
      return res.status(400).json({ error: 'Invalid ETH address in session' });
    }
    sessions[address] = session;
    return res.status(200).json({ ok: true, message: 'Session stored', session });
  }

  if (type === 'tx') {
    // Log or process transaction
    if (!tx || !isValidTx(tx)) return res.status(400).json({ error: 'Missing or invalid tx data' });
    // Optionally link to session
    let linkedSession = null;
    if (tx.from && isValidEthAddress(tx.from) && sessions[tx.from]) {
      linkedSession = sessions[tx.from];
    }
    txLog.push({ tx, linkedSession, receivedAt: Date.now() });
    // You could verify, relay, or store the tx here
    return res.status(200).json({ ok: true, message: 'Transaction received', tx, linkedSession });
  }

  return res.status(400).json({ error: 'Unknown type' });
};
