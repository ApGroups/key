// server.js
const express = require('express');
const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');
require('dotenv').config();

const app = express();
app.use(express.json());

// Create a connection using the official Solana RPC (server-side is not affected by CORS)
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// Endpoint to check the balance for a given public key.
app.post('/api/solana-balance', async (req, res) => {
  try {
    const { publicKey } = req.body;
    if (!publicKey) return res.status(400).json({ error: "Missing publicKey" });
    const balanceLamports = await connection.getBalance(new PublicKey(publicKey));
    const balanceSol = balanceLamports / LAMPORTS_PER_SOL;
    res.json({ balance: balanceSol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to broadcast a client-signed transaction.
app.post('/api/broadcast-transaction', async (req, res) => {
  try {
    const { signedTx } = req.body;
    if (!signedTx) return res.status(400).json({ error: "Missing signedTx" });
    // Convert the base64 string back to a Buffer.
    const txBuffer = Buffer.from(signedTx, 'base64');
    const txid = await connection.sendRawTransaction(txBuffer);
    await connection.confirmTransaction(txid);
    res.json({ txid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
