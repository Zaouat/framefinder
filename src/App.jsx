import { useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import { getMovieDetails } from "./services/api";
import LoadingState from "./components/LoadingState";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  const [searchState, setSearchState] = useState({
    movies: [],
    isLoading: false,
    error: null,
    hasSearched: false,
    currentPage: 1,
    totalPages: 1,
  });
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearchResults = (results) => {
    setSearchState({
      ...results,
      currentPage: 1,
      totalPages: Math.ceil(results.movies.length / 8),
    });
    setSelectedMovie(null);
  };

  const handleSelectMovie = async (imdbID) => {
    try {
      const movie = await getMovieDetails(imdbID);
      setSelectedMovie(movie);
    } catch (err) {
      console.error("Failed to fetch movie details:", err);
    }
  };

  const handlePageChange = (newPage) => {
    setSearchState((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));
  };

  const getPaginatedMovies = () => {
    const startIndex = (searchState.currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    return searchState.movies.slice(startIndex, endIndex);
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-theme-adaptive">
        <Header onSearchResults={handleSearchResults} />
        <main className="flex-grow container mx-auto px-4 pb-12 pt-6">
          {searchState.isLoading && <LoadingState />}
          {searchState.error && (
            <p className="text-red-500">{searchState.error}</p>
          )}
          {!searchState.isLoading && !searchState.error && (
            <MovieList
              movies={getPaginatedMovies()}
              onSelectMovie={handleSelectMovie}
              hasSearched={searchState.hasSearched}
              currentPage={searchState.currentPage}
              totalPages={searchState.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
        <div className="divider"></div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
