import { Connection } from '@solana/web3.js';

// Create a connection using the official Solana RPC endpoint.
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { signedTx } = req.body;
    if (!signedTx) return res.status(400).json({ error: "Missing signedTx" });
    // Convert the base64 string back to a Buffer.
    const txBuffer = Buffer.from(signedTx, 'base64');
    const txid = await connection.sendRawTransaction(txBuffer);
    await connection.confirmTransaction(txid);
    return res.status(200).json({ txid });
  } catch (error) {
    console.error("broadcast-transaction error:", error);
    return res.status(500).json({ error: error.message });
  }
}
