import React, { createContext, useState } from "react";

export const HostelProductsContext = createContext();

export const HostelProductsProvider = ({ children }) => {
  const [HostelDetails, setHostelDetails] = useState({
    hostelname: "",
    products: [],
    logo: "",
  });

  return (
    <HostelProductsContext.Provider 
      value={{
        HostelDetails,
        setHostelDetails,
      }}
    >
      {children}
    </HostelProductsContext.Provider>  
  );
};
