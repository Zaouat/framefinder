import { useState, useEffect } from "react";
import { searchMultiWithFilters } from "../services/api";

function useContentSearch(initialQuery = "") {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState({
    mediaType: "",
    genre: "",
    year: "",
    sortBy: "vote_average.desc",
    rating: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let result;
        if (searchQuery) {
          // If there's a search query, use filters
          result = await searchMultiWithFilters(searchQuery, filters);
        } else {
          // If search query is empty, don't use filters
          result = await searchMultiWithFilters("", {});
        }

        if (result.Response === "True") {
          setContent(result.Search);
        } else {
          setError(result.Error);
          setContent([]);
        }
      } catch (err) {
        setError("Failed to search content. Please try again.");
        setContent([]);
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [searchQuery, filters]);

  return { content, isLoading, error, setSearchQuery, setFilters };
}

export default useContentSearch;
