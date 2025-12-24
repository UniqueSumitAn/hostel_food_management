import React, { useContext, useEffect } from "react";
import Products from "../../public/Dummyproducts";

import Quantity from "../../util/Quantity";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/Cartcontext";

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
    <div className="w-full flex flex-col h-full space-y-10 pb-10">
      {/* Loop products categories */}
      {Products.map((Category, index) => (
        <div key={index} className="flex flex-col">
          <div className="relative ml-6  ">
            <h2 className="text-xl font-serif font-bold">
              {Category.category}
            </h2>
            {/* Arrow Buttons */}
            <div className="absolute right-6 -top-6 flex gap-3 z-30">
              <button
                onClick={() =>
                  document
                    .getElementById(`scroll-row-${index}`)
                    ?.scrollBy({ left: -300, behavior: "smooth" })
                }
                className="text-black transition transform hover:scale-125 hover:text-emerald-600 text-6xl"
              >
                ←
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById(`scroll-row-${index}`)
                    ?.scrollBy({ left: 300, behavior: "smooth" })
                }
                className="text-black transition transform hover:scale-125 hover:text-emerald-600 text-6xl"
              >
                →
              </button>
            </div>

            {/* Scrollable Row */}
            <div
              id={`scroll-row-${index}`}
              className="flex gap-6 flex-nowrap overflow-x-auto overflow-y-hidden h-68 items-center scroll-smooth  hide-scrollbar p-1"
              onWheel={(e) => e.preventDefault()}
            >
              {Category.products.map((Productdetail, idx) => (
                <div
                  key={idx}
                  className=" justify-between
                bg-white border-2 border-gray-300
                p-3 w-36 h-64 flex flex-col items-center shrink-0 relative
                rounded-2xl
                transform transition-all duration-300
                hover:scale-105 hover:shadow-xl
              "
                >
                  {/* Image + Content */}
                  <div className="w-full text-center">
                    <img
                      loading="lazy"
                      src={Productdetail.image}
                      alt={Productdetail.name}
                      className="h-20 w-full object-cover rounded-md"
                    />

                    <div className="font-semibold h-16 mt-2 text-center text-gray-800 text-sm">
                      {Productdetail.name}
                    </div>

                    <div className="text-gray-700 font-medium text-sm">
                      ₹{Productdetail.price}
                    </div>
                  </div>

                  {/* Add / Quantity Area */}
                  <div className="absolute bottom-3 w-full flex justify-center">
                    <div
                      className="
                      bg-emerald-500 hover:bg-emerald-600 text-white
                      transform hover:scale-110 transition duration-300
                      rounded-lg px-2 py-1 shadow text-sm
                    "
                    ><Quantity
                        onChange={(qty) =>
                          handleQuantityChange(
                            Productdetail._id,
                            Category._id,
                            qty,
                            Productdetail.name,
                            Productdetail.price
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Checkout Button */}
      <div
        className={`${checkout ? "flex animate-fadeInUp" : "hidden"
          } fixed bottom-4 left-0 right-0 justify-center z-50`}
      >
        <button
          className="
        bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg
        shadow-lg transform transition-all duration-300
        hover:bg-emerald-600 hover:scale-105 hover:shadow-2xl
        focus:outline-none focus:ring-4 focus:ring-emerald-300
      "
          onClick={() => navigate("/Checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Product;
