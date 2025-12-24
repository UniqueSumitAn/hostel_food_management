import React, { useContext } from "react";
import Product from "../src/components/Product";
import Cart from "../src/components/Cart";
import { useNavigate } from "react-router-dom";
import Bill from "../src/components/Bill";
import { useLocation } from "react-router-dom";
import { CartContext } from "../context/Cartcontext";
import axios from "axios";
import { UserContext } from "../context/UserContext";
const VITE_URL = import.meta.env.VITE_BACKEND_URL;
const Checkout = () => {
  const { cartQuantities, getTotalPrice } = useContext(CartContext);
  const { User } = useContext(UserContext);
  console.log(User);
  const location = useLocation();
  const items = [];
const navigate=useNavigate()
  Object.entries(cartQuantities).forEach(([categoryId, products]) => {
    Object.entries(products).forEach(([productId, item]) => {
      items.push({
        categoryId: categoryId,
        productId: productId,
        name: item.name,
        quantity: item.qty,
        price: item.price,
      });
    });
  });

  const total = getTotalPrice() + 5;

  const placeOrder = async () => {
    const orderData = {
      orderId: "ORD-2001",
      customerName: `${User.fullname}`,
      phone: `${User.phone}`,
      address: "Bhopal, MP",
      items: items,
      total: total,
    };
    const response = await axios.post(`${VITE_URL}/message/Orders`, orderData, {
      withCredentials: true,
    });
  };
  return (
    <div className=" flex justify-center items-center flex-col w-full h-full bg-[#f5f7fd] gap-5 min-h-screen">
      <button className="bg-green-600 p-3 rounded-xl  " onClick={()=>{navigate("/Home")}}>Back</button>
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
