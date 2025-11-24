import React, { useContext } from "react";
import { CartContext } from "../../context/Cartcontext";

const Bill = () => {
  const { cartQuantities, getTotalPrice } = useContext(CartContext);
  const price = getTotalPrice();

  return (
    <div className="w-100 bg-white p-3 rounded-lg">
      <h2 className="font-bold text-lg">Bill details</h2>

      <div>
        <div className="flex gap-8">
          <p>🧾 Items total</p>
          <p className="ml-auto">₹{price}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <p>🛍️ Handling charge</p>

            <hr className="flex-1 w-30 border-t border-dotted border-black ml-3" />
          </div>

          <p className="ml-auto">₹5</p>
        </div>
      </div>

      <div className="flex mt-3">
        <h2 className="font-bold text-lg">Grand total</h2>
        <h2 className="ml-auto font-bold text-lg">₹{price + 5}</h2>
      </div>
     
    </div>
  );
};

export default Bill;
