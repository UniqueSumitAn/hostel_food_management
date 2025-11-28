const express = require("express");
const axios=require("axios");
const { order } = require("../routes/orderRoute");

const messageRouter = express.Router();
messageRouter.post("/Orders", order )
  
module.exports = messageRouter;
