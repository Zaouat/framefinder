import React from "react";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie, onSelect }) => {
  return (
    <div
      className="relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => onSelect(movie.imdbID)}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs font-bold rounded px-2 py-1 flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          {movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-sm font-semibold truncate">{movie.Title}</h3>
        <p className="text-xs text-gray-400">
          {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)} •{" "}
          {movie.Year}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
