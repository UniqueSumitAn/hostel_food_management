import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartQuantities, setCartQuantities] = useState({});
  const [checkout, setCheckout] = useState(false);

  const handleQuantityChange = (productId, qty) => {
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: qty,
    }));
    setCheckout(true);
  };

  return (
    <CartContext.Provider
      value={{
        cartQuantities,
        setCartQuantities,
        checkout,
        setCheckout,
        handleQuantityChange,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
