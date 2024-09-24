import { useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import { getMovieDetails } from "./services/api";
import LoadingState from "./components/LoadingState";

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
    <div className="flex flex-col min-h-screen bg-[#121c22]">
      <Header onSearchResults={handleSearchResults} />
      <main className="flex-grow container mx-auto px-4 pb-12">
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
        {/* {selectedMovie && (
          <div className="text-white mt-8">
            <h2 className="text-2xl font-bold mb-4">{selectedMovie.Title}</h2>
            <p>{selectedMovie.Plot}</p>
          </div>
        )} */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
