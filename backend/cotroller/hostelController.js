const express = require("express");
const hostelRoute = require("../routes/hostelRoute");
const hostelRouter = express.Router();
hostelRouter.get("/hostelDetails",hostelRoute)
module.exports = hostelRouter;
