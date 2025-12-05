const express = require("express");
const hostelModel = require("../Model/hostelModel");

const hostelDetailRoute = async (req, res) => {
  try {
    const { userId } = req.body;

    const hostel = await hostelModel.findOne({ Admin: userId });

    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    return res.json(hostel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// addCategory

const addCategory = async (req, res) => {
  try {
    const { userId, newCategory } = req.body;

    const hostel = await hostelModel.findOne({ Admin: userId });

    if (!hostel) return res.status(404).json({ message: "Hostel not found" });

    hostel.products.push(newCategory);

    await hostel.save();

    res.status(200).json({ message: "Category added", hostel });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProductToCategory = async (req, res) => {
  try {
    const { userId, categoryName, newProducts } = req.body;

    const hostel = await hostelModel.findOne({ Admin: userId });

    if (!hostel) return res.status(404).json({ message: "Hostel not found" });

    const category = hostel.products.find(
      (c) => c.category.toLowerCase() === categoryName.toLowerCase()
    );

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // Push multiple new products
    newProducts.forEach((p) => category.products.push(p));

    await hostel.save();

    res.status(200).json({
      message: "Products added to category",
      hostel,
    });
  } catch (err) {
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
  addCategory,
  addProductToCategory,
  hostelList,
};
