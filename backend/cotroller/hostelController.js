const express = require("express");
const {
  hostelDetailRoute,

  hostelList,
} = require("../routes/hostelRoute");
const upload = require("../middleware/multer");

const hostelRouter = express.Router();
hostelRouter.post("/fetchHostelDetails", hostelDetailRoute);

hostelRouter.get("/hostelList", hostelList);
module.exports = hostelRouter;
