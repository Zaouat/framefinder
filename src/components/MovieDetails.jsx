import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import NavBar from "./Navbar";
import Footer from "./Footer";
import "../index.css";
import { FaStar, FaImdb, FaCalendar, FaClock, FaPlay } from "react-icons/fa";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(id);
        setMovie(details);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movie details");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!movie)
    return <div className="text-center mt-20">No movie details found</div>;

  const categoryColors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-indigo-600",
    "bg-pink-600",
    "bg-purple-600",
  ];

  const getAvatarImage = (name) => {
    // Use the name as a seed to generate a consistent avatar for each person
    const seed = encodeURIComponent(name.trim().toLowerCase());
    return `https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`;
  };

  const renderPersonCard = (name, role) => (
    <div
      key={name}
      className="flex items-center p-2 bg-gray-800 rounded-lg shadow-sm"
    >
      <img
        src={getAvatarImage(name)}
        alt={name}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-theme-adaptive text-theme-adaptive">
      <NavBar isDetailPage={true} />
      <main className="flex-grow pt-20">
        <div
          className="absolute top-0 left-0 w-full h-72 bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: `url(${movie.Poster})` }}
        ></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                alt={movie.Title}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
            <div className="md:col-span-2 pt-28">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-5xl font-bold">{movie.Title}</h1>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="request-loader">
                      <button className="btn btn-ghost btn-circle btn-lg group">
                        <FaPlay className="text-xl" />
                      </button>
                    </div>
                  </div>
                  <span className="mt-2 text-sm font-bold">Watch Trailer</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-600">
                  {movie.Type}
                </span>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-bold">{movie.imdbRating}</span>
                </div>
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline flex items-center"
                >
                  <FaImdb className="mr-1" />
                  IMDb
                </a>
              </div>
              <div className="mb-6">
                {movie.Genre.split(", ").map((genre, index) => (
                  <span
                    key={index}
                    className={`inline-block px-2 py-1 mr-2 mb-2 text-xs font-semibold rounded-full ${
                      categoryColors[index % categoryColors.length]
                    }`}
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-lg mb-6">{movie.Plot}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <FaCalendar className="mr-2 text-gray-400" />
                  <span className="font-semibold mr-2">Release Date:</span>
                  <span>{movie.Released}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-gray-400" />
                  <span className="font-semibold mr-2">Duration:</span>
                  <span>{movie.Runtime}</span>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {movie.Actors.split(", ").map((actor) =>
                    renderPersonCard(actor, "Actor")
                  )}
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Director(s)</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {movie.Director.split(", ").map((director) =>
                    renderPersonCard(director, "Director")
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MovieDetail;
