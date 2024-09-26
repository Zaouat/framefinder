import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import useCategoryContent from "../hooks/useCategoryContent";
import ContentCard from "./ContentCard";
import PageTransition from "./PageTransition";

const CategoryPage = () => {
  const { category } = useParams();
  const { content, isLoading, error, currentPage, totalPages, fetchPage } =
    useCategoryContent(category);

  const handlePageChange = (newPage) => {
    fetchPage(newPage);
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

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isDetailPage={true} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 capitalize">
          {category} Category
        </h1>
        {isLoading && <PageTransition />}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {content.map((item) => (
                <ContentCard
                  key={item.id}
                  content={item}
                  isFromCategory={true}
                />
              ))}
            </div>
            <div className="flex justify-center">
              {totalPages > 1 && renderPagination()}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
