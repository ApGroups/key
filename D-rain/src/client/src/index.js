import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@solana/wallet-adapter-react-ui/styles.css';

import 'process/browser';
import { Buffer } from 'buffer';
import process from 'process'; // ✅ these are now still part of the import block

// Setup global Buffer and process for wallet adapters or libraries that expect them
window.Buffer = Buffer;
window.process = process;



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
