import React, { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import debounce from "lodash/debounce";

const SearchBar = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.trim() === "") {
        onClear();
      } else {
        onSearch(searchTerm.trim().toLowerCase());
      }
    }, 300),
    [onSearch, onClear]
  );

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for movies or TV shows"
          className="input input-bordered sm:text-base text-sm w-full blur-xs font-bold py-3 px-4 pl-12 pr-10 rounded-full bg-gray-100 bg-opacity-20 text-white placeholder-theme-adaptive focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className="h-4 w-4 placeholder-theme-adaptive" />
        </div>
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <IoMdClose className="h-5 w-5 placeholder-theme-adaptive hover:text-red-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
