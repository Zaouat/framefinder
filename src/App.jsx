// Import necessary dependencies and components
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import ContentList from "./components/ContentList";
import ContentDetail from "./components/ContentDetail";
import LoadingState from "./components/LoadingState";
import { ThemeProvider } from "./components/ThemeContext";
import AboutMe from "./components/AboutMe";
import CategoryPage from "./components/CategoryPage";
import FAQs from "./components/FAQs";
import MyFavorites from "./components/MyFavorites";
import { searchMultiWithFilters } from "./services/api";

function App() {
  // State for search results, loading status, errors, and pagination
  const [searchState, setSearchState] = useState({
    content: [],
    isLoading: false,
    error: null,
    hasSearched: false,
    currentPage: 1,
    totalPages: 1,
  });

  // State for search filters
  const [filters, setFilters] = useState({
    mediaType: "",
    genre: "",
    sortBy: "popularity.desc",
    rating: "",
  });

  // Handle search results and update state
  const handleSearchResults = (results) => {
    setSearchState((prevState) => ({
      ...prevState,
      content: results.Search || [],
      isLoading: false,
      error: results.Error || null,
      hasSearched: true,
      totalPages: Math.ceil((results.totalResults || 0) / 8),
    }));
  };

  // Handle page change for pagination
  const handlePageChange = (newPage) => {
    setSearchState((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));
    performSearchWithFilters(newPage);
  };

  // Get paginated content for current page
  const getPaginatedContent = () => {
    const startIndex = (searchState.currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    return searchState.content.slice(startIndex, endIndex);
  };

  // Handle filter changes and trigger new search
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    performSearchWithFilters();
  };

  // Perform search with current filters
  const performSearchWithFilters = async (page = 1) => {
    setSearchState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));

    try {
      const results = await searchMultiWithFilters("", filters, page);
      handleSearchResults(results);
    } catch (error) {
      setSearchState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: "An error occurred while searching",
      }));
    }
  };

  // Clear search results and reset filters
  const handleClearSearch = () => {
    setSearchState({
      content: [],
      isLoading: false,
      error: null,
      hasSearched: false,
      currentPage: 1,
      totalPages: 1,
    });
    setFilters({
      mediaType: "",
      genre: "",
      sortBy: "popularity.desc",
      rating: "",
    });
  };

  // Render the application
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={
              <MainLayout
                onSearchResults={handleSearchResults}
                onFilterChange={handleFilterChange}
                onClearSearch={handleClearSearch}
              >
                {/* Show loading state if isLoading is true */}
                {searchState.isLoading && <LoadingState />}
                {/* Show error message if there's an error */}
                {searchState.error && (
                  <p className="text-red-500">{searchState.error}</p>
                )}
                {/* Show content list if not loading and no error */}
                {!searchState.isLoading && !searchState.error && (
                  <ContentList
                    content={getPaginatedContent()}
                    hasSearched={searchState.hasSearched}
                    currentPage={searchState.currentPage}
                    totalPages={searchState.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </MainLayout>
            }
          />
          {/* Content detail route */}
          <Route path="/:mediaType/:id" element={<ContentDetail />} />
          {/* About me route */}
          <Route path="/about" element={<AboutMe />} />
          {/* Category page route */}
          <Route path="/category/:category" element={<CategoryPage />} />
          {/* FAQs route */}
          <Route path="/faqs" element={<FAQs />} />
          {/* Favorites route */}
          <Route path="/favorites" element={<MyFavorites />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
