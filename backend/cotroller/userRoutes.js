const express = require("express");
const sendOtp = require("../routes/Otp");

const userRouter = express.Router();
userRouter.post("/Otp",sendOtp)
module.exports = userRouter;
