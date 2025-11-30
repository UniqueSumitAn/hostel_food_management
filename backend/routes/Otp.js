const axios = require("axios");
const nodemailer = require("nodemailer");

const sendOtp = async (req, res) => {
  console.log(req.body);
  const userEmail = req.body.Email;
  const otp = Math.floor(10000 + Math.random() * 90000);
  try {
    if (userEmail) {
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
    }
    console.log("sent mail")
    return res.send({
      success: true,
      otp: otp,
      message: "mail sent successfully",
    });
  } catch (error) {
    console.log(error);
  }
};


module.exports = sendOtp;
