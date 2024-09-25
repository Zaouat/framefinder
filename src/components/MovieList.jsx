import React from "react";
import { FaSearch } from "react-icons/fa";
import MovieCard from "./MovieCard";

const MovieList = ({
  movies,
  onSelectMovie,
  hasSearched,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center content-center justify-center h-full w-full animate-fadeIn">
        <img
          src="/empty.png"
          alt="No search results"
          className="w-32 h-32 object-contain mb-4"
        />
        <p className="text-md text-theme-adaptive font-semibold smalltext-theme-adaptive">
          Start searching for movies to see results here.
        </p>
      </div>
    );
  }

  if (hasSearched && movies.length === 0) {
    return (
      <div className="flex flex-col items-center content-center justify-center h-full w-full animate-fadeIn">
        <img
          src="/error.png"
          alt="No search results"
          className="w-32 h-32 object-contain mb-4"
        />
        <p className="text-md text-theme-adaptive font-semibold smalltext-theme-adaptive">
          We couldn't find any movies matching your search.
        </p>
      </div>
    );
  }

  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-8">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="join-item btn">{currentPage}</button>
          <button
            className="join-item btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fadeIn px-28">
      <div className="flex items-center mb-4 text-gray-400">
        <FaSearch className="mr-2" size={14} />
        <h2 className="text-md font-semibold uppercase">Search Results</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={onSelectMovie} />
        ))}
      </div>
      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default MovieList;
