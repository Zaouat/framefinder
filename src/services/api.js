import axios from "axios";

const API_KEY = "eb5d83a1";
const BASE_URL = "https://www.omdbapi.com/";
const POSTER_BASE_URL = "http://img.omdbapi.com/";

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Helper function to handle API requests
const fetchFromAPI = async (params) => {
  try {
    const response = await api.get("", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

// Search for movies
// Search for movies (newer to older, filtered and limited)
export const searchMovies = async (query, page = 1, type = "") => {
  const result = await fetchFromAPI({ s: query, page, type });

  if (result.Response === "True" && result.Search) {
    // Filter out entries without a poster or with 'N/A' as the year
    let filteredMovies = result.Search.filter(
      (movie) => movie.Poster !== "N/A" && movie.Year !== "N/A"
    );

    // Sort movies from newer to older
    filteredMovies.sort((a, b) => {
      const yearA = parseInt(a.Year);
      const yearB = parseInt(b.Year);
      return yearB - yearA;
    });

    // Limit to 10 results
    filteredMovies = filteredMovies.slice(0, 20);

    // Update the result object
    result.Search = filteredMovies;
    result.totalResults = filteredMovies.length;
  }

  return result;
};
// Get movie details by IMDb ID
export const getMovieDetails = async (imdbID, plot = "short") => {
  return fetchFromAPI({ i: imdbID, plot });
};

// Search by title
export const searchByTitle = async (title, year = "", type = "") => {
  return fetchFromAPI({ t: title, y: year, type });
};

// Get movie by IMDb ID and season (for TV series)
export const getSeasonEpisodes = async (imdbID, season) => {
  return fetchFromAPI({ i: imdbID, Season: season });
};

// Get specific episode details
export const getEpisodeDetails = async (imdbID, season, episode) => {
  return fetchFromAPI({ i: imdbID, Season: season, Episode: episode });
};

// Get poster URL
export const getPosterUrl = (imdbID) => {
  return `${POSTER_BASE_URL}?apikey=${API_KEY}&i=${imdbID}`;
};

// Search with advanced parameters
export const advancedSearch = async (params) => {
  return fetchFromAPI(params);
};
