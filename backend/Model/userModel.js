const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    hostelname: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    fullname: { type: String, required: true },
    profilepic: {
      type: String,
      default:
        "https://res.cloudinary.com/dmj3t5tyh/image/upload/v1763289617/933-9332131_profile-picture-default-png_1_wao5pl.jpg",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
