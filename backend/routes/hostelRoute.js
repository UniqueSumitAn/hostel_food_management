const express = require("express");
const hostelModel = require("../Model/hostelModel");
const cloudinary = require("../Config/cloudinary");

const hostelDetailRoute = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const hostel = await hostelModel
      .findOne({
        $or: [{ Admin: userId }, { Users: userId }],
      })
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

const addProducts = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      ProductName,
      Price,
      Category,
      Stock,
      ProductId,
      Action,
      HostelDetails,
      user,
    } = req.body;

    // ✅ Check file
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const image_url = req.file.path;

    if (!image_url) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    // ✅ Find hostel
    const hostel = await hostelModel.findOne({
      _id: HostelDetails,
      Admin: user,
    });

    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    const newProduct = {
      id: ProductId,
      name: ProductName,
      price: Price,
      img: image_url,
      stock: Stock,
    };

    let actionType = Action;

    // ✅ Check category existence
    if (actionType === "Add New Category") {
      const categoryExists = hostel.products.find(
        (item) => item.category.toLowerCase() === Category.toLowerCase()
      );

      if (categoryExists) {
        actionType = "Add New Product";
      }
    }

    // ✅ Add new category
    if (actionType === "Add New Category") {
      hostel.products.push({
        category: Category,
        products: [newProduct],
      });

      await hostel.save();
    }

    // ✅ Add product to existing category
    else if (actionType === "Add New Product") {
      const category = hostel.products.find(
        (item) => item.category.toLowerCase() === Category.toLowerCase()
      );

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      category.products.push(newProduct);
      await hostel.save();
    } else {
      return res.status(400).json({ message: "Invalid action type" });
    }

    const updatedhostel = await hostelModel
      .findById(hostel._id)
      .select("hostelname products logo");

    return res.status(200).json({
      message: "Product added successfully",
      hostel: updatedhostel,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const hostelUsers = async (req, res) => {
  const { User } = req.body;
  console.log(User);
  try {
    const detail = await hostelModel
      .findOne({
        hostelname: User.hostelname,
        Admin: { $in: [User._id] },
      })
      .select("Users")
      .populate("Users", "-password -hostelname");

    return res.json({ Detail: detail.Users });
  } catch (err) {
    console.log(err);
  }
};
const UpdateProductDetails = async (req, res) => {};

module.exports = {
  hostelDetailRoute,
  addProducts,
  hostelList,
  hostelUsers,
};
