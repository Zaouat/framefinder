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
export const getMovieNotifications = async () => {
  try {
    const count = Math.floor(Math.random() * 5) + 3; // Random count between 3 and 7
    const page = Math.floor(Math.random() * 5) + 1; // Random page between 1 and 5
    const popularMovies = await searchMovies("popular", page, "movie");

    const shuffledMovies = popularMovies.Search.sort(() => 0.5 - Math.random());
    const selectedMovies = shuffledMovies.slice(0, count);

    const notifications = selectedMovies.map((movie) => {
      const notificationTypes = [
        `New review for "${movie.Title}"`,
        `"${movie.Title}" is now available for streaming`,
        `Behind the scenes: "${movie.Title}"`,
        `Cast interview: "${movie.Title}"`,
        `Box office update: "${movie.Title}"`,
        `Fan theories about "${movie.Title}"`,
        `Director's cut of "${movie.Title}" announced`,
        `Sequel rumors for "${movie.Title}"`,
        `"${movie.Title}" added to award season predictions`,
      ];

      const randomContent = [
        `Check out the latest updates for ${movie.Title} (${movie.Year})`,
        `Don't miss the buzz around ${movie.Title}!`,
        `Exciting news about ${movie.Title} just dropped!`,
        `Fans are talking about ${movie.Title}. Here's why!`,
        `${movie.Title} is making waves in the film industry`,
      ];

      return {
        id: movie.imdbID,
        title:
          notificationTypes[
            Math.floor(Math.random() * notificationTypes.length)
          ],
        content:
          randomContent[Math.floor(Math.random() * randomContent.length)],
        poster: movie.Poster,
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Random timestamp within the last week
      };
    });

    return notifications.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    ); // Sort by timestamp, most recent first
  } catch (error) {
    console.error("Error generating movie notifications:", error);
    return [];
  }
};
