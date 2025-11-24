import React, { useContext } from "react";
import { CartContext } from "../../context/Cartcontext";

const Cart = () => {
  const { cartQuantities, handleQuantityChange } = useContext(CartContext);

  return (
    <div className="w-100 bg-white p-3 rounded-lg">
      <div className="flex-col flex gap-8 ">
        {Object.entries(cartQuantities).map(([productId, item]) => (
          <div key={productId} className="flex gap-4 items-center">
            <p> {item.name}</p>
            <div className="flex gap-2 bg-green-800 w-16 p-2 rounded-lg text-white float-right ml-auto">
              <button
                onClick={() =>
                  handleQuantityChange(
                    productId,
                    item.qty - 1,
                    item.name,
                    item.price
                  )
                }
              >
                -
              </button>
              <p>{item.qty}</p>
              <button
                onClick={() =>
                  handleQuantityChange(
                    productId,
                    item.qty + 1,
                    item.name,
                    item.price
                  )
                }
              >
                +
              </button>
            </div>
            <p className="font-bold text-lg">₹ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
