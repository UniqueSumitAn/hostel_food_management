import { useState, useEffect } from "react";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const placeholders = ["Search Biscuits", "Search Soap", "Search Chips","Search Chocolate"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center w-full gap-5 bg-[#f5f7fd] p-2 ">
      
      <p className="flex-shrink-0 ">Welcome to Dastur Hostel</p>

      
      <div className="flex-1">
        <input
          placeholder={placeholders[index]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full"
        />
      </div>
      <button className="p-2 rounded-lg bg-green-600 cursor-pointer text-white ">Login</button>
    </div>
  );
};

export default SearchInput;
