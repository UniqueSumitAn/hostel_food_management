import { useState, useEffect } from "react";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const placeholders = [
    "Search Biscuits",
    "Search Soap",
    "Search Chips",
    "Search Chocolate",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center relative bottom-7 w-5/12 rounded-2xl bg-white border
                transition-transform transition-shadow duration-300
                hover:shadow-xl hover:scale-105
                focus-within:shadow-2xl"
    >
      <div className="flex-1">
        <input
          placeholder={placeholders[index]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="
        p-4 w-full placeholder:text-black focus:outline-none
        rounded-2xl
      "
        />
      </div>
    </div>
  );
};
export default SearchInput;
