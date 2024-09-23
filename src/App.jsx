import { useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import { getMovieDetails } from "./services/api";

function App() {
  const [searchResults, setSearchResults] = useState({
    movies: [],
    isLoading: false,
    error: null,
  });
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearchResults = (results) => {
    setSearchResults(results);
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

  return (
    <div className="flex flex-col min-h-screen bg-[#121c22]">
      <Header onSearchResults={handleSearchResults} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {searchResults.isLoading && <p className="text-white">Loading...</p>}
        {searchResults.error && (
          <p className="text-red-500">{searchResults.error}</p>
        )}
        {!searchResults.isLoading &&
          !searchResults.error &&
          searchResults.movies.length > 0 && (
            <MovieList
              movies={searchResults.movies}
              onSelectMovie={handleSelectMovie}
            />
          )}
        {selectedMovie && (
          <div className="text-white">
            <h2>{selectedMovie.Title}</h2>
            <p>{selectedMovie.Plot}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
