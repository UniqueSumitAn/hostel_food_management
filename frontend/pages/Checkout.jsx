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
    <div>
      <Cart />
      <Bill />
      You might also like
    </div>
  );
};

export default Checkout;
