const express=require("express");
const hostelModel = require("../Model/hostelModel");


const hostelDetailRoute=async(req,res)=>{
const user=req.body.User._id;
const hostel=await hostelModel.findById(user);

}


module.exports=hostelDetailRoute;