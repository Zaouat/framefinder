import React from "react";
import PropTypes from "prop-types";

const Filter = ({ onFilterChange }) => {
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
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={handleMediaTypeChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select Media Type
        </option>
        <option value="movie">Movie</option>
        <option value="tv">TV Show</option>
      </select>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={handleGenreChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select Genre
        </option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        {/* Add more genres as needed */}
      </select>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={handleSortByChange}
        defaultValue="popularity.desc"
      >
        <option value="popularity.desc">Popularity Descending</option>
        <option value="popularity.asc">Popularity Ascending</option>
        <option value="vote_average.desc">Rating Descending</option>
        <option value="vote_average.asc">Rating Ascending</option>
      </select>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
