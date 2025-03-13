/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { getRecommendedMovies } from "../config/gemini";

const RecommendedMovies = ({ setOpenModal, openModal, existingWatchList }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const handleRecommendMovies = async () => {
    setLoading(true); // Start loading
    try {
      const response = await getRecommendedMovies(existingWatchList);
      const textResponse = await response.response.text();

      // Parse the JSON response
      const jsonStart = textResponse.indexOf("[");
      const jsonEnd = textResponse.lastIndexOf("]") + 1;
      const jsonString = textResponse.slice(jsonStart, jsonEnd);
      const parsedMovies = JSON.parse(jsonString);

      setRecommendedMovies(parsedMovies);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center mt-0 mb-2">
      <button
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg 
               shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 
               transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 
               focus:ring-offset-2"
        onClick={handleRecommendMovies}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <div className="flex items-center">
            <i className="fas fa-spinner fa-spin mr-2"></i> {/* Spinner icon */}
            Generating Recommendations...
          </div>
        ) : (
          <>
            <i className="fas fa-magic mr-2"></i>
            Recommend Movies
          </>
        )}
      </button>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Recommended Movies
              </h2>
              <button
                onClick={() => setOpenModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            {loading ? ( // Show loader while fetching recommendations
              <div className="flex justify-center items-center h-40">
                <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedMovies.map((movie, index) => (
                  <div
                    key={index}
                    className="flex bg-gray-50 rounded-lg p-4 shadow-sm"
                  >
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-32 h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/200x300?text=Poster+Not+Found";
                      }}
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {movie.title}
                      </h3>
                      <div className="flex items-center mt-2">
                        <span className="text-sm font-medium text-white bg-blue-500 px-2 py-1 rounded">
                          Confidence: {movie.confidence}%
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600 text-sm">
                        {movie.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="mt-6 w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => setOpenModal(false)}
            >
              Close Recommendations
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

RecommendedMovies.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  existingWatchList: PropTypes.array.isRequired,
};

export default RecommendedMovies;
