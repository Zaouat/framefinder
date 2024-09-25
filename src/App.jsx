import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import ContentList from "./components/ContentList";
import ContentDetail from "./components/ContentDetail";
import LoadingState from "./components/LoadingState";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  const [searchState, setSearchState] = useState({
    content: [],
    isLoading: false,
    error: null,
    hasSearched: false,
    currentPage: 1,
    totalPages: 1,
  });

  const handleSearchResults = (results) => {
    setSearchState({
      content: results.Search || [],
      isLoading: results.isLoading,
      error: results.Error || null,
      hasSearched: true,
      currentPage: 1,
      totalPages: Math.ceil((results.Search?.length || 0) / 8),
    });
  };

  const handlePageChange = (newPage) => {
    setSearchState((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));
  };

  const getPaginatedContent = () => {
    const startIndex = (searchState.currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    return searchState.content.slice(startIndex, endIndex);
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
