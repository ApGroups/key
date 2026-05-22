// D-rain/api/utils/validation.js
// Shared validation utilities for backend

function isValidEthAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function isValidSolAddress(address) {
  // Simple base58 check (not exhaustive)
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

function isValidTronAddress(address) {
  return /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address);
}

function isValidBtcAddress(address) {
  // Basic check for legacy and segwit
  return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address) || address.startsWith('bc1');
}

function isValidTx(tx) {
  // Placeholder: check for required fields
  return tx && typeof tx === 'object';
}

module.exports = {
  isValidEthAddress,
  isValidSolAddress,
  isValidTronAddress,
  isValidBtcAddress,
  isValidTx,
};
