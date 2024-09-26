import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const ContentCard = ({ content, isFromCategory }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();

  const posterPath = content.poster_path
    ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
    : "/placeholder.png";

  const title = content.title || content.name || "Unknown Title";
  const releaseDate = content.release_date || content.first_air_date;
  const mediaType = content.media_type || "unknown";
  const linkTo = `/${mediaType}/${content.id}`;

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(
      favorites.some(
        (item) => item.id === content.id && item.mediaType === mediaType
      )
    );
  }, [content.id, mediaType]);

  return (
    <Link
      to={linkTo}
      state={{ fromCategory: isFromCategory, previousPath: location.pathname }}
      className="block"
    >
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer group">
        <img
          src={posterPath}
          alt={title}
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs font-bold rounded px-2 py-1 flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            {content.vote_average ? content.vote_average.toFixed(1) : "N/A"}
          </div>
          <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black bg-opacity-75 flex items-center justify-center shadow-md">
            <FaHeart
              className={`text-sm ${
                isFavorite ? "text-red-500" : "text-white/50"
              }`}
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-sm font-semibold truncate">{title}</h3>
          <p className="text-xs text-gray-100 font-bold">
            {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} •{" "}
            {releaseDate ? new Date(releaseDate).getFullYear() : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
