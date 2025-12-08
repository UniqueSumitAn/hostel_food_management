import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Addnewcategorydropdown from "../src/components/Addnewcategorydropdown";
import AddProductsDetails from "../src/components/AddProductsDetails";

const VITE_URL = import.meta.env.VITE_BACKEND_URL;

const Admin = () => {
  const { User } = useContext(UserContext);
  const [HostelDetails, setHostelDetails] = useState({
    hostelname: "",
    products: [],
    logo: "",
  });

  useEffect(() => {
    const fetchhosteldetails = async () => {
      const response = await axios.post(
        `${VITE_URL}/hostel/fetchHostelDetails`,
        { userId: User._id },
        { withCredentials: true }
      );
      console.log(response.data);
      setHostelDetails(response.data);
    };
    fetchhosteldetails();
  }, [User]);
  const [ProductFormDetails, setProductFormDetails] = useState({
    Category: "",
    ProductName: "",
    Price: "",
    ProductId: "",
    Img: "",
  });
  const [AddNewProduct, setAddNewProduct] = useState();
  const [ShowAddCategoryModal, setShowAddCategoryModal] = useState();

  const [CategoryDropdown, setCategoryDropdown] = useState();
  const [CategorySearch, setCategorySearch] = useState();
  const [File, setFile] = useState();
  return (
    <div className=" flex flex-col justify-center items-center">
      <div>Admin Welcome to {HostelDetails.hostelname}</div>
      <div
        className=" w-50 h-30  flex justify-center items-center p-5"
        onClick={() => {
          setAddNewProduct(true);
        }}
      >
        <div className="border-dashed border-cyan-700 border-2 p-3 flex justify-center items-center gap-4 flex-col cursor-pointer bg-[oklch(0.93_0.02_252.15)]">
          <span className="text-3xl">+</span>
          <span> Add new products</span>
        </div>
      </div>

      {AddNewProduct && (
        <div className="z-10 w-[50vw]  h-[50vh] bg-amber-600 ">
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
        </div>
      )}
    </div>
  );
};
export default Admin;
