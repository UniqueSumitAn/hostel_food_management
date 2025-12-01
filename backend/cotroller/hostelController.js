const express = require("express");

const hostelDetailRoute = require("../routes/hostelRoute");
const hostelRouter = express.Router();
hostelRouter.get("/fetchHostelDetails",hostelDetailRoute)
module.exports = hostelRouter;
