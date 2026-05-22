const { Keypair } = require('@solana/web3.js');

// Generate a new keypair
const keypair = Keypair.generate();

// Convert the secret key (Uint8Array) to a regular array and then to JSON
console.log(JSON.stringify(Array.from(keypair.secretKey)));
console.log("Public Key:", keypair.publicKey.toBase58());
