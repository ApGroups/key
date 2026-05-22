import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Create a connection using the official Solana RPC endpoint.
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { publicKey } = req.body;
    if (!publicKey) return res.status(400).json({ error: "Missing publicKey" });
    const balanceLamports = await connection.getBalance(new PublicKey(publicKey));
    const balanceSol = balanceLamports / LAMPORTS_PER_SOL;
    return res.status(200).json({ balance: balanceSol });
  } catch (error) {
    console.error("solana-balance error:", error);
    return res.status(500).json({ error: error.message });
  }
}
