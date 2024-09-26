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
  const [searchState, setSearchState] = useState({
    content: [],
    isLoading: false,
    error: null,
    hasSearched: false,
    currentPage: 1,
    totalPages: 1,
  });

  const [filters, setFilters] = useState({
    mediaType: "",
    genre: "",
    sortBy: "popularity.desc",
    rating: "",
  });

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

  const handlePageChange = (newPage) => {
    setSearchState((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));
    performSearchWithFilters(newPage);
  };

  const getPaginatedContent = () => {
    const startIndex = (searchState.currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    return searchState.content.slice(startIndex, endIndex);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    performSearchWithFilters();
  };

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

  const handleClearSearch = () => {
    setSearchState({
      content: [],
      isLoading: false,
      error: null,
      hasSearched: false,
      currentPage: 1,
      totalPages: 1,
    });
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                onSearchResults={handleSearchResults}
                onFilterChange={handleFilterChange}
                onClearSearch={handleClearSearch}
              >
                {searchState.isLoading && <LoadingState />}
                {searchState.error && (
                  <p className="text-red-500">{searchState.error}</p>
                )}
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
          <Route path="/:mediaType/:id" element={<ContentDetail />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/favorites" element={<MyFavorites />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
