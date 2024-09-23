import React from "react";
import { FaSearch } from "react-icons/fa";

const MovieList = ({ movies, onSelectMovie, hasSearched }) => {
  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center content-center justify-center h-full w-full animate-fadeIn">
        <img
          src="/empty.png"
          alt="No search results"
          className="w-32 h-32 object-contain mb-4"
        />
        <p className="text-md text-white font-semibold">
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
        <p className="text-md text-white font-semibold">
          We couldn't find any movies matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-4 text-gray">
        <FaSearch className="mr-2" size={14} />
        <h2 className="text-md font-semibold uppercase">Search Results</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
            onClick={() => onSelectMovie(movie.imdbID)}
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                {movie.Title}
              </h3>
              <p className="text-gray-400">{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
