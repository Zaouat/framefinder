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
    <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-[600px] mx-auto">
      <select
        className="select select-bordered rounded-xs w-auto min-w-[120px]"
        onChange={handleMediaTypeChange}
        defaultValue=""
      >
        <option value="" disabled>
          Media Type
        </option>
        <option value="movie">Movie</option>
        <option value="tv">TV Show</option>
      </select>
      <select
        className="select select-bordered rounded-xs w-auto min-w-[120px]"
        onChange={handleGenreChange}
        defaultValue=""
      >
        <option value="" disabled>
          Genre
        </option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
      </select>
      <select
        className="select select-bordered rounded-xs w-auto min-w-[120px]"
        onChange={handleSortByChange}
        defaultValue="vote_average.desc"
      >
        <option value="vote_average.desc">Highest Rating</option>
        <option value="vote_average.asc">Lowest Rating</option>
      </select>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
