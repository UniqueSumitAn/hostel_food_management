const express = require("express");
const hostelModel = require("../Model/hostelModel");
const cloudinary = require("../Config/cloudinary");

const hostelDetailRoute = async (req, res) => {
  try {
    const { userId } = req.body;

    const hostel = await hostelModel
      .findOne({ Admin: userId })
      .select("hostelname products logo");

    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    return res.json(hostel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const hostelList = async (req, res) => {
  try {
    const hostels = await hostelModel.find({}, "hostelname");

    return res.status(200).json({
      success: true,
      hostels,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

module.exports = {
  hostelDetailRoute,

  hostelList,
};
