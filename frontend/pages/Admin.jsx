import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Addnewcategorydropdown from "../src/components/Addnewcategorydropdown";
import AddProductsDetails from "../src/components/AddProductsDetails";
import Dashboard from "../src/components/Dashboard";
import AdminOrders from "../src/components/AdminOrders";
import AdminProducts from "../src/components/AdminProducts";
import AdminUsers from "../src/components/AdminUsers";
import AdminPromotions from "../src/components/AdminPromotions";
import AdminSettings from "../src/components/AdminSettings";

const VITE_URL = import.meta.env.VITE_BACKEND_URL;

const Admin = () => {
  const { User } = useContext(UserContext);
  const [MenuOptions, setMenuOptions] = useState({
    Dashboard: true,
    Orders: false,
    Products: false,
    Users: false,
    Promotions: false,
    Settings: false,
  });
  const handleMenuClick = (name) => {
    setMenuOptions({
      Dashboard: false,
      Orders: false,
      Products: false,
      Users: false,
      Promotions: false,
      Settings: false,
      [name]: true,
    }); 
  };
  return (
    <div className=" flex flex-col  bg-[#f1f3f5] bg-contain bg-center bg-no-repeat  w-full h-screen">
      <div className="w-full"> <img src="/websitelogo.png" className="w-16 h-16 p-0 object-contain "/></div>
      <div className=" flex w-full h-full">
        <span className="w-[35%]  bg-[#265053] text-white text-2xl p-5 flex flex-col gap-6 h-full">
          <div
            className="menu-item"
            onClick={() => handleMenuClick("Dashboard")}
          >
            Dashboard
          </div>
          <div className="menu-item" onClick={() => handleMenuClick("Orders")}>
            Orders
          </div>
          <div
            className="menu-item"
            onClick={() => handleMenuClick("Products")}
          >
            Products
          </div>
          <div className="menu-item" onClick={() => handleMenuClick("Users")}>
            Users
          </div>
          <div
            className="menu-item"
            onClick={() => handleMenuClick("Promotions")}
          >
            Promotions
          </div>
          <div
            className="menu-item"
            onClick={() => handleMenuClick("Settings")}
          >
            Settings
          </div>
        </span>
        {/* bg-[#f1f3f5] */}
        <span className="w-[65%] h-full overflow-y-scroll">
          {MenuOptions.Dashboard && <Dashboard />}
          {MenuOptions.Orders && <AdminOrders />}
          {MenuOptions.Products && <AdminProducts />}
          {MenuOptions.Users && <AdminUsers />}
          {MenuOptions.Promotions && <AdminPromotions />}
          {MenuOptions.Settings && <AdminSettings />}
        </span>
      </div>
    </div>
  );
};
export default Admin;
