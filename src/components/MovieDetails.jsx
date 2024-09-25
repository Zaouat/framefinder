import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import NavBar from "./Navbar";
import Footer from "./Footer";
import "../index.css";
import {
  FaStar,
  FaImdb,
  FaCalendar,
  FaClock,
  FaPlay,
  FaTimes,
} from "react-icons/fa";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const getYouTubeTrailerUrl = async (movieTitle, year) => {
    const apiKey = "AIzaSyAwJjhuUj2jmShhEc6lTds-IYjR9QuFfes";
    const encodedTitle = encodeURIComponent(
      `${movieTitle} ${year} official trailer`
    );
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedTitle}&key=${apiKey}&type=video`;

    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        return `https://www.youtube.com/embed/${videoId}`;
      } else {
        throw new Error("No trailer found");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(id);
        setMovie(details);
        const trailer = await getYouTubeTrailerUrl(details.Title, details.Year);
        setTrailerUrl(trailer);
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

  const TrailerModal = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={() => setShowTrailer(false)}
    >
      <div
        className="relative w-4/5 md:w-2/3 lg:w-1/2 aspect-video rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowTrailer(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <FaTimes size={24} />
        </button>
        <div className="w-full h-full rounded-xl">
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="movie trailer"
              className="w-full h-full rounded-xl"
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white bg-gray-800 rounded-xl">
              No trailer available
            </div>
          )}
        </div>
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
                      <button
                        onClick={() => setShowTrailer(true)}
                        className="btn btn-ghost btn-circle btn-lg group"
                      >
                        <FaPlay className="text-xl" />
                      </button>
                    </div>
                  </div>
                  <span className="mt-2 text-sm font-bold">Watch Trailer</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-2 rounded-full text-sm font-bold bg-purple-600">
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
                    className={`inline-block px-3 py-2 mr-2 mb-2 text-xs font-bold rounded-full ${
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
      {showTrailer && <TrailerModal />}
    </div>
  );
};

export default MovieDetail;
