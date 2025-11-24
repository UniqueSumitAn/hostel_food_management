import React, { useContext } from "react";
import { CartContext } from "../../context/Cartcontext";

const Cart = () => {
  const { cartQuantities, handleQuantityChange } = useContext(CartContext);

  return (
    <div className="w-100 bg-white p-3 rounded-lg">
      <div className="flex flex-col gap-8">
        {Object.entries(cartQuantities).map(([productId, item]) => (
          <div key={productId} className="flex items-center gap-4">
            {/* Product Name */}
            <p className="flex-shrink-0">{item.name}</p>

            
            <div className="flex-1 flex items-center ">
              
              <p className="text-gray-700 ml-auto">₹{item.price}</p>

              {/* Quantity buttons aligned to the right */}
              <div className="flex gap-2 bg-green-800 w-16 p-2 rounded-lg text-white ml-auto">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
