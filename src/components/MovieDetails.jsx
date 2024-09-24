// MovieDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import NavBar from "./Navbar";
import Footer from "./Footer";
import {
  FaStar,
  FaImdb,
  FaFilm,
  FaCalendar,
  FaClock,
  FaGlobe,
} from "react-icons/fa";

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

  return (
    <div className="flex flex-col min-h-screen bg-theme-adaptive">
      <NavBar isDetailPage={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {loading && <div className="text-center mt-8">Loading...</div>}
          {error && (
            <div className="text-center mt-8 text-red-500">{error}</div>
          )}
          {!loading && !error && !movie && (
            <div className="text-center mt-8">No movie details found</div>
          )}
          {movie && (
            <div className="flex flex-col md:flex-row gap-8 px-28">
              <div className="md:w-1/3">
                <img
                  src={
                    movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"
                  }
                  alt={movie.Title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
                <div className="flex items-center mb-4">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-bold mr-4">{movie.imdbRating}</span>
                  <FaImdb className="text-yellow-400 mr-1" />
                  <a
                    href={`https://www.imdb.com/title/${movie.imdbID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    IMDb
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <FaFilm className="mr-2" />
                    <span>{movie.Genre}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2" />
                    <span>{movie.Year}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>{movie.Runtime}</span>
                  </div>
                  <div className="flex items-center">
                    <FaGlobe className="mr-2" />
                    <span>{movie.Language}</span>
                  </div>
                </div>
                <p className="mb-4">{movie.Plot}</p>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Cast</h2>
                  <p>{movie.Actors}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Director</h2>
                  <p>{movie.Director}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Awards</h2>
                  <p>{movie.Awards}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <div className="divider"></div>
      <Footer />
    </div>
  );
};

export default MovieDetail;
