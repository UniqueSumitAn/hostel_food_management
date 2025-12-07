const axios = require("axios");
const nodemailer = require("nodemailer");
const hostelModel = require("../Model/hostelModel");

const sendOtp = async (req, res) => {
  console.log(req.body);
  const userEmail = req.body.Email;
  const Hostel = req.body.Hostel;
  const otp = Math.floor(10000 + Math.random() * 90000);
  try {
    if (userEmail) {
      const isHostel = await hostelModel.findOne({ hostelname: Hostel });
      if (!isHostel) {
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
          text: `Admin Your OTP is ${otp}`,
        });

        console.log("sent mail");
        return res.send({
          success: true,
          otp: otp,
          message: "mail sent successfully",
        });
      } else if (isHostel) {
        const hostelMail = isHostel.buisness_email;
        const hostelMailPass = isHostel.buisness_email_password;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: hostelMail,
            pass: hostelMailPass,
          },
        });

        transporter.sendMail({
          from: hostelMail,
          to: userEmail,
          subject: "Your OTP",
          text: `Welcome  Your OTP is ${otp}`,
        });

        console.log("sent mail");
        return res.send({
          success: true,
          otp: otp,
          message: "mail sent successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendOtp;
