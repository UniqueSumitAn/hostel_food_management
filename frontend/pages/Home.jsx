import React from "react";
import Product from "../src/components/Product";
import Header from "../src/components/Header";

const Home = () => {
  return (
    <div id="home" className=" bg-white p-6">
      <div className="flex justify-between  ">
        <img src="/logo.jpg" alt="" className="h-24 ml-12 " />

        <div className="flex justify-center items-center">
          <img
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"
            alt="P"
            className="bg-black rounded-full h-16 w-16 ml-auto mr-5 text-stone-100 
                 transform hover:scale-110 transition duration-300"
          />

          <div
            className="bg-emerald-500 text-2xl text-white rounded-4xl h-10 
                    flex justify-center items-center w-28 transform 
                    hover:scale-110 transition duration-300 "
          >
            Logout
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center h-fit">
        <img
          src="8807655.jpg"
          alt=""
          className={`
      mt-9
      h-72
      min-w-5xl
      rounded-4xl

      /* default */
     
      shadow-[0px_0px_25px_rgba(16,185,129,0.45),10px_14px_30px_rgba(0,0,0,0.30)]

    
      
    `}
        />
        <Header />
      </div>

      <div className="">
        <Product />
      </div>
    </div>
  );
};

export default Home;
