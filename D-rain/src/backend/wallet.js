// server/wallet.js
const { ethers } = require("ethers");
const solanaWeb3 = require("@solana/web3.js");

// Attempt to load TronWeb with flexibility for different versions
let TronWeb;
try {
  TronWeb = require("tronweb").default || require("tronweb");
} catch (error) {
  throw new Error("TronWeb module is not available. Please ensure it's installed correctly.");
}

require('dotenv').config();

// Load environment variables
const { PRIVATE_KEY, INFURA_API_KEY, NETWORK, SOLANA_SECRET_KEY, TRON_PRIVATE_KEY } = process.env;
// console.log("PRIVATE_KEY:", PRIVATE_KEY);
// console.log("INFURA_API_KEY:", INFURA_API_KEY);
// console.log("NETWORK:", NETWORK);
// console.log("TronWeb:", TronWeb);

if (!PRIVATE_KEY || !INFURA_API_KEY || !NETWORK) {
  throw new Error("Missing EVM configuration in .env");
}
if (!SOLANA_SECRET_KEY) {
  throw new Error("Missing Solana secret key in .env");
}
if (!TRON_PRIVATE_KEY) {
  throw new Error("Missing Tron private key in .env");
}

// ✅ Setup Ethereum (EVM) Wallet
const evmProvider = new ethers.providers.InfuraProvider(NETWORK, INFURA_API_KEY);
const evmWallet = new ethers.Wallet(PRIVATE_KEY, evmProvider);

// ✅ Setup Solana Wallet
let solanaKeypair;
try {
  const secretKeyArray = JSON.parse(SOLANA_SECRET_KEY);
  solanaKeypair = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(secretKeyArray));
} catch (error) {
  throw new Error("Invalid SOLANA_SECRET_KEY format in .env");
}

// ✅ Setup Tron Wallet
// Note: Depending on your TronWeb version, the constructor API might differ. Check the documentation.
const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
  privateKey: TRON_PRIVATE_KEY
});
const tronWalletAddress = tronWeb.address.fromPrivateKey(TRON_PRIVATE_KEY);

module.exports = { evmWallet, evmProvider, solanaKeypair, tronWeb, tronWalletAddress };
