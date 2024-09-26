import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children, onSearchResults }) => {
  return (
    <div className="flex flex-col min-h-screen bg-theme-adaptive">
      <Header onSearchResults={onSearchResults} />
      <main className="flex-grow container mx-auto px-4 pb-12">{children}</main>
      <div className="divider"></div>
      <Footer />
    </div>
  );
};

export default MainLayout;
