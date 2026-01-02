require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./Config/DB");
const multer = require("multer");
const userRouter = require("./cotroller/userRoutes");
const messageRouter = require("./cotroller/messageRoutes");
const hostelRouter = require("./cotroller/hostelController");
const App = express();

App.use(express.json());
App.use(cookieParser());
App.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "https://hostelfoodmanagement-one.vercel.app",
];
App.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow mobile apps / postman

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//Routes

App.use("/user", userRouter);
App.use("/message", messageRouter);
App.use("/hostel", hostelRouter);
App.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  if (err.message?.includes("Invalid image file")) {
    return res.status(400).json({ message: "Invalid image format" });
  }

  console.error(err);
  res.status(500).json({ message: "Server error" });
});

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    App.listen(PORT, () => {
      console.log("Server is running on ", PORT);
    });
  } catch (error) {
    console.log("Error starting server", error);
  }
};
startServer();
module.exports = App;
