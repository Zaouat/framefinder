import axios from "axios";

const API_KEY = "3a8c9699d87d6710fe86a459f2abb7aa"; // Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1, type = "movie") => {
  try {
    const result = await fetchFromAPI("/search/multi", {
      query,
      page,
      include_adult: false,
    });

    if (result.results) {
      const filteredResults = result.results.filter(
        (item) => item.media_type === type
      );
      const detailedResults = await Promise.all(
        filteredResults.map(async (item) => {
          const details = await getMovieDetails(item.id, type);
          return { ...item, ...details };
        })
      );
      return {
        Response: "True",
        Search: detailedResults,
        totalResults: result.total_results,
      };
    }

    return {
      Response: "False",
      Error: "No results found",
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    return {
      Response: "False",
      Error: "An error occurred while searching movies",
    };
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "credits,videos",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const searchByTitle = async (title, year = "", type = "movie") => {
  const result = await searchMovies(title, 1, type);
  if (result.Response === "True" && result.Search.length > 0) {
    const movie = result.Search[0];
    if (year && movie.release_date && movie.release_date.startsWith(year)) {
      return movie;
    }
    return movie;
  }
  return { Response: "False", Error: "Movie not found!" };
};

export const getSeasonEpisodes = async (tvId, season) => {
  return fetchFromAPI(`/tv/${tvId}/season/${season}`);
};

export const getEpisodeDetails = async (tvId, season, episode) => {
  return fetchFromAPI(`/tv/${tvId}/season/${season}/episode/${episode}`);
};

export const getPosterUrl = (posterPath) => {
  return posterPath ? `${IMAGE_BASE_URL}${posterPath}` : null;
};

export const advancedSearch = async (params) => {
  return fetchFromAPI("/discover/movie", params);
};

export const getMovieNotifications = async () => {
  try {
    const count = Math.floor(Math.random() * 5) + 3; // Random count between 3 and 7
    const page = Math.floor(Math.random() * 5) + 1; // Random page between 1 and 5
    const popularMovies = await fetchFromAPI("/movie/popular", { page });

    const shuffledMovies = popularMovies.results.sort(
      () => 0.5 - Math.random()
    );
    const selectedMovies = shuffledMovies.slice(0, count);

    const notifications = selectedMovies.map((movie) => {
      const notificationTypes = [
        `New review for "${movie.title}"`,
        `"${movie.title}" is now available for streaming`,
        `Behind the scenes: "${movie.title}"`,
        `Cast interview: "${movie.title}"`,
        `Box office update: "${movie.title}"`,
        `Fan theories about "${movie.title}"`,
        `Director's cut of "${movie.title}" announced`,
        `Sequel rumors for "${movie.title}"`,
        `"${movie.title}" added to award season predictions`,
      ];

      const randomContent = [
        `Check out the latest updates for ${movie.title} (${new Date(
          movie.release_date
        ).getFullYear()})`,
        `Don't miss the buzz around ${movie.title}!`,
        `Exciting news about ${movie.title} just dropped!`,
        `Fans are talking about ${movie.title}. Here's why!`,
        `${movie.title} is making waves in the film industry`,
      ];

      return {
        id: movie.id,
        title:
          notificationTypes[
            Math.floor(Math.random() * notificationTypes.length)
          ],
        content:
          randomContent[Math.floor(Math.random() * randomContent.length)],
        poster: getPosterUrl(movie.poster_path),
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(),
      };
    });

    return notifications.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  } catch (error) {
    console.error("Error generating movie notifications:", error);
    return [];
  }
};
