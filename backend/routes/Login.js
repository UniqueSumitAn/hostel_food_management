const express = require("express");
const User = require("../Model/userModel");
const bcrypt=require("bcrypt")
const Login = async (req, res) => {
  const { Email, Password } = req.body;
  console.log(Email,Password);
  const isUser = await User.findOne({ email: Email });
  if (isUser) {
    const checkpassword = await bcrypt.compare(Password, isUser.password);
    if (checkpassword && isUser.role === "user") {
      //user is normal user
      return res.json({ success: true, panel: "user" });
    } else if (checkpassword && isUser.role === "admin") {
      // user is admin
      return res.json({ success: true, panel: "admin" });
    }
  } else {
    return res.json({ success: false, message: "user not authentic" });
  }
};

const Register = async (req, res) => {
  const { Name, Email, Phone, Password, Hostel } = req.body;
  const isUser = await User.findOne({ Email });
  if (!isUser) {
    const newUser = new User({
      email: Email,
      password: Password,
      Phone: Phone,
      fullname: Name,
      hostel: Hostel,
    });

    await newUser.save();
  }
  return res.json({ success: true, panel: "user" });
};
module.exports = { Login, Register };
