import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetails";
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

  const handleSearchResults = (results) => {
    setSearchState({
      ...results,
      currentPage: 1,
      totalPages: Math.ceil(results.movies.length / 8),
    });
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
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout onSearchResults={handleSearchResults}>
                {searchState.isLoading && <LoadingState />}
                {searchState.error && (
                  <p className="text-red-500">{searchState.error}</p>
                )}
                {!searchState.isLoading && !searchState.error && (
                  <MovieList
                    movies={getPaginatedMovies()}
                    hasSearched={searchState.hasSearched}
                    currentPage={searchState.currentPage}
                    totalPages={searchState.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </MainLayout>
            }
          />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
