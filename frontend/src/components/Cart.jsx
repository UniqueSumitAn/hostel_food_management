import React, { useContext } from "react";
import { CartContext } from "../../context/Cartcontext";

const Cart = () => {
  const{cartQuantities}=useContext(CartContext);
  
  return (
    <div>
      <div>
        {Object.entries(cartQuantities).map(([productId, qty]) => (
          <div key={productId}>
            <p>Product: {productId}</p>
            <p>Qty: {qty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
