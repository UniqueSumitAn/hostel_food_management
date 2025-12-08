const express = require("express");
const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwtSign = require("../Auth/Auth");
const hostelModel = require("../Model/hostelModel");

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
    } else {
      console.log("password else ");
    }
  } else {
    return res.json({ success: false, message: "user not authentic" });
  }
};

const Register = async (req, res) => {
  const {
    Name,
    Email,
    Phone,
    Password,
    Hostel,
    Telegram_Token,
    Telegram_Chat_Id,
    Buisness_Email,
    Buisness_Email_Password,
  } = req.body;
  console.log(req.body);
  const isHostel = await hostelModel.findOne({ hostelname: Hostel });
  if (!isHostel) {
    const newAdmin = new User({
      email: Email,
      password: Password,
      Phone: Phone,
      fullname: Name,
      hostelname: Hostel,
      role: "admin",
    });
    await newAdmin.save();
    const newHostel = await hostelModel.create({
      hostelname: Hostel,
      Admin: [newAdmin._id],
      telegram_token: Telegram_Token,
      telegram_chat_id: Telegram_Chat_Id,
      buisness_email: Buisness_Email,
      buisness_email_password: Buisness_Email_Password,
    });
    const token = jwtSign(newAdmin._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    const admin = await User.findById(newAdmin._id).select("-password");
    return res.json({ success: true, panel: "admin", user: admin });
  }
  if (isHostel) {
    const isUser = await User.findOne({ email: Email });
    if (!isUser) {
      const newUser = new User({
        email: Email,
        password: Password,
        Phone: Phone,
        fullname: Name,
        hostelname: Hostel,
      });

      await newUser.save();
      const token = jwtSign(newUser._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
      const user = await User.findById(newUser._id).select("-password");
      return res.json({ success: true, panel: "user", user: user });
    }
  }
};
module.exports = { Login, Register };
