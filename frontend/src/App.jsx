import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";

import { CartProvider } from "../context/Cartcontext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Checkout" element={<Checkout />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
