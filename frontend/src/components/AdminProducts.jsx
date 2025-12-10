import React, { useContext } from "react";
import { HostelProductsContext } from "../../context/HostelProductsContext";

const AdminProducts = () => {
  const { HostelDetails, setHostelDetails } = useContext(HostelProductsContext);

  return (
    <div className="">
      {HostelDetails?.products?.map((Category, index) => (
        <div key={index} className="flex flex-col justify-between bg-white p-5 m-5 rounded-2xl">
              <span className=" h-30 flex justify-center items-center text-2xl">
                {Category.category}
              </span>
          {Category.products.map((Productdetail, idx) => (
            <div className="flex  justify-between mb-6">
              <span className="w-[16.7%] justify-center items-center">
                <img
                  src={Productdetail.img}
                  alt={Productdetail.name}
                  className="w-full h-30 object-contain rounded-md"
                />
              </span>
              <span className="w-[16.7%] h-30 flex justify-center items-center">
                {Productdetail.name}
              </span>
              <span className="w-[16.7%] h-30 flex justify-center items-center">
                {Productdetail.price}
              </span>
              <span className="w-[16.7%] h-30 flex justify-center items-center">
                Stock
              </span>
              <span className="w-[16.7%] h-30 flex justify-center gap-5 items-center">
                <button className="bg-green-800 p-2 rounded-2xl cursor-pointer text-white">
                  Update
                </button>
                <button className="bg-red-700 p-2 rounded-2xl cursor-pointer text-white">
                  Remove
                </button>
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminProducts;
