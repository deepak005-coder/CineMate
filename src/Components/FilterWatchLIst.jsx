/* eslint-disable no-unused-vars */
import React from "react";
const FilterWatchList = (props) => {
    console.log();
    const [movies,setMovies] =props;
    
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <input
        className="w-64 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search your favorite movie..."
      />
      <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
        Search
      </button>

      <select
        value="Sort By"
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sort By</option>
        <option value="rating">Rating</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default FilterWatchList;
