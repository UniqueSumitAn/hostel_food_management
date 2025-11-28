const axios = require("axios");
const nodemailer = require("nodemailer");

const sendOtp = async (req, res) => {
  const userEmail = req.body;
  const otp = Math.floor(10000 + Math.random() * 90000);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  transporter.sendMail({
    from: process.env.MY_EMAIL,
    to: userEmail,
    subject: "Your OTP",
    text: `Your OTP is ${otp}`,
  });
};

module.exports = sendOtp;
