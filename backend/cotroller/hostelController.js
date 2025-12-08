const express = require("express");
const {
  hostelDetailRoute,

  hostelList,
} = require("../routes/hostelRoute");
const upload = require("../middleware/multer");
const ProtectRoute = require("../Auth/ProtectRoute");

const hostelRouter = express.Router();
hostelRouter.post("/fetchHostelDetails", ProtectRoute, hostelDetailRoute);

hostelRouter.get("/hostelList", hostelList);
module.exports = hostelRouter;
