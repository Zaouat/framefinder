import React from "react";

const MovieCard = ({ movie, onSelect }) => {
  return (
    <div
      className="border rounded p-4 cursor-pointer hover:shadow-lg transition"
      onClick={() => onSelect(movie.imdbID)}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-64 object-cover mb-2"
      />
      <h3 className="font-bold">{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
