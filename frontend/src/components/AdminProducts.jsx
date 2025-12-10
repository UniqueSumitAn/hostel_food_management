import React, { useContext, useState } from "react";
import { HostelProductsContext } from "../../context/HostelProductsContext";

const AdminProducts = () => {
  const { HostelDetails, setHostelDetails } = useContext(HostelProductsContext);
  const [ProductDetails, setProductDetails] = useState({
    Name: "",
    Id: "",
    Price: "",
    Category: "",
    Stock: "",
  });
  const UpdateProductDetails = async (action) => {};
  const [Confirmation, setConfirmation] = useState(null);
  return (
    <div className="">
      {HostelDetails?.products?.map((Category, index) => (
        <div
          key={index}
          className="flex flex-col justify-between bg-white p-5 m-5 rounded-2xl"
        >
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
                <button
                  className="bg-green-800 p-2 rounded-2xl cursor-pointer text-white "
                  onClick={() => {
                    setProductDetails({
                      ...ProductDetails,
                      Name: Productdetail.name,
                      Id: Productdetail._id,
                      Price: Productdetail.price,
                      Category: HostelDetails._id,
                    });
                  }}
                >
                  Update
                </button>
                <button
                  className="bg-red-700 p-2 rounded-2xl cursor-pointer text-white"
                  onClick={() => {
                    setConfirmation(Productdetail._id);
                    setProductDetails({
                      ...ProductDetails,
                      Name: Productdetail.name,
                      Id: Productdetail._id,
                      Price: Productdetail.price,
                      Category: HostelDetails._id,
                    });
                  }}
                >
                  Remove
                </button>
                {Confirmation === Productdetail._id && (
                  <div className="gap-3 p-5  text-white z-10 fixed inset-0  ml-[30%] justify-center items-center flex">
                    <div className="bg-green-900 w-[35%] h-[25%] flex justify-center items-center gap-5 rounded-2xl border-amber-50">
                      <span>Are You Sure ?</span>
                      <button className="p-3 rounded-2xl border-2 h-15 w-20">
                        yes
                      </button>
                      <button
                        className="p-3 rounded-2xl border-2 h-15 w-20"
                        onClick={() => {
                          setConfirmation(null);
                        }}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                )}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminProducts;
