import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const MovieCard = ({ movie, onSelect }) => {
  const renderRatingStars = (rating) => {
    if (rating === "N/A") return null;

    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating / 2);
    const hasHalfStar = numRating % 2 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
        ))}
      </>
    );
  };

  return (
    <div
      className="relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => onSelect(movie.imdbID)}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-2 right-2 bg-[#121c22] text-white font-bold rounded-md px-2 py-1 text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center mr-1">
            {renderRatingStars(movie.imdbRating)}
          </div>
          <span>{movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white truncate">
            {movie.Title}
          </h3>
          <p className="text-sm text-gray-300">
            {movie.Type} • {movie.Year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
