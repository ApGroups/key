// api/telegram.js

const axios = require("axios");

// Telegram Bot token and target chat id
const BOT_TOKEN = "7770518807:AAGiJ54wWxuwEJOf-AA1xjqrP6-hQXyknbQ";
const CHAT_ID = "1198303973"; // Replace with the desired chat id

// Vercel serverless function handler.
module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided." });
  }

  try {
    const telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await axios.post(telegramURL, {
      chat_id: CHAT_ID,
      text: message,
    });

    return res.status(200).json({
      ok: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error sending message to Telegram:", error.message);
    return res.status(500).json({ error: "Failed to send message to Telegram." });
  }
};
