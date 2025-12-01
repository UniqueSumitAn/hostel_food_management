const express = require("express");
const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwtSign = require("../Auth/Auth");

const Login = async (req, res) => {
  const { Email, Password } = req.body;
  console.log(Email, Password);
  const isUser = await User.findOne({ email: Email });
  if (isUser) {
    const checkpassword = await bcrypt.compare(Password, isUser.password);

    if (checkpassword) {
      if (isUser.role === "user") {
        const user = await User.findById(isUser._id).select("-password");
        const token = jwtSign(user._id);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
        //user is normal user
        return res.json({ success: true, panel: "user", user: user });
      } else if (isUser.role === "admin") {
        const user = await User.findById(isUser._id).select("-password");
        const token = jwtSign(user._id);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
        // user is admin
        return res.json({ success: true, panel: "admin", user: user });
      }
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
