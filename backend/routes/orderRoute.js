const axios = require("axios");
const nodemailer = require("nodemailer");
const order = async (req, res) => {
  const TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = process.env.ADMIN_CHAT_ID;
  const { orderId, customerName, phone, address, items, total } = req.body;
  const text = `
🍽️ *New Order Received!*  

🆔 *Order ID:* ${orderId}
👤 *Customer:* ${customerName}
📞 *Phone:* ${phone}
🏠 *Address:* ${address}

🛒 *Items:*
${items
  .map((i) => `• ID: ${i.productId} -> ${i.name} x ${i.quantity}`)
  .join("\n")}

💰 *Total Amount:* ₹${total}
⏱️ *Time:* ${new Date().toLocaleString()}
`;

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: CHAT_ID,
      text: text,
      parse_mode: "Markdown",
    });
    return res.json({ success: true, message: "Order notification sent" });
  } catch (error) {
    console.log("Telegram Error:", error.response?.data || error.message);
  }
};

module.exports = { order };
