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

export const searchMovies = async (query, page = 1, type = "") => {
  try {
    const lowercaseQuery = query.toLowerCase();
    let result = await fetchFromAPI({ s: lowercaseQuery, page, type });

    // If no results, try with a wildcard at the end
    if (result.Response === "False" && lowercaseQuery.length > 3) {
      result = await fetchFromAPI({ s: lowercaseQuery + "*", page, type });
    }

    // If still no results, try with wildcards at both ends
    if (result.Response === "False" && lowercaseQuery.length > 3) {
      result = await fetchFromAPI({
        s: "*" + lowercaseQuery + "*",
        page,
        type,
      });
    }

    if (result.Response === "True" && result.Search) {
      // ... (rest of the filtering and sorting logic)
    }

    return result;
  } catch (error) {
    console.error("Error searching movies:", error);
    return {
      Response: "False",
      Error: "An error occurred while searching movies",
    };
  }
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
