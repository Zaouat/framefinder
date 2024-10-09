import React from "react";
import { FaSearch } from "react-icons/fa";
import ContentCard from "./ContentCard";

// ContentList component to display search results
const ContentList = ({
  content,
  onSelectContent,
  hasSearched,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Display initial state when no search has been performed
  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-4 animate-fadeIn">
        <img
          src="/empty.png"
          alt="No search results"
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain mb-4"
        />
        <p className="text-xs sm:text-sm text-theme-adaptive text-center font-semibold smalltext-theme-adaptive max-w-xs sm:max-w-sm">
          Start searching for movies or TV shows to see results here.
        </p>
      </div>
    );
  }

  // Display message when search is performed but no results are found
  if (hasSearched && content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-4 animate-fadeIn">
        <img
          src="/error.png"
          alt="No search results"
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain mb-4"
        />
        <p className="text-xs sm:text-sm text-theme-adaptive text-center font-semibold smalltext-theme-adaptive max-w-xs sm:max-w-sm">
          We couldn't find any movies or TV shows matching your search.
        </p>
      </div>
    );
  }

  // Render pagination controls
  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-8">
        <div className="join">
          <button
            className="join-item btn btn-sm sm:btn-md"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="join-item btn btn-sm sm:btn-md">
            {currentPage}
          </button>
          <button
            className="join-item btn btn-sm sm:btn-md"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    );
  };

  // Render the main content list
  return (
    <div className="animate-fadeIn container mx-auto px-4 sm:px-6 lg:px-8 mb-8 max-w-7xl">
      {/* Search results header */}
      <div className="flex items-center mb-4 text-gray-400">
        <FaSearch className="mr-2" size={14} />
        <h2 className="text-sm sm:text-md font-semibold uppercase">
          Search Results
        </h2>
      </div>
      {/* Grid of content cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 ">
        {content.map((item) => (
          <ContentCard
            key={item.id}
            content={item}
            onSelect={onSelectContent}
            isFromCategory={false}
          />
        ))}
      </div>
      {/* Render pagination if there's more than one page */}
      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default ContentList;
