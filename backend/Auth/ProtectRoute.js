const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");

const ProtectRoute = async (req, res, next) => {
  const token = req.cookies?.token;
  try {
    if (!token)
      return res.json({
        success: false,
        message: "USer not found! Unauthorized Access",
      });
    if (token) {
      const deecode = await jwt.verify(token, process.env.JWTSECRET);
      if (!token) return res.json({ success: false });
      if (token) {
        const user = await userModel.findById(deecode.id).select("-password");
        if (user) {
          req.user = user;
          next();
        }
      }
    }
  } catch (error) {
    console.log("Error Protect Route", error);
  }
};

module.exports = ProtectRoute;
