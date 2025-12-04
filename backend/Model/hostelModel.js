const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const productItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const productCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  products: [productItemSchema]
});




const hostelSchema = new mongoose.Schema(
  {
    Admin: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    hostelname: { type: String, required: true },
    products: [productCategorySchema],
    logo: { type: String },
  },
  { timestamps: true }
);
module.exports =
  mongoose.models.Hostel || mongoose.model("Hostel", hostelSchema);
