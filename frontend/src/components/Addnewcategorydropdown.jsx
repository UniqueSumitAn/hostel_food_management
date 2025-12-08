import React from "react";

const Addnewcategorydropdown = ({
  setShowAddCategoryModal,
  ProductFormDetails,
  setProductFormDetails,
  setCategorySearch,
  setCategoryDropdown,
}) => {
  return (
    <div className="flex justify-center items-center p-3  flex-col gap-3 bg-blue-300 w-[45%] h-[45%]">
      <input className="h-8"
        type="text"
        placeholder="Category Name"
        value={ProductFormDetails.Category}
        onChange={(e) => {
          setProductFormDetails({
            ...ProductFormDetails,
            Category: e.target.value,
          });
        }}
        autoFocus
      />
      <div className="flex gap-4">
        <button className="bg-green-400 text-white w-[50%] p-2 rounded-2xl"
          onClick={(e) => {
            e.preventDefault();
            setCategorySearch(ProductFormDetails.Category);
            setCategoryDropdown(false);
            setShowAddCategoryModal(false);
          }}
        >
          Save
        </button>
        <button className="bg-green-400 text-white w-[50%] p-2 rounded-2xl"
          onClick={() => {
            setShowAddCategoryModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Addnewcategorydropdown;
