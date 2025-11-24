import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartQuantities, setCartQuantities] = useState({});
  const [checkout, setCheckout] = useState(false);

  const handleQuantityChange = (productId, qty, name, price) => {
    setCartQuantities((prev) => {
      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }

      // Otherwise update
      return {
        ...prev,
        [productId]: { qty, name, price },
      };
    });

    // Show checkout button only if cart has items
    setCheckout(true);
    
  };
  const getTotalPrice = () => {
    return Object.values(cartQuantities).reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartQuantities,
        setCartQuantities,
        checkout,
        setCheckout,
        handleQuantityChange,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
