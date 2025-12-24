import React, { useState } from "react";

const Quantity = ({ onChange}) => {
  const [quantity, setQuantity] = useState(0);
  const [addToCart, setAddToCart] = useState(false);

  const increment = () => {
    setQuantity((prev) => {
      const updated = prev + 1;
      onChange(updated);
      return updated;
    });
  };

  const decrement = () => {
    setQuantity((prev) => {
      const updated = prev > 0 ? prev - 1 : 0;
      onChange(updated);

      if (updated === 0) {
        setAddToCart(false);
        
      }

      return updated;
    });
  };

  return (
      <div>
      {addToCart ? (
        <span className="flex items-center gap-2">
          {/* Decrement */}
          <button
            onClick={decrement}
            className="bg-emerald-500 text-white font-bold px-3 py-1 rounded-lg
                   transform hover:scale-110 hover:bg-emerald-400
                   transition duration-300 shadow"
          >
            −
          </button>

          {/* Quantity Input */}
          <input
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => {
              const val = Math.max(0, Number(e.target.value));
              setQuantity(val);
              onChange(val);

              if (val === 0) setAddToCart(false);
            }}
            className="no-spinner w-12 text-center border rounded-md font-semibold"
          />

          {/* Increment */}
          <button
            onClick={increment}
            className="bg-emerald-500 text-white font-bold px-3 py-1 rounded-lg
                   transform hover:scale-110 hover:bg-emerald-400
                   transition duration-300 shadow"
          >
            +
          </button>
        </span>
      ) : (
        <button
          className="bg-emerald-500 text-white font-semibold rounded-lg px-4 py-2
                 transform hover:scale-110 hover:bg-emerald-600
                 transition duration-300 shadow"
          onClick={() => {
            setAddToCart(true);
            setQuantity(1);
            onChange(1);
          }}
        >
          Add to cart
        </button>
      )}
    </div>
  );
};


export default Quantity;
