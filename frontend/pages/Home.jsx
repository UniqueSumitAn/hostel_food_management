import React from "react";
import Product from "../src/components/Product";
import Header from "../src/components/Header";

const Home = () => {
  return (
    <div className="bg-[#f5f7fd] gap-3 pl-3 pr-3">
      <div className="fixed top-0 left-0 right-0 z-50 ">
        <Header />
      </div>
      <Product />
    </div>
  );
};

export default Home;
