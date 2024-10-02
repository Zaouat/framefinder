import { useState, useEffect, useCallback } from "react";
import { searchMultiWithFilters } from "../services/api";
import debounce from "lodash/debounce";

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
  const [originalResults, setOriginalResults] = useState([]);

  const fetchContent = useCallback(async (query, currentFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await searchMultiWithFilters(query, currentFilters);

      if (result.Response === "True") {
        setOriginalResults(result.Search);
        setContent(result.Search);
      } else {
        setError(result.Error);
        setOriginalResults([]);
        setContent([]);
      }
    } catch (err) {
      setError("Failed to search content. Please try again.");
      setOriginalResults([]);
      setContent([]);
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetchContent = useCallback(
    debounce((query, filters) => fetchContent(query, filters), 300),
    [fetchContent]
  );

  useEffect(() => {
    debouncedFetchContent(searchQuery, filters);
  }, [searchQuery, filters, debouncedFetchContent]);

  useEffect(() => {
    if (originalResults.length > 0) {
      // Apply additional filters to original results
      const filteredContent = originalResults.filter((item) => {
        return (
          (!filters.genre ||
            (item.genres &&
              item.genres.some((g) => g.id === parseInt(filters.genre)))) &&
          (!filters.year ||
            item.release_date?.startsWith(filters.year) ||
            item.first_air_date?.startsWith(filters.year)) &&
          (!filters.rating || item.vote_average >= parseFloat(filters.rating))
        );
      });

      setContent(
        filteredContent.map((item) => ({
          ...item,
          mediaType: item.media_type || (item.first_air_date ? "tv" : "movie"),
        }))
      );
    }
  }, [filters, originalResults]);

  return {
    content,
    isLoading,
    error,
    setSearchQuery,
    setFilters,
    searchQuery,
    filters,
  };
}

export default useContentSearch;
