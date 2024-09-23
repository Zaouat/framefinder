// src/components/hooks/useMovieSearch.js
import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";

function useMovieSearch(initialQuery = "") {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    if (searchQuery) {
      const fetchMovies = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const result = await searchMovies(searchQuery);
          setMovies(result.Search || []);
        } catch (err) {
          setError("Failed to search movies. Please try again.");
          setMovies([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchMovies();
    }
  }, [searchQuery]);

  return { movies, isLoading, error, setSearchQuery };
}

export default useMovieSearch;
