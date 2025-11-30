const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const hostelSchema = new mongoose.Schema(
  {
    hostelname: { type: String, required: true },
    products: { type: Array },
    logo: { type: String },
  },
  { timestamps: true }
);
module.exports =
  mongoose.models.Hostel || mongoose.model("Hostel", hostelSchema);
