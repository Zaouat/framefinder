// components/MyFavorites.jsx
import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import ContentCard from "./ContentCard";
import PageTransition from "./PageTransition";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadFavorites = () => {
      setIsLoading(true);
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      // Reverse the order of favorites
      setFavorites(storedFavorites.reverse());
      setIsLoading(false);
    };

    loadFavorites();
  }, []);

  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - 2) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return (
      <div className="join mt-8 flex flex-wrap justify-center">
        {pageNumbers.map((number, index) => (
          <button
            key={index}
            className={`join-item btn btn-sm sm:btn-md ${
              currentPage === number ? "btn-active" : ""
            } ${number === "..." ? "btn-disabled" : ""}`}
            onClick={() => number !== "..." && handlePageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  const paginatedFavorites = favorites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isDetailPage={true} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-18 mb-32 mt-16 sm:mt-10 max-w-7xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 ">My Favorites</h1>
        {isLoading && <PageTransition />}
        {!isLoading && favorites.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            You have no favorites yet.
          </p>
        )}
        {!isLoading && favorites.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {paginatedFavorites.map((item) => (
                <ContentCard
                  key={`${item.id}-${item.mediaType}`}
                  content={{
                    ...item,
                    media_type: item.mediaType,
                    poster_path: item.posterPath,
                    vote_average: item.voteAverage,
                  }}
                  isFromCategory={true}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              {totalPages > 1 && renderPagination()}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyFavorites;
