import React, { useContext } from "react";
import Product from "../src/components/Product";
import Cart from "../src/components/Cart";
import Bill from "../src/components/Bill";
import { useLocation } from "react-router-dom";
import { CartContext } from "../context/Cartcontext";
import axios from "axios";
const VITE_URL = import.meta.env.VITE_BACKEND_URL;
const Checkout = () => {
  const { cartQuantities } = useContext(CartContext);
  const location = useLocation();
  const { cart } = location.state || {};
  const placeOrder = async () => {
    const response = await axios.post(`${VITE_URL}/Orders`, cartQuantities, {
      withCredentials: true,
    });
  };
  return (
    <div className=" flex justify-center items-center flex-col w-full h-full bg-[#f5f7fd] gap-5 min-h-screen">
      <Cart />
      <Bill />
      <button
        className="bg-green-600 text-white w-100 rounded-lg h-10 cursor-pointer 
             transform transition-transform duration-150 ease-in-out
             active:scale-95 active:bg-green-700"
        onClick={() => {
          placeOrder();
        }}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
