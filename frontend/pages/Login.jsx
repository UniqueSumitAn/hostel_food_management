import React, { useState } from "react";

const Login = () => {
  const [Status, setStatus] = useState("Register");
  const [OtpBox, setOtpBox] = useState(false);
  const [SubmitButton, setSubmitButton] = useState(false);
  const [FormDetails, setFormDetails] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
  });
  const HandleChange = (e) => {
    setFormDetails({
      ...FormDetails,
      [e.target.name]: e.target.value,
    });
  };
  const resendOtp = async () => {};
  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <div className=" w-100 h-100 bg-amber-500 rounded-2xl flex flex-col justify-center items-center">
        <form
          onSubmit={(e) => HandleSubmit(e)}
          className=" flex flex-col justify-center items-center w-80 h-80 gap-5"
        >
          <input
            name="Name"
            value={FormDetails.Name}
            onChange={HandleChange}
            placeholder="Name"
            className={`${Status === "Login" ? "hidden" : "block"}`}
          />
          <input
            name="Email"
            value={FormDetails.Email}
            onChange={HandleChange}
            placeholder="Email"
          />
          <input
            name="Phone"
            value={FormDetails.Phone}
            onChange={HandleChange}
            placeholder="Phone"
            className={`${Status === "Login" ? "hidden" : "block"}`}
          />
          <input
            name="Password"
            value={FormDetails.Password}
            onChange={HandleChange}
            placeholder="Password"
          />
          <div className=" flex flex-col justify-center items-center">
            <button
              className={`p-2 rounded-lg w-30 bg-green-600 cursor-pointer text-white mt-auto mb-3 
  ${Status === "Register" && !OtpBox ? "block" : "hidden"}`}
              onClick={() => {
                setSubmitButton(true);
                setOtpBox(true);
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
                maxLength={5}
                className="w-38 h-full p-2 outline-none"
              />
              <button className="cursor-pointer">Verify</button>
            </div>
            <button
              type="submit"
              className={`p-2 rounded-lg w-20 bg-green-600 cursor-pointer text-white mt-auto mb-3 ${
                SubmitButton ? "block" : "hidden"
              }`}
            >
              {Status}
            </button>

            <p
              className={`text-blue-500 cursor-pointer ${
                OtpBox ? "block" : "hidden"
              }`}
              onClick={resendOtp}
            >
              Resend Otp
            </p>
          </div>
        </form>
        <div>
          {Status === "Register"
            ? "Already have an account ?"
            : "Create an account "}
          <button
            onClick={() => {
              Status === "Register"
                ? setStatus("Login")
                : setStatus("Register");
              Status == "Login" ? setOtpBox(true) : setOtpBox(false);
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
