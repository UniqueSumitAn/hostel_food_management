const express = require("express");
const { hostelDetailRoute, addCategory, addProductToCategory, hostelList } = require("../routes/hostelRoute");

const hostelRouter = express.Router();
hostelRouter.post("/fetchHostelDetails", hostelDetailRoute);
hostelRouter.post("/addCategory", addCategory);
hostelRouter.post("/addProductToCategory",addProductToCategory)
hostelRouter.get("/hostelList",hostelList)
module.exports = hostelRouter;
