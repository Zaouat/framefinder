// hooks/useCategoryContent.js
import { useState, useEffect, useCallback } from "react";
import { getCategoryContent } from "../services/api";

const categoryIds = {
  action: 28,
  comedy: 35,
  drama: 18,
  "sci-fi": 878,
  // Add more categories as needed
};

const useCategoryContent = (category) => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPage = useCallback(
    async (page) => {
      try {
        setIsLoading(true);
        const categoryId = categoryIds[category.toLowerCase()];
        if (!categoryId) {
          throw new Error("Invalid category");
        }
        const data = await getCategoryContent(categoryId, page);
        setContent(data.results);
        setTotalPages(data.total_pages);
        setCurrentPage(page);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [category]
  );

  useEffect(() => {
    fetchPage(1);
  }, [category, fetchPage]);

  return {
    content,
    isLoading,
    error,
    currentPage,
    totalPages,
    fetchPage,
  };
};

export default useCategoryContent;
