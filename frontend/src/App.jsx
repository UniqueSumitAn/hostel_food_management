import { useState } from "react";

import "./App.css";

import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="Checkout" element={<Checkout />} />
      <Route />
      <Route />
    </Routes>
  );
}

export default App;
