import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Addnewcategorydropdown from "./Addnewcategorydropdown";
import AddProductsDetails from "./AddProductsDetails";
import { HostelProductsContext } from "../../context/HostelProductsContext";
const VITE_URL = import.meta.env.VITE_BACKEND_URL;
const AdminAddNewProduct = ({ buttonName, buttonStyle }) => {
  const { User } = useContext(UserContext);
  const { HostelDetails, setHostelDetails } = useContext(HostelProductsContext);

  const [ProductFormDetails, setProductFormDetails] = useState({
    Category: "",
    ProductName: "",
    Price: "",
    ProductId: "",
    Img: "",
  });
  
  const SendNewProduct = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", File);
    formdata.append("ProductName", ProductFormDetails.ProductName);
    formdata.append("Price", ProductFormDetails.Price);
    formdata.append("Category", ProductFormDetails.Category);
    formdata.append("ProductId", ProductFormDetails.ProductId);
    formdata.append("Action", buttonName);
    formdata.append("HostelDetails", HostelDetails._id);
    formdata.append("user", User._id);

    try {
      const response = await axios.post(
        `${VITE_URL}/hostel/addProducts`,
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const [AddNewProduct, setAddNewProduct] = useState();
  const [ShowAddCategoryModal, setShowAddCategoryModal] = useState();

  const [CategoryDropdown, setCategoryDropdown] = useState();
  const [CategorySearch, setCategorySearch] = useState();
  const [File, setFile] = useState();
  return (
    <div>
      <div
        className={`w-60 h-2 p-2 rounded-2xl`}
        onClick={() => {
          setAddNewProduct(true);
        }}
      >
        {/* bg-[oklch(0.93_0.02_252.15)] */}
        <div
          className={`border-2 border-cyan-700 flex justify-center items-center gap-4  cursor-pointer rounded-2xl ${buttonStyle}`}
        >
          <span className="text-2xl">+</span>
          <span> {buttonName}</span>
        </div>
      </div>

      {AddNewProduct && (
        <div className="z-10 fixed inset-0 m-auto justify-center items-center w-[50vw] h-[50vh] bg-amber-600 flex flex-col">
          <div className=" p-2 rounded w-full mb-4 flex-col flex ">
            <div className="border p-2 rounded w-full mb-4 flex ">
              <input
                placeholder="Choose category"
                value={CategorySearch}
                className="w-[90%] outline-none"
                onFocus={() => setCategoryDropdown(true)}
                onChange={(e) => setCategorySearch(e.target.value)}
              />
              <span>▼</span>
            </div>
            {CategoryDropdown && (
              <div>
                {HostelDetails.products
                  .filter((h) =>
                    h.toLowerCase().includes(CategorySearch.toLowerCase())
                  )
                  .map((category, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setCategorySearch(category);
                      }}
                    >
                      {category}
                    </div>
                  ))}
                <div onClick={() => setShowAddCategoryModal(true)}>
                  + add new category
                </div>
              </div>
            )}
          </div>
          {ShowAddCategoryModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
              <Addnewcategorydropdown
                setCategoryDropdown={setCategoryDropdown}
                setCategorySearch={setCategorySearch}
                setShowAddCategoryModal={setShowAddCategoryModal}
                ProductFormDetails={ProductFormDetails}
                setProductFormDetails={setProductFormDetails}
              />
            </div>
          )}
          <AddProductsDetails
            ProductFormDetails={ProductFormDetails}
            setProductFormDetails={setProductFormDetails}
            setFile={setFile}
          />
          <div className="mt-auto mb-5 gap-5 flex justify-center items-center ">
            <button
              className="bg-green-800 p-2 text-white  w-25 cursor-pointer rounded-2xl"
              onClick={(e) => {
                SendNewProduct(e);
              }}
            >
              Add
            </button>
            <button
              className="bg-green-800 p-2 text-white  w-25 cursor-pointer rounded-2xl"
              onClick={() => {
                setAddNewProduct(false);
              }}
            >
              Cancle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAddNewProduct;
