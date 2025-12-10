import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import AdminAddNewProduct from "./AdminAddNewProduct";

import { HostelProductsContext } from "../../context/HostelProductsContext";
import ProductsSellGraph from "./ProductsSellGraph";

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
        <span className="w-[55%]">
          <h2 className="font-bold text-2xl">Recent Orders</h2>
        </span>
        <span className="w-[45%]">
          <ProductsSellGraph />
        </span>
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
        <div className="mt-10 text-2xl mb-5">Products</div>
        <div className="flex justify-between mb-6 font-medium">
          <span className="w-[16.7%] flex justify-center items-center">
            Category
          </span>
          <span className="w-[16.7%] flex justify-center items-center">
            Image
          </span>
          <span className="w-[16.7%] flex justify-center items-center">
            Name
          </span>
          <span className="w-[16.7%] flex justify-center items-center">
            Price
          </span>
          <span className="w-[16.7%] flex justify-center items-center">
            Stock
          </span>
          <span className="w-[16.7%] flex justify-center items-center">
            Action
          </span>
        </div>

        {HostelDetails?.products?.map((Category, index) => (
          <div key={index} className="flex flex-col justify-between mb-6">
            {Category.products.map((Productdetail, idx) => (
              <div className="flex  justify-between mb-6">
                <span className="w-[16.7%] h-30 flex justify-center items-center">
                  {Category.category}
                </span>
                <span className="w-[16.7%] justify-center items-center">
                  <img
                    src={Productdetail.img}
                    alt={Productdetail.name}
                    className="w-full h-30 object-contain rounded-md"
                  />
                </span>
                <span className="w-[16.7%] h-30 flex justify-center items-center">
                  {Productdetail.name}
                </span>
                <span className="w-[16.7%] h-30 flex justify-center items-center">
                  {Productdetail.price}
                </span>
                <span className="w-[16.7%] h-30 flex justify-center items-center">
                  Stock
                </span>
                <span className="w-[16.7%] h-30 flex justify-center gap-5 items-center">
                  <button className="bg-green-800 p-2 rounded-2xl cursor-pointer text-white">
                    Update
                  </button>
                  <button className="bg-red-700 p-2 rounded-2xl cursor-pointer text-white">
                    Remove
                  </button>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
