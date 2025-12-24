import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartQuantities, setCartQuantities] = useState({});
  const [checkout, setCheckout] = useState(false);

 const handleQuantityChange = (
  productId,
  categoryId,
  qty,
  name,
  price
) => {
  setCartQuantities((prev) => {
    const updated = { ...prev };

    // ✅ Ensure category exists
    if (!updated[categoryId]) {
      updated[categoryId] = {};
    }

    if (qty <= 0) {
      delete updated[categoryId][productId];

      // remove empty category
      if (Object.keys(updated[categoryId]).length === 0) {
        delete updated[categoryId];
      }
    } else {
      updated[categoryId][productId] = { qty, name, price };
    }

    setCheckout(Object.keys(updated).length > 0);
    return updated;
  });
};

  const getTotalPrice = () => {
    let total = 0;
    Object.values(cartQuantities).forEach((category) => {
      Object.values(category).forEach((product) => {
        total += product.qty * product.price;
      });
    });
    return total;
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
