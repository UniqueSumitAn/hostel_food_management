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

const addProducts = async (req, res) => {
  const {
    ProductName,
    Price,
    Category,
    ProductId,
    Action,
    HostelDetails,
    user,
  } = req.body;
  const image_url = req.file.path;
  const hostel = await hostelModel.findOne({
    _id: HostelDetails,
    Admin: user,
  });
  const newProduct = {
    id: ProductId,
    name: ProductName,
    price: Price,
    img: image_url,
  };
  if (hostel) {
    if (Action === "Add New Category") {
      //create new category and add products
      hostel.products.push({
        category: Category,
        products: [newProduct],
      });
      await hostel.save();
      const updatedhostel = await hostelModel
        .findById(hostel._id)
        .select("hostelname products logo");
      return res.json({
        message: "New category created & product added",
        hostel: updatedhostel,
      });
    } else if (Action === "Add New Product") {
      // add products to existing category
      const category = hostel.products.find(
        (item) => item.category.toLowerCase() === Category.toLowerCase()
      );

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      category.products.push(newProduct);

      await hostel.save();
      const updatedhostel = await hostelModel
        .findById(hostel._id)
        .select("hostelname products logo");
      return res.json({
        message: "Product added to existing category",
        hostel: updatedhostel,
      });
    }
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
      .select("Users") .populate("Users", "-password -hostelname");

return res.json({Detail:detail.Users})

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
