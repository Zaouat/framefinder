import axios from "axios";

const API_KEY = "eb5d83a1";
const BASE_URL = "https://www.omdbapi.com/";
const POSTER_BASE_URL = "http://img.omdbapi.com/";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

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

    if (result.Response === "False" && lowercaseQuery.length > 3) {
      result = await fetchFromAPI({ s: lowercaseQuery + "*", page, type });
    }

    if (result.Response === "False" && lowercaseQuery.length > 3) {
      result = await fetchFromAPI({
        s: "*" + lowercaseQuery + "*",
        page,
        type,
      });
    }

    if (result.Response === "True" && result.Search) {
      const detailedMovies = await Promise.all(
        result.Search.map(async (movie) => {
          const details = await getMovieDetails(movie.imdbID);
          return { ...movie, ...details };
        })
      );
      result.Search = detailedMovies;
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

export const getMovieDetails = async (imdbID, plot = "short") => {
  return fetchFromAPI({ i: imdbID, plot });
};

export const searchByTitle = async (title, year = "", type = "") => {
  return fetchFromAPI({ t: title, y: year, type });
};

export const getSeasonEpisodes = async (imdbID, season) => {
  return fetchFromAPI({ i: imdbID, Season: season });
};

export const getEpisodeDetails = async (imdbID, season, episode) => {
  return fetchFromAPI({ i: imdbID, Season: season, Episode: episode });
};

export const getPosterUrl = (imdbID) => {
  return `${POSTER_BASE_URL}?apikey=${API_KEY}&i=${imdbID}`;
};

export const advancedSearch = async (params) => {
  return fetchFromAPI(params);
};
