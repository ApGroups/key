export const detectWallets = () => {
    const wallets = [];
  
    if (window.solana?.isPhantom) {
      wallets.push({
        name: "Phantom",
        type: "extension",
        provider: window.solana,
      });
    }
  
    if (window.trustWallet) {
      wallets.push({
        name: "Trust Wallet",
        type: "extension",
        provider: window.trustWallet,
      });
    }
  
    return wallets;
  };
  