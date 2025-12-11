import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Addnewcategorydropdown from "./Addnewcategorydropdown";
import AddProductsDetails from "./AddProductsDetails";
import { HostelProductsContext } from "../../context/HostelProductsContext";

const VITE_URL = import.meta.env.VITE_BACKEND_URL;

const AdminAddNewProduct = ({ buttonName, buttonStyle }) => {
  const { User } = useContext(UserContext);
  const { HostelDetails, setHostelDetails } = useContext(HostelProductsContext);

  const [AddNewProduct, setAddNewProduct] = useState(false);
  const [ShowAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [CategoryDropdown, setCategoryDropdown] = useState(false);
  const [CategorySearch, setCategorySearch] = useState("");
  const [File, setFile] = useState(null);
  const [Hide, setHide] = useState(true);

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
      setHostelDetails(response.data.hostel);
      alert(response.data.message);
      setAddNewProduct(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* ADD PRODUCT BUTTON */}
      <div
        className="w-60 h-2 p-2 rounded-2xl"
        onClick={() => setAddNewProduct(true)}
      >
        <div
          className={`border-2 border-cyan-700 flex justify-center items-center gap-4 cursor-pointer rounded-2xl ${buttonStyle}`}
        >
          <span className="text-2xl">+</span>
          <span>{buttonName}</span>
        </div>
      </div>

      {/* MAIN PRODUCT MODAL */}
      {AddNewProduct && (
        <div className="z-10 fixed inset-0 m-auto justify-center items-center w-[50vw] h-[70vh] bg-amber-600 flex flex-col">
          {/* CATEGORY SEARCH */}
          <div className="p-2 rounded w-full mb-4 flex-col flex ">
            <div className="border p-2 rounded w-full mb-4 flex">
              <input
                placeholder="Choose category"
                value={CategorySearch}
                className="w-[90%] outline-none"
                onFocus={() => setCategoryDropdown(true)}
                onChange={(e) => setCategorySearch(e.target.value)}
              />
              <span>▼</span>
            </div>

            {/* CATEGORY DROPDOWN */}
            {CategoryDropdown && (
              <div className="bg-white border rounded shadow p-2 max-h-40 overflow-y-auto">
                {HostelDetails?.products
                  ?.filter((h) =>
                    h.category
                      .toLowerCase()
                      .includes(CategorySearch.toLowerCase())
                  )
                  .map((catObj, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setCategorySearch(catObj.category);
                        setProductFormDetails((prev) => ({
                          ...prev,
                          Category: catObj.category,
                        }));
                        setCategoryDropdown(false);
                        setHide(false);
                      }}
                    >
                      {catObj.category}
                    </div>
                  ))}

                <div
                  className={`${
                    buttonName === "Add New Product" ? "hidden" : ""
                  } p-2 text-blue-700 cursor-pointer hover:bg-gray-100`}
                  onClick={() => setShowAddCategoryModal(true)}
                >
                  + Add new category
                </div>
              </div>
            )}
          </div>

          {/* ADD NEW CATEGORY MODAL */}
          {ShowAddCategoryModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
              <Addnewcategorydropdown
                setCategoryDropdown={setCategoryDropdown}
                setCategorySearch={setCategorySearch}
                setShowAddCategoryModal={setShowAddCategoryModal}
                ProductFormDetails={ProductFormDetails}
                setProductFormDetails={setProductFormDetails}
                setHide={setHide}
              />
            </div>
          )}

          {/* PRODUCT DETAILS FORM */}
          <AddProductsDetails
            ProductFormDetails={ProductFormDetails}
            setProductFormDetails={setProductFormDetails}
            HostelDetails={HostelDetails}
            setFile={setFile}
            className={`${Hide ? "hidden" : ""}`}
          />

          <div className="mt-auto mb-5 gap-5 flex justify-center items-center ">
            <button
              className="bg-green-800 p-2 text-white w-25 cursor-pointer rounded-2xl"
              onClick={SendNewProduct}
            >
              Add
            </button>

            <button
              className="bg-red-700 p-2 text-white w-25 cursor-pointer rounded-2xl"
              onClick={() => setAddNewProduct(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAddNewProduct;
