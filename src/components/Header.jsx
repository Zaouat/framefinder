import React from "react";
import NavBar from "./Navbar";
import SearchBar from "./SearchBar";
import useMovieSearch from "../hooks/useMovieSearch";
import "../custom-theme.css";

const Header = ({ onSearchResults }) => {
  const { movies, isLoading, error, setSearchQuery } = useMovieSearch();

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearchResults({ movies, isLoading, error, hasSearched: !!query });
  };

  return (
    <header className="bg-theme-adaptive">
      <NavBar />
      <div className="hero h-[80vh] relative overflow-hidden">
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

        <div className="relative z-10 hero-content text-neutral-content text-center flex flex-col items-center justify-center h-full">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-6xl font-bold text-white">
              What would you like to watch this afternoon?
            </h1>
            <p className="mb-8 text-xl text-white">
              Watch your favourite shows and movies with this open source
              streaming app.
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
