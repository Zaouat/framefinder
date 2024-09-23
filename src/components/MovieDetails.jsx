import React from "react";

const MovieDetails = ({ movie, onBack }) => {
  if (!movie) return null;

  return (
    <div className="mt-4">
      <button
        onClick={onBack}
        className="mb-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Back to List
      </button>
      <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} className="mb-4" />
      <p>
        <strong>Plot:</strong> {movie.Plot}
      </p>
      <p>
        <strong>Cast:</strong> {movie.Actors}
      </p>
      <p>
        <strong>Ratings:</strong>
      </p>
      <ul>
        {movie.Ratings.map((rating, index) => (
          <li key={index}>
            {rating.Source}: {rating.Value}
          </li>
        ))}
      </ul>
      <p>
        <strong>Genre:</strong> {movie.Genre}
      </p>
    </div>
  );
};

export default MovieDetails;
