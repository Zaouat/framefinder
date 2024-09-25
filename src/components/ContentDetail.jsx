import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getTVShowDetails } from "../services/api";
import NavBar from "./Navbar";
import Footer from "./Footer";
import "../index.css";
import PageTransition from "./PageTransition";

import { FaStar, FaCalendar, FaClock, FaPlay, FaTimes } from "react-icons/fa";

const ContentDetail = () => {
  const { id, mediaType } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        let details;
        if (mediaType === "movie") {
          details = await getMovieDetails(id);
        } else if (mediaType === "tv") {
          details = await getTVShowDetails(id);
        } else {
          throw new Error("Invalid media type");
        }
        setContent(details);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch ${mediaType} details`);
        setLoading(false);
      }
    };

    fetchContentDetails();
  }, [id, mediaType]);

  if (loading) return <PageTransition />;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!content)
    return <div className="text-center mt-20">No content details found</div>;

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

  const renderPersonCard = (person, role) => (
    <div
      key={person.id || person.credit_id}
      className="flex items-center p-2 rounded-lg shadow-md bg-theme-adaptive border border-theme-adaptive"
    >
      <img
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
            : getAvatarImage(person.name)
        }
        alt={person.name}
        className="w-10 h-10 rounded-full mr-3 object-cover"
      />
      <div>
        <h3 className="text-sm font-semibold">{person.name}</h3>
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
          {content?.videos?.results?.[0]?.key ? (
            <iframe
              src={`https://www.youtube.com/embed/${content.videos.results[0].key}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="content trailer"
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

  const title = content.title || content.name;
  const releaseDate = content.release_date || content.first_air_date;
  const runtime =
    content.runtime ||
    (content.episode_run_time && content.episode_run_time[0]);

  return (
    <div className="flex flex-col min-h-screen bg-theme-adaptive text-theme-adaptive">
      <NavBar isDetailPage={true} />
      <main className="flex-grow pt-20">
        <div
          className="absolute top-0 left-0 w-full h-72 bg-cover bg-center opacity-20 blur-sm"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${content.backdrop_path})`,
          }}
        ></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <img
                src={
                  content.poster_path
                    ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
                    : "/placeholder.png"
                }
                alt={title}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
            <div className="md:col-span-2 pt-28">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-5xl font-bold">{title}</h1>
                {content.videos?.results?.length > 0 && (
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
                    <span className="mt-2 text-sm font-bold">
                      Watch Trailer
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-2 rounded-full text-sm font-bold bg-purple-600 text-white">
                  {mediaType === "movie" ? "Movie" : "TV Show"}
                </span>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-bold">
                    {content.vote_average?.toFixed(1)}
                  </span>
                </div>
                <a
                  href={`https://www.themoviedb.org/${mediaType}/${content.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center font-bold"
                >
                  TMDB
                </a>
              </div>
              <div className="mb-6">
                {content.genres?.map((genre, index) => (
                  <span
                    key={genre.id}
                    className={`inline-block px-3 py-2 mr-2 mb-2 text-sm font-bold text-white rounded-full ${
                      categoryColors[index % categoryColors.length]
                    }`}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-lg mb-6">{content.overview}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <FaCalendar className="mr-2 text-gray-400" />
                  <span className="font-bold mr-2">
                    {mediaType === "movie"
                      ? "Release Date:"
                      : "First Air Date:"}
                  </span>
                  <span>{new Date(releaseDate).toLocaleDateString()}</span>
                </div>
                {runtime && (
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-gray-400" />
                    <span className="font-bold mr-2">Duration:</span>
                    <span>{`${Math.floor(runtime / 60)}h ${
                      runtime % 60
                    }m`}</span>
                  </div>
                )}
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {content.credits?.cast
                    ?.slice(0, 8)
                    .map((actor) =>
                      renderPersonCard(actor, actor.character || "Actor")
                    )}
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {mediaType === "movie" ? "Director(s)" : "Creator(s)"}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mediaType === "movie"
                    ? content.credits?.crew
                        ?.filter((person) => person.job === "Director")
                        .map((director) =>
                          renderPersonCard(director, "Director")
                        )
                    : content.created_by?.map((creator) =>
                        renderPersonCard(creator, "Creator")
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

export default ContentDetail;
