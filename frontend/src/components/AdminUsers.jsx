import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useState } from "react";
const VITE_URL = import.meta.env.VITE_BACKEND_URL;

const AdminUsers = () => {
  const { User } = useContext(UserContext);
  const [HostelUsers, setHostelUsers] = useState();
  useEffect(() => {
    const fetchHostelUsers = async () => {
      const response = await axios.post(
        `${VITE_URL}/hostel/hostelUsers`,
        { User },
        { withCredentials: true }
      );
      setHostelUsers(response.data.Detail);
      console.log(response.data.Detail);
    };
    if (!HostelUsers) {fetchHostelUsers()};
  }, [User]);

  return (
    <div className=" bg-amber-400 h-full">
      <div className="flex justify-between items-center p-10">
        <span className="">Profile Pic</span>
        <span>Name</span>
        <span>Email</span>
        <span>Role</span>
      </div>
      {HostelUsers && (
        <div className="flex gap-5 flex-col p-5">
          {HostelUsers.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-5 bg-amber-100 rounded-2xl flex-col"
            >
              <div className="w-full flex justify-between items-center">
                <span>
                  <img
                    src={user.profilepic}
                    className=" w-25 h-25 rounded-full object-contain"
                  />
                </span>
                <span>{user.fullname}</span>
                <span>{user.email}</span>
                <span>{user.role}</span>
              </div>


              <div className="w-65% h-12 ml-[15%]">
                <button className="bg-red-700 text-white rounded-2xl p-5 ">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
