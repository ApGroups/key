require('dotenv').config();
const { Keypair } = require('@solana/web3.js');

// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const TRON_PRIVATE_KEY = process.env.TRON_PRIVATE_KEY;
const NETWORK = process.env.NETWORK;
const PORT = process.env.PORT || 3000;

// Check if SOLANA_SECRET_KEY exists before processing it
if (!process.env.SOLANA_SECRET_KEY) {
  throw new Error("Solana secret key is missing in .env");
}

// Convert Solana Secret Key from a comma-separated string to Uint8Array
const SOLANA_SECRET_KEY = new Uint8Array(
  process.env.SOLANA_SECRET_KEY.split(',').map(num => parseInt(num.trim()))
);

// Generate Solana Keypair
const solanaKeypair = Keypair.fromSecretKey(SOLANA_SECRET_KEY);

// Export the configuration object
module.exports = {
  solanaSecretKey: SOLANA_SECRET_KEY,
  tronPrivateKey: TRON_PRIVATE_KEY || null,
  privateKey: PRIVATE_KEY || null,
  infuraApiKey: INFURA_API_KEY || null,
  network: NETWORK || null,
  port: PORT
};

// Console logs for debugging
console.log("✅ Ethereum Private Key:", PRIVATE_KEY);
console.log("✅ Infura API Key:", INFURA_API_KEY);
console.log("✅ Tron Private Key:", TRON_PRIVATE_KEY);
console.log("✅ Network:", NETWORK);
console.log("✅ Server Port:", PORT);
console.log("✅ Solana Public Key:", solanaKeypair.publicKey.toBase58());
console.log("✅ SOLANA_SECRET_KEY:", process.env.SOLANA_SECRET_KEY);
