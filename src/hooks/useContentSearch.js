import { useState, useEffect } from "react";
import { searchMulti } from "../services/api";

function useContentSearch(initialQuery = "") {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    const fetchContent = async () => {
      if (!searchQuery) {
        setContent([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await searchMulti(searchQuery);
        if (result.Response === "True") {
          console.log(result.Search);
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
  }, [searchQuery]);

  return { content, isLoading, error, setSearchQuery };
}

export default useContentSearch;
