// api/recent-blockhash.js
import { Connection } from '@solana/web3.js';

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { blockhash } = await connection.getRecentBlockhash();
    return res.status(200).json({ blockhash });
  } catch (error) {
    console.error("recent-blockhash error:", error);
    return res.status(500).json({ error: error.message });
  }
}
