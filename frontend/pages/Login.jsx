import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const VITE_URL = import.meta.env.VITE_BACKEND_URL;
const Login = () => {
  const { User, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [Status, setStatus] = useState("Register");
  const [OtpBox, setOtpBox] = useState(false);
  const [SubmitButton, setSubmitButton] = useState(false);
  const [InputOtp, setInputOtp] = useState();
  const [otp, setotp] = useState();
  const [Verified, setVerified] = useState(false);
  const hostels = ["Hostel A", "Hostel B", "Hostel C", "Hostel D", "+ Add New"];
  const [HostelSearch, setHostelSearch] = useState("");
  const [ShowHostelDropdown, setShowHostelDropdown] = useState(false);
  const [AddingNewHostel, setAddingNewHostel] = useState(false);

  const [FormDetails, setFormDetails] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    Hostel: "",
  });
  const HandleChange = (e) => {
    setFormDetails({
      ...FormDetails,
      [e.target.name]: e.target.value,
    });
  };
  const HandleLogin = async () => {
    if (Verified === true || Status === "Login") {
      const response = await axios.post(
        `${VITE_URL}/user/${Status}`,
        FormDetails,
        {
          withCredentials: true,
        }
      );
      if (response.data.panel === "user") {
        setUser(response.data.user);
        navigate("/Home", {
          state: {
            user: response.data.user,
          },
        });
      } else if (response.data.panel === "admin") {
        setUser(response.data.user);
        navigate("/adminHome", {
          state: {
            user: response.data.user,
          },
        });
      }
    }
  };
  const resendOtp = async () => {
    alert(`OTP sent on ${FormDetails.Email}`);
    const response = await axios.post(`${VITE_URL}/user/Otp`, FormDetails, {
      withCredentials: true,
    });
    if (response.data.success) {
      setotp(response.data.otp);
    }
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  const verifyOtp = () => {
    if (otp) {
      console.log(otp, "::", InputOtp);
      if (otp == InputOtp) {
        setVerified(true);
      } else {
        alert("Otp is wrong");
      }
    }
  };

  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <div className=" w-100 h-150 bg-amber-500 rounded-2xl flex flex-col justify-center items-center">
        <form
          onSubmit={(e) => HandleSubmit(e)}
          className=" flex flex-col justify-center items-center w-80 h-80 gap-5"
        >
          <input
            name="Name"
            value={FormDetails.Name}
            onChange={HandleChange}
            placeholder="Name"
            className={`w-72 h-10 p-2 outline-none rounded ${
              Status === "Login" ? "hidden" : "block"
            }`}
          />
          <input
            name="Email"
            value={FormDetails.Email}
            onChange={HandleChange}
            placeholder="Email"
            className="w-72 h-10 p-2 outline-none rounded"
          />
          <input
            name="Phone"
            value={FormDetails.Phone}
            onChange={HandleChange}
            placeholder="Phone"
            className={`w-72 h-10 p-2 outline-none rounded ${
              Status === "Login" ? "hidden" : "block"
            }`}
          />
          <div
            className={`relative w-72 ${
              Status === "Login" ? "hidden" : "block"
            }`}
          >
            <input
              type="text"
              placeholder="Search Hostel"
              value={FormDetails.Hostel || HostelSearch}
              onFocus={() => setShowHostelDropdown(true)}
              onChange={(e) => {
                setHostelSearch(e.target.value);
                setShowHostelDropdown(true);
              }}
              className="w-full h-10 p-2 outline-none rounded"
            />

            {ShowHostelDropdown && !AddingNewHostel && (
              <div className="absolute top-12 left-0 w-full max-h-40 bg-white shadow-lg rounded overflow-y-auto z-10">
                {/* Existing hostels */}
                {hostels
                  .filter((h) =>
                    h.toLowerCase().includes(HostelSearch.toLowerCase())
                  )
                  .map((hostel, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (hostel === "+ Add New") {
                          setAddingNewHostel(true);
                        } else {
                          setFormDetails({ ...FormDetails, Hostel: hostel });
                          setHostelSearch(hostel);
                          setShowHostelDropdown(false);
                        }
                      }}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {hostel}
                    </div>
                  ))}

                {/* No match */}
                {hostels.filter((h) =>
                  h.toLowerCase().includes(HostelSearch.toLowerCase())
                ).length === 0 && (
                  <div className="p-2 text-gray-500">No matches found</div>
                )}
              </div>
            )}
            {AddingNewHostel && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Enter new hostel name"
                  value={FormDetails.Hostel}
                  onChange={(e) => {
                    setFormDetails({
                      ...FormDetails,
                      Hostel: e.target.value,
                    });
                  }}
                  className="w-full h-10 p-2 outline-none border rounded"
                  autoFocus
                />

                <button
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    setHostelSearch(FormDetails.Hostel);
                    setAddingNewHostel(false);
                    setShowHostelDropdown(false);
                  }}
                >
                  Save Hostel
                </button>

                <button
                  className="mt-2 ml-3 px-3 py-1 bg-gray-300 rounded"
                  onClick={() => {
                    setAddingNewHostel(false);
                    setFormDetails({ ...FormDetails, Hostel: "" });
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <input
            name="Password"
            value={FormDetails.Password}
            onChange={HandleChange}
            placeholder="Password"
            className="w-72 h-10 p-2 outline-none rounded"
          />
          <div className=" flex flex-col justify-center items-center">
            <button
              className={`p-2 rounded-lg w-30 bg-green-600 cursor-pointer text-white mt-auto mb-3 
  ${Status === "Register" && !OtpBox ? "block" : "hidden"}`}
              onClick={() => {
                setSubmitButton(true);
                setOtpBox(true);
                if (
                  FormDetails.Name &&
                  FormDetails.Email &&
                  FormDetails.Phone &&
                  FormDetails.Password
                ) {
                  resendOtp();
                }
              }}
            >
              Send Otp
            </button>

            <div
              className={`${
                OtpBox ? "block" : "hidden"
              } w-50 h-10 border-2 mb-2`}
            >
              <input
                type="text"
                placeholder="Enter OTP"
                value={InputOtp}
                maxLength={5}
                onChange={(e) => {
                  setInputOtp(e.target.value);
                }}
                className="w-30 h-full p-2 outline-none"
              />
              <button className="cursor-pointer" onClick={verifyOtp}>
                {Verified === false ? "Verify" : "✔ Verified"}
              </button>
            </div>
            <button
              type="submit"
              onClick={HandleLogin}
              className={`p-2 rounded-lg w-20 bg-green-600 cursor-pointer text-white mt-auto mb-3 ${
                SubmitButton ? "block" : "hidden"
              }`}
            >
              {Status}
            </button>

            <p
              className={`text-blue-500 cursor-pointer mb-10 ${
                OtpBox ? "block" : "hidden"
              }`}
              onClick={() => {
                if (
                  FormDetails.Name &&
                  FormDetails.Email &&
                  FormDetails.Phone &&
                  FormDetails.Password
                ) {
                  resendOtp();
                }
                setVerified(false);
              }}
            >
              Resend Otp
            </p>
          </div>
        </form>
        <div className="mt-8">
          {Status === "Register"
            ? "Already have an account ?"
            : "Create an account "}
          <button
            onClick={() => {
              Status === "Register"
                ? setStatus("Login")
                : setStatus("Register");
              Status == "Login" ? setOtpBox(true) : setOtpBox(false);
              Status == "Register"
                ? setSubmitButton(true)
                : setSubmitButton(false);
            }}
            className={`text-blue-500 cursor-pointer`}
          >
            Click here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
