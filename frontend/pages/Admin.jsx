import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const VITE_URL = import.meta.env.VITE_BACKEND_URL;
const Admin = () => {
  const [hostelDetails, sethostelDetails] = useState({
    hostelname: "",
    products: [],
    logo: "",
  });
  const { User } = useContext(UserContext);
  useEffect(async () => {
    const hostel = await axios.get(
      `${VITE_URL}/hostel/fetchHostelDetails`,
      User,
      { withCredentials: true }
    );
  }, []);

  return (
    <div>
      Admin
      <div></div>
    </div>
  );
};

export default Admin;
