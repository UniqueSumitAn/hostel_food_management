import React from "react";
import { useState } from "react";

const AddProductsDetails = ({
  ProductFormDetails,
  setProductFormDetails,

  setFile,
}) => {
  const [PreviewImg, setPreviewImg] = useState();

  return (
    <div className="gap-5">
      <form className="flex justify-center items-center">
        <div className="w-[15%] flex justify-center items-center">
          <img
            src={PreviewImg || "preview"}
            className=" aspect-square"
            onClick={() => {if(ProductFormDetails.Category){document.getElementById("productImage").click()}else{alert("Select Category")}}}
          />
          <input
            className="hidden"
            type="file"
            id="productImage"
            onChange={(e) => {
              setPreviewImg(URL.createObjectURL(e.target.files[0]));
              setFile(e.target.files[0]);
            }}
          />
        </div>
        <div className="w-[25%] flex justify-center items-center">
          ProductId :
        </div>
        <input
          placeholder="Product Name"
          className="w-[25%] flex justify-center items-center"
          onChange={(e) => {
            setProductFormDetails((prev) => ({
              ...prev,
              ProductName: e.target.value,
            }));
          }}
          value={ProductFormDetails.ProductName}
        />
        <input
          placeholder="price"
          className="w-[25%] flex justify-center items-center"
          onChange={(e) => {
            setProductFormDetails((prev) => ({
              ...prev,
              Price: e.target.value,
            }));
          }}
          value={ProductFormDetails.Price}
        />
      </form>
    </div>
  );
};

export default AddProductsDetails;
