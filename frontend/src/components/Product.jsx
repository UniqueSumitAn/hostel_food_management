import React, { useContext } from "react";
import Products from "../../public/Dummyproducts";
import { useState } from "react";
import Quantity from "../../util/Quantity";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/Cartcontext";
import Hero from "../../util/Hero";
const Product = () => {
  const {
    cartQuantities,
    setCartQuantities,
    checkout,
    setcheckout,
    handleQuantityChange,
  } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className=" p-4 w-full h-full ">
      <div className="w-full h-4/5 mt-5 flex flex-col items-center">
        <div className="w-4/5">
          <Hero />
        </div>
      </div>
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
                className="bg-white border-gray-600 p-3 rounded w-40 h-70 flex flex-col items-start shrink-0 relative pb-12"
              >
                <img src="./earth.jpg" />
                <div className="font-semibold">{Productdetail.name}</div>
                <div className="text-gray-600">
                  price: ₹{Productdetail.price}
                </div>

                <div className="absolute bottom-5 left-3 mt-10">
                  <Quantity
                    onChange={(qty) =>
                      handleQuantityChange(
                        Productdetail.id,
                        qty,
                        Productdetail.name,
                        Productdetail.price
                      )
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
          onClick={() => {
            console.log("button clicked");
            navigate("/Checkout");
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Product;
