import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const VITE_URL = import.meta.env.VITE_BACKEND_URL;

const Admin = () => {
  const { User } = useContext(UserContext);

  const [hostelDetails, setHostelDetails] = useState({
    hostelname: "",
    products: [],
    logo: "",
  });

  // New category form state
  const [category, setCategory] = useState("");
  const [productList, setProductList] = useState([
    { id: "", name: "", price: "" },
  ]);

  // Add to existing category
  const [selectedCategory, setSelectedCategory] = useState("");
  const [existingProductList, setExistingProductList] = useState([
    { id: "", name: "", price: "" },
  ]);

  // Fetch hostel
  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const res = await axios.post(
          `${VITE_URL}/hostel/fetchHostelDetails`,
          { userId: User?._id },
          { withCredentials: true }
        );
        setHostelDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (User?._id) fetchHostel();
  }, [User]);

  // Add new row for category products
  const addProductRow = () => {
    setProductList([...productList, { id: "", name: "", price: "" }]);
  };

  const updateProduct = (i, key, val) => {
    const list = [...productList];
    list[i][key] = val;
    setProductList(list);
  };

  // Submit new category
  const submitNewCategory = async () => {
    if (!category.trim()) return alert("Category name is required");

    const finalCategory = {
      category,
      products: productList.map((p) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
      })),
    };

    try {
      const res = await axios.post(
        `${VITE_URL}/hostel/addCategory`,
        { userId: User?._id, newCategory: finalCategory },
        { withCredentials: true }
      );

      alert("Category added!");
      setHostelDetails(res.data.hostel);

      setCategory("");
      setProductList([{ id: "", name: "", price: "" }]);
    } catch (err) {
      console.log(err);
    }
  };

  // Existing category new product row
  const addExistingProductRow = () => {
    setExistingProductList([
      ...existingProductList,
      { id: "", name: "", price: "" },
    ]);
  };

  const updateExistingProduct = (i, key, val) => {
    const list = [...existingProductList];
    list[i][key] = val;
    setExistingProductList(list);
  };

  // Submit new products to existing category
  const submitProductsToExistingCategory = async () => {
    if (!selectedCategory)
      return alert("Please select a category to update!");

    const formattedProducts = existingProductList.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
    }));

    try {
      const res = await axios.post(
        `${VITE_URL}/hostel/addProductToCategory`,
        {
          userId: User?._id,
          categoryName: selectedCategory,
          newProducts: formattedProducts,
        },
        { withCredentials: true }
      );

      alert("Products added!");
      setHostelDetails(res.data.hostel);

      setExistingProductList([{ id: "", name: "", price: "" }]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-5 flex gap-10">
      {/* LEFT — Existing Products */}
      <div className="w-[50%]">
        <h2 className="text-2xl font-bold mb-4">
          Existing Categories & Products
        </h2>

        {hostelDetails.products.map((cat, index) => (
          <div key={index} className="border p-4 rounded mb-4 bg-white shadow">
            <h3 className="text-xl font-semibold mb-2">{cat.category}</h3>
            {cat.products.map((p, pIndex) => (
              <div
                key={pIndex}
                className="flex justify-between border-b mb-1 pb-1"
              >
                <span>{p.name}</span>
                <span>₹{p.price}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* RIGHT — Add New Category + Add to Existing */}
      <div className="w-[50%]">

        {/* ADD NEW CATEGORY */}
        <h2 className="text-xl font-bold mb-3">Add New Category</h2>

        <input
          type="text"
          placeholder="Category Name"
          className="border p-2 w-full rounded mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <h3 className="font-semibold mb-2">Products for New Category</h3>

        {productList.map((p, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              className="border p-2 rounded w-[120px]"
              placeholder="id"
              value={p.id}
              onChange={(e) => updateProduct(index, "id", e.target.value)}
            />
            <input
              type="text"
              className="border p-2 rounded w-[200px]"
              placeholder="name"
              value={p.name}
              onChange={(e) => updateProduct(index, "name", e.target.value)}
            />
            <input
              type="number"
              className="border p-2 rounded w-[90px]"
              placeholder="price"
              value={p.price}
              onChange={(e) => updateProduct(index, "price", e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={addProductRow}
          className="bg-blue-500 text-white px-3 py-1 rounded mb-3"
        >
          + Add Row
        </button>

        <button
          onClick={submitNewCategory}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit New Category
        </button>

        {/* ADD TO EXISTING CATEGORY */}
        <hr className="my-6" />

        <h2 className="text-xl font-bold mb-3">
          Add Products to Existing Category
        </h2>

        {/* Category dropdown */}
        <select
          className="border p-2 rounded w-full mb-4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Choose Category</option>
          {hostelDetails.products.map((cat, idx) => (
            <option key={idx} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>

        {existingProductList.map((p, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              className="border p-2 rounded w-[120px]"
              placeholder="id"
              value={p.id}
              onChange={(e) =>
                updateExistingProduct(index, "id", e.target.value)
              }
            />
            <input
              type="text"
              className="border p-2 rounded w-[200px]"
              placeholder="name"
              value={p.name}
              onChange={(e) =>
                updateExistingProduct(index, "name", e.target.value)
              }
            />
            <input
              type="number"
              className="border p-2 rounded w-[90px]"
              placeholder="price"
              value={p.price}
              onChange={(e) =>
                updateExistingProduct(index, "price", e.target.value)
              }
            />
          </div>
        ))}

        <button
          onClick={addExistingProductRow}
          className="bg-blue-500 text-white px-3 py-1 rounded mb-3"
        >
          + Add Row
        </button>

        <button
          onClick={submitProductsToExistingCategory}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Add to This Category
        </button>
      </div>
    </div>
  );
};

export default Admin;
