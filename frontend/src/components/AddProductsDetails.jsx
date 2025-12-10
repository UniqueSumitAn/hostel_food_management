import React, { useState, useEffect } from "react";

const AddProductsDetails = ({
  ProductFormDetails,
  setProductFormDetails,
  HostelDetails,
  setFile,
}) => {
  const [PreviewImg, setPreviewImg] = useState();

  const calculateId = () => {
    const categoryObj = HostelDetails?.products?.find(
      (cat) =>
        cat.category?.toLowerCase() ===
        ProductFormDetails.Category?.toLowerCase()
    );

    if (categoryObj) {
      return categoryObj.products.length + 1;
    }
    return 1;
  };

  useEffect(() => {
    if (ProductFormDetails.Category) {
      const id = calculateId();
      setProductFormDetails((prev) => ({
        ...prev,
        ProductId: `${prev.Category}_${id}`,
      }));
    }
  }, [ProductFormDetails.Category, HostelDetails]);

  return (
    <div className="w-full flex flex-col gap-4 px-5 py-4 ">
      {/* PRODUCT ID */}
      <div className="text-lg font-semibold text-gray-700 text-center">
        Product ID:{" "}
        <span className="font-bold text-blue-700">
          {ProductFormDetails.ProductId || "Auto generated"}
        </span>
      </div>

      <form className="flex justify-between items-center gap-6">
        {/* IMAGE UPLOAD BOX */}
        <div
          className="w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            if (ProductFormDetails.Category) {
              document.getElementById("productImage").click();
            } else {
              alert("Select Category first");
            }
          }}
        >
          <img
            src={PreviewImg || "/placeholder.png"}
            className="object-cover w-full h-full"
            alt="preview"
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

        {/* INPUTS SECTION */}
        <div className="flex flex-col gap-4 w-full">
          {/* PRODUCT NAME */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              placeholder="Enter product name"
              className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setProductFormDetails((prev) => ({
                  ...prev,
                  ProductName: e.target.value,
                }))
              }
              value={ProductFormDetails.ProductName}
            />
          </div>

          {/* PRICE */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Price</label>
            <input
              placeholder="Enter price"
              type="number"
              className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setProductFormDetails((prev) => ({
                  ...prev,
                  Price: e.target.value,
                }))
              }
              value={ProductFormDetails.Price}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductsDetails;
