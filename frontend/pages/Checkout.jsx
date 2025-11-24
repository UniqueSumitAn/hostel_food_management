import React from "react";
import Product from "../src/components/Product";
import Cart from "../src/components/Cart";
import Bill from "../src/components/Bill";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();

  const { cart } = location.state || {};
  console.log(cart);
  return (
    <div className=" flex justify-center items-center flex-col w-full h-full bg-[#f5f7fd] gap-5">
      <Cart />
      <Bill />
      You might also like
    </div>
  );
};

export default Checkout;
