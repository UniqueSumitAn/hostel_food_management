const express = require("express");
const { hostelDetailRoute, addCategory, addProductToCategory } = require("../routes/hostelRoute");

const hostelRouter = express.Router();
hostelRouter.post("/fetchHostelDetails", hostelDetailRoute);
hostelRouter.post("/addCategory", addCategory);
hostelRouter.post("/addProductToCategory",addProductToCategory)
module.exports = hostelRouter;
