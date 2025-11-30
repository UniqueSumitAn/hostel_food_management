import axios from "axios";
import React, { useEffect } from "react";
const VITE_URL = import.meta.env.VITE_BACKEND_URL;
const Admin = () => {
  const [hostelDetails, sethostelDetails] = useState({
    hostelname: "",
    products: [],
    logo: "",
  });
  useEffect(async() => {
    const hostel=await axios.get(`${VITE_URL}/hostel/hostelDetails`)
  }, []);

  return (
    <div>
      Admin
      <div></div>
    </div>
  );
};

export default Admin;
