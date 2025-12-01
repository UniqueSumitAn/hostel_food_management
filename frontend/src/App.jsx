import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";

import { CartProvider } from "../context/Cartcontext";
import Admin from "../pages/Admin";
import { UserProvider } from "../context/UserContext";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/adminHome" element={<Admin />} />
        </Routes>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
