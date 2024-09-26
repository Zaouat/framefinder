import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMovieDetails, getTVShowDetails } from "../services/api";
import NavBar from "./Navbar";
import Footer from "./Footer";
import "../index.css";
import PageTransition from "./PageTransition";
import {
  FaStar,
  FaCalendar,
  FaClock,
  FaPlay,
  FaTimes,
  FaListUl,
  FaTv,
  FaHeart,
} from "react-icons/fa";

const ContentDetail = () => {
  const { id, mediaType } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const location = useLocation();
  const [isFromCategory, setIsFromCategory] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(
    document.documentElement.getAttribute("data-theme")
  );
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

        // Check if the content is in favorites
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(
          favorites.some(
            (item) => item.id === details.id && item.mediaType === mediaType
          )
        );
      } catch (err) {
        setError(`Failed to fetch ${mediaType} details`);
        setLoading(false);
      }
    };

    // Check if the page was loaded from a category
    setIsFromCategory(location.state?.fromCategory || false);

    fetchContentDetails();

    const handleThemeChange = () => {
      setCurrentTheme(document.documentElement.getAttribute("data-theme"));
    };

    // Listen for attribute changes on the documentElement
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      observer.disconnect(); // Cleanup the observer on unmount
    };
  }, [id, mediaType, location]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const contentToSave = {
      id: content.id,
      title: content.title || content.name,
      posterPath: content.poster_path,
      mediaType: mediaType,
    };

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (item) => !(item.id === content.id && item.mediaType === mediaType)
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(contentToSave);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

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
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={() => setShowTrailer(false)}
    >
      <div
        className="relative w-full max-w-4xl aspect-video rounded-xl"
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
      <NavBar
        isDetailPage={true}
        isfromcategory={location.state?.fromCategory}
      />
      <main className="flex-grow sm:pt-20 pt-0">
        <div
          className="absolute top-0 left-0 w-full h-72 bg-cover bg-center opacity-20 blur-xs"
          style={{
            backgroundImage: `linear-gradient(to top, ${
              currentTheme === "sunset" ? "#1a1a2e" : "#ffff"
            }, rgba(0, 0, 0, 0)), url(https://image.tmdb.org/t/p/w500${
              content.backdrop_path
            })`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:py-12 py-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1 relative">
              <img
                src={
                  content.poster_path
                    ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
                    : "/placeholder.png"
                }
                alt={title}
                className="w-full rounded-xl shadow-2xl"
              />
              {content.videos?.results?.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <div className="request-loader">
                        <button
                          onClick={() => setShowTrailer(true)}
                          className="btn btn-ghost btn-circle btn-lg group bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-300"
                        >
                          <FaPlay className="text-xl text-white" />
                        </button>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-white bg-black bg-opacity-50 px-4 py-2 rounded">
                      Watch Trailer
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="md:col-span-2 sm:pt-8 pt-0 md:pt-28">
              <div className="relative mb-4 pr-16">
                <div className="max-w-full">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold break-words pr-2">
                    {title}
                  </h1>
                </div>
                <div className="absolute top-0 right-0">
                  <button
                    onClick={toggleFavorite}
                    className={`btn btn-ghost btn-circle btn-lg ${
                      isFavorite ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    <FaHeart className="text-2xl" />
                  </button>
                </div>
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
              <p className="text-base md:text-lg mb-6">{content.overview}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
              {mediaType === "tv" &&
                content.seasons &&
                content.seasons.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <FaListUl className="mr-2 text-gray-400" />
                      <span className="font-bold mr-2">Number of Seasons:</span>
                      <span>{content.number_of_seasons}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <FaTv className="mr-2 text-gray-400" />
                      <span className="font-bold mr-2">
                        Number of Episodes:
                      </span>
                      <span>{content.number_of_episodes}</span>
                    </div>
                  </div>
                )}
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Cast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {content.credits?.cast
                    ?.slice(0, 8)
                    .map((actor) =>
                      renderPersonCard(actor, actor.character || "Actor")
                    )}
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  {mediaType === "movie" ? "Director(s)" : "Creator(s)"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
