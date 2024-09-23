import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // This will trigger the search on each keystroke for live search
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {" "}
      {/* Reduced max-width */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="What do you want to watch?"
          className="w-full py-3 px-4 pl-16 rounded-full bg-gray-500 bg-opacity-40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
