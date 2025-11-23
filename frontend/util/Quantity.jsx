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
          <button onClick={decrement} className="bg-gray-200 px-2 py-1 rounded">
            -
          </button>

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
            className="w-12 text-center border rounded appearance-none"
          />

          <button onClick={increment} className="bg-gray-200 px-2 py-1 rounded">
            +
          </button>
        </span>
      ) : (
        <button
          className="bg-green-600 rounded-lg p-2 text-white"
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
