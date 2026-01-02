const express = require("express");
const {
  hostelDetailRoute,

  hostelList,
  addProducts,
  hostelUsers,
} = require("../routes/hostelRoute");
const upload = require("../middleware/multer");
const ProtectRoute = require("../Auth/ProtectRoute");

const hostelRouter = express.Router();
hostelRouter.post("/fetchHostelDetails", ProtectRoute, hostelDetailRoute);
hostelRouter.post(
  "/addProducts",
  ProtectRoute,
  upload.single("image"),
  addProducts
);
hostelRouter.get("/hostelList", hostelList);
hostelRouter.post("/hostelUsers", ProtectRoute, hostelUsers);
module.exports = hostelRouter;
