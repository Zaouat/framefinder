import React from "react";
import { FaSearch } from "react-icons/fa";
import ContentCard from "./ContentCard";

const ContentList = ({
  content,
  onSelectContent,
  hasSearched,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center content-center justify-center h-full w-full animate-fadeIn">
        <img
          src="/empty.png"
          alt="No search results"
          className="w-32 h-32 object-contain mb-4"
        />
        <p className="text-xs sm:text-sm text-theme-adaptive text-center font-semibold smalltext-theme-adaptive ">
          Start searching for movies or TV shows to see results here.
        </p>
      </div>
    );
  }

  if (hasSearched && content.length === 0) {
    return (
      <div className="flex flex-col items-center content-center justify-center h-full w-full animate-fadeIn">
        <img
          src="/error.png"
          alt="No search results"
          className="w-32 h-32 object-contain mb-4"
        />
        <p className="text-xs sm:text-sm text-theme-adaptive font-semibold smalltext-theme-adaptive">
          We couldn't find any movies or TV shows matching your search.
        </p>
      </div>
    );
  }

  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-8">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="join-item btn">{currentPage}</button>
          <button
            className="join-item btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fadeIn px-28">
      <div className="flex items-center mb-4 text-gray-400">
        <FaSearch className="mr-2" size={14} />
        <h2 className="text-md font-semibold uppercase">Search Results</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {content.map((item) => (
          <ContentCard
            key={item.id}
            content={item}
            onSelect={onSelectContent}
            isFromCategory={false}
          />
        ))}
      </div>
      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default ContentList;
