import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import AdminAddNewProduct from "./AdminAddNewProduct";

import { HostelProductsContext } from "../../context/HostelProductsContext";

const VITE_URL = import.meta.env.VITE_BACKEND_URL;
const Dashboard = () => {
  const { User } = useContext(UserContext);
  const { HostelDetails, setHostelDetails } = useContext(HostelProductsContext);
  useEffect(() => {
    const fetchhosteldetails = async () => {
      const response = await axios.post(
        `${VITE_URL}/hostel/fetchHostelDetails`,
        { userId: User._id },
        { withCredentials: true }
      );
      console.log(response.data);
      setHostelDetails(response.data);
    };
    fetchhosteldetails();
  }, [User]);
  return (
    <>
      <div className="w-full h-[20%]">
        <h2 className="font-bold text-2xl">Dashboard Overview</h2>
        <div className="w-full flex gap-6 font-bold ">
          <span className="w-[33%]  h-full bg-white rounded-2xl p-2">
            <h3>Total Orders</h3>
            <p>2,500</p>
          </span>
          <span className="w-[33%]  h-full bg-white rounded-2xl p-2">
            <h3>Total Revenue</h3>
            <p>₹ 15,000</p>
          </span>
          <span className="w-[33%]  h-full bg-white rounded-2xl p-2">
            <h3>Low Stock Items</h3>
            <p>25</p>
          </span>
        </div>
      </div>
      <div className="w-full flex h-[50%]">
        <span className="w-[75%]">
          <h2 className="font-bold text-2xl">Recent Orders</h2>
        </span>
        <span className="w-[25%]">Top Selling Products</span>
      </div>
      <div className="gap-3 ">
        <div className="flex ">
          <h2 className="font-bold text-2xl">Product Managment</h2>
          <span className="ml-auto">
            <AdminAddNewProduct
              buttonName={"Add New Product"}
              buttonStyle="bg-green-900 text-white"
            />
          </span>
        </div>
        <div>
          <AdminAddNewProduct
            buttonName={"Add New Category"}
            buttonStyle="bg-white"
          />
        </div>
        <div className="mt-10">Products</div>
      </div>
    </>
  );
};

export default Dashboard;
