import React from "react";
import Products from "../../public/Dummyproducts";
import { useState } from "react";
import Quantity from "../../util/Quantity";

const Product = () => {
  const [cartQuantities, setCartQuantities] = useState({});
  const [checkout, setcheckout] = useState(false);
  const handleQuantityChange = (productId, qty) => {
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: qty,
    }));
    setcheckout(true);
  };

  return (
    <div className="bg-white p-4 w-full h-full">
      {Products.map((Category, index) => (
        <div key={index} className="flex flex-col mb-6">
          <h2 className="text-xl font-bold mb-2">{Category.category}</h2>

          <div
            className="flex gap-6 flex-nowrap overflow-x-auto overflow-y-hidden hide-scrollbar h-80"
            onWheel={(e) => {
              e.preventDefault();
              e.currentTarget.scrollLeft += e.deltaY;
            }}
          >
            {Category.products.map((Productdetail, idx) => (
              <div
                key={idx}
                className="border p-3 rounded w-40 h-70 flex flex-col items-start shrink-0 relative pb-12"
              >
                <img src="./earth.jpg" />
                <div className="font-semibold">{Productdetail.name}</div>
                <div className="text-gray-600">
                  price: ₹{Productdetail.price}
                </div>

                <div className="absolute bottom-5 left-3 mt-10">
                  <Quantity
                    onChange={(qty) =>
                      handleQuantityChange(Productdetail.id, qty)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4" />
        </div>
      ))}

      <div
        className={`${
          checkout ? "flex" : "hidden"
        } fixed bottom-4 left-0 right-0 justify-center z-50`}
      >
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
          onClick={console.log("button clicked")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Product;
