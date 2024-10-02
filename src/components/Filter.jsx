import React from "react";
import PropTypes from "prop-types";

const Filter = ({ onFilterChange, filters }) => {
  const handleMediaTypeChange = (e) => {
    onFilterChange({ mediaType: e.target.value });
  };

  const handleGenreChange = (e) => {
    onFilterChange({ genre: e.target.value });
  };

  const handleSortByChange = (e) => {
    onFilterChange({ sortBy: e.target.value });
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-[600px] mx-auto">
      <select
        className="select select-bordered rounded-xs w-auto min-w-[120px] smalltext-theme-adaptive font-semibold"
        onChange={handleMediaTypeChange}
        value={filters.mediaType}
      >
        <option value="">Media Type</option>
        <option value="movie">Movie</option>
        <option value="tv">TV Show</option>
      </select>
      <select
        className="select select-bordered rounded-xs w-auto min-w-[120px] smalltext-theme-adaptive font-semibold"
        onChange={handleGenreChange}
        value={filters.genre}
      >
        <option value="">Genre</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
      </select>
      <select
        className="select select-bordered rounded-xs w-auto min-w-[120px] smalltext-theme-adaptive font-semibold"
        onChange={handleSortByChange}
        value={filters.sortBy}
      >
        <option value="vote_average.desc">Highest Rating</option>
        <option value="vote_average.asc">Lowest Rating</option>
      </select>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default Filter;
