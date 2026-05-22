// src/backend/index.js
const express = require('express');
const { checkBalance, sendEntireBalance } = require('./transactions');

const app = express();
const port = 3001;

app.get('/balance', async (req, res) => {
  const { network } = req.query;
  try {
    const balance = await checkBalance(network);
    res.send({ balance });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/sendAll', async (req, res) => {
  const { network } = req.query;
  try {
    const txHash = await sendEntireBalance(network);
    res.send({ txHash });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () =>
  console.log(`Backend server running on port ${port}`)
);
