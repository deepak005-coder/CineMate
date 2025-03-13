/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../cards/MoviesCard.css";

const MoviesCard = ({ movies }) => {
  const [existingWatchList, setExistingWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) || []
  );
  const [selectedMovie, setSelectedMovie] = useState(null); // Track selected movie
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

  // Add or remove movie from watchlist
  const watchListClickHandler = (movie) => {
    setExistingWatchList((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      const newList = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [movie, ...prev];
      localStorage.setItem("watchList", JSON.stringify(newList));
      return newList;
    });
  };

  // Open modal and set selected movie
  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="movie-card rounded-lg relative overflow-hidden hover:scale-110 duration-200 cursor-pointer"
        >
          <div className="ratings absolute top-2 left-2 cursor-pointer bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded">
            {Math.abs(movie.vote_average).toFixed(1)} ⭐️
          </div>

          <i
            onClick={() => watchListClickHandler(movie)}
            className="wishlist-icon fa-solid fa-heart absolute top-2 right-2 cursor-pointer text-xl"
            style={{
              color: existingWatchList.some((m) => m.id === movie.id)
                ? "#ff007f"
                : "rgb(214, 211, 211)",
            }}
          ></i>

          <img
            className="w-full h-full object-cover object-center rounded-lg shadow-md hover:opacity-75 transition duration-300 ease-in-out"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://placehold.co/500x750?text=No+Poster"
            }
            alt={movie.title}
            onClick={() => handleMovieClick(movie)}
          />

          <div
            className="movie-info absolute bottom-0 left-0 w-full p-4 bg-gray-800 bg-opacity-75 text-white flex justify-between items-center"
            onClick={() => handleMovieClick(movie)}
          >
            <div className="truncate">{movie.title}</div>
          </div>
        </div>
      ))}

      {/* Movie Details Modal */}
      {isModalOpen && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedMovie.title}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Poster */}
              <div>
                <img
                  src={
                    selectedMovie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`
                      : "https://placehold.co/500x750?text=No+Poster"
                  }
                  alt={selectedMovie.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Overview
                  </h3>
                  <p className="text-gray-600">{selectedMovie.overview}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Release Date
                  </h3>
                  <p className="text-gray-600">{selectedMovie.release_date}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Rating
                  </h3>
                  <p className="text-gray-600">
                    {selectedMovie.vote_average.toFixed(1)} ⭐️
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Popularity
                  </h3>
                  <p className="text-gray-600">
                    {selectedMovie.popularity.toFixed(2)}
                  </p>
                </div>

                {/* Trailer (Placeholder for now) */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Trailer
                  </h3>
                  <p className="text-gray-600">Trailer not available.</p>
                </div>
              </div>
            </div>

            <button
              className="mt-6 w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

MoviesCard.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesCard;
