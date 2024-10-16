import React from "react";
import NavBar from "./Navbar";
import SearchBar from "./SearchBar";
import useContentSearch from "../hooks/useContentSearch";
import Filter from "./Filter";

const Header = ({ onSearchResults, onFilterChange, onClearSearch }) => {
  const { content, isLoading, error, setSearchQuery, setFilters, filters } =
    useContentSearch();

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearchResults({
      Search: content,
      isLoading,
      Error: error,
      Response: content.length > 0 ? "True" : "False",
    });
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    setSearchQuery("");
    setFilters({
      mediaType: "",
      genre: "",
      sortBy: "popularity.desc",
      rating: "",
    });
    onClearSearch();
  };

  return (
    <header className="bg-theme-adaptive border-b-0 ">
      <NavBar isDetailPage={false} />
      <div className="hero h-[90vh] sm:h-[80vh] relative overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/video-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-x-0 bottom-0 h-full gradient-theme-adaptive"></div>
        <div className="relative z-10 hero-content pb-0 text-neutral-content text-center flex flex-col items-center justify-center h-full">
          <div className="max-w-3xl">
            <h1 className="mb-4 sm:text-6xl text-5xl font-bold text-white">
              What would you like to watch this afternoon?
            </h1>
            <p className="mb-8 text-md text-white">
              Your ultimate movie and TV show search engine.
            </p>
            <SearchBar onSearch={handleSearch} onClear={handleClear} />
            <Filter onFilterChange={handleFilterChange} filters={filters} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
