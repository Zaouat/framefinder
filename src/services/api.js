import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
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

export const searchMultiWithFilters = async (query, filters, page = 1) => {
  try {
    const params = {
      page,
      include_adult: false,
      sort_by: filters.sortBy,
    };

    if (query) {
      params.query = query;
      params.with_genres = filters.genre;
      params["vote_average.gte"] = filters.rating;
      params.year = filters.year;
    }

    let endpoint = "/search/multi";
    let forcedMediaType = null;

    if (filters.mediaType === "movie") {
      endpoint = query ? "/search/movie" : "/discover/movie";
      forcedMediaType = "movie";
    } else if (filters.mediaType === "tv") {
      endpoint = query ? "/search/tv" : "/discover/tv";
      forcedMediaType = "tv";
    }

    const result = await fetchFromAPI(endpoint, params);

    if (result.results) {
      const detailedResults = await Promise.all(
        result.results.map(async (item) => {
          const mediaType =
            forcedMediaType ||
            item.media_type ||
            (item.first_air_date ? "tv" : "movie");
          const details = await getDetails(item.id, mediaType);
          return {
            ...item,
            ...details,
            media_type: mediaType,
          };
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
    console.error("Error searching:", error);
    return {
      Response: "False",
      Error: "An error occurred while searching",
    };
  }
};

export const getDetails = async (id, type) => {
  try {
    const response = await api.get(`/${type}/${id}`, {
      params: {
        append_to_response: "credits,videos",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type} details:`, error);
    throw error;
  }
};
export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getTVShowDetails = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    throw error;
  }
};
export const searchByTitle = async (title, year = "", type = "movie") => {
  const filters = {
    mediaType: type,
    genre: "", // Add genre if needed
    year,
    sortBy: "vote_average.desc",
  };

  const result = await searchMultiWithFilters(title, filters);
  if (result.Response === "True" && result.Search.length > 0) {
    const item = result.Search.find((i) => i.media_type === type);
    if (item) {
      if (year) {
        const releaseDate =
          type === "movie" ? item.release_date : item.first_air_date;
        if (releaseDate && releaseDate.startsWith(year)) {
          return item;
        }
      } else {
        return item;
      }
    }
  }

  return {
    Response: "False",
    Error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found!`,
  };
};
export const getCategoryContent = async (category, page = 1) => {
  try {
    const movieResponse = await fetchFromAPI("/discover/movie", {
      with_genres: category,
      page: page,
      sort_by: "popularity.desc",
    });

    const tvResponse = await fetchFromAPI("/discover/tv", {
      with_genres: category,
      page: page,
      sort_by: "popularity.desc",
    });

    const combinedResults = [
      ...movieResponse.results.map((item) => ({
        ...item,
        media_type: "movie",
      })),
      ...tvResponse.results.map((item) => ({ ...item, media_type: "tv" })),
    ];

    return {
      results: combinedResults,
      total_pages: Math.max(movieResponse.total_pages, tvResponse.total_pages),
      total_results: movieResponse.total_results + tvResponse.total_results,
    };
  } catch (error) {
    console.error("Error fetching category content:", error);
    throw error;
  }
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

export const advancedSearch = async (params, type = "movie") => {
  return fetchFromAPI(`/discover/${type}`, params);
};

export const getMovieNotifications = async () => {
  try {
    const count = Math.floor(Math.random() * 5) + 3; // Random count between 3 and 7
    const page = Math.floor(Math.random() * 5) + 1; // Random page between 1 and 5
    const [popularMovies, popularTVShows] = await Promise.all([
      fetchFromAPI("/movie/popular", { page }),
      fetchFromAPI("/tv/popular", { page }),
    ]);

    const shuffledItems = [
      ...popularMovies.results,
      ...popularTVShows.results,
    ].sort(() => 0.5 - Math.random());
    const selectedItems = shuffledItems.slice(0, count);

    const notifications = selectedItems.map((item) => {
      const isMovie = "title" in item;
      const title = isMovie ? item.title : item.name;
      const releaseDate = isMovie ? item.release_date : item.first_air_date;

      const notificationTypes = [
        `New review for "${title}"`,
        `"${title}" is now available for streaming`,
        `Behind the scenes: "${title}"`,
        `Cast interview: "${title}"`,
        `${isMovie ? "Box office" : "Ratings"} update: "${title}"`,
        `Fan theories about "${title}"`,
        `${
          isMovie ? "Director's cut" : "Special episode"
        } of "${title}" announced`,
        `${isMovie ? "Sequel" : "New season"} rumors for "${title}"`,
        `"${title}" added to award season predictions`,
      ];

      const randomContent = [
        `Check out the latest updates for ${title} (${new Date(
          releaseDate
        ).getFullYear()})`,
        `Don't miss the buzz around ${title}!`,
        `Exciting news about ${title} just dropped!`,
        `Fans are talking about ${title}. Here's why!`,
        `${title} is making waves in the ${isMovie ? "film" : "TV"} industry`,
      ];

      return {
        id: item.id,
        title:
          notificationTypes[
            Math.floor(Math.random() * notificationTypes.length)
          ],
        content:
          randomContent[Math.floor(Math.random() * randomContent.length)],
        poster: getPosterUrl(item.poster_path),
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(),
        media_type: isMovie ? "movie" : "tv",
      };
    });

    return notifications.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  } catch (error) {
    console.error("Error generating notifications:", error);
    return [];
  }
};
