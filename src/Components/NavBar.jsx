/* eslint-disable no-unused-vars */
import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import RecomendedMovies from "./RecommendedMovies";
const NavBar = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-white">
      <div className="container mx-auto flex items-center px-4 py-1">
        {/* Logo and Links Aligned Equally */}
        <div className="flex items-center space-x-8 flex-none">
          <Link
            to="/"
            className="hover:scale-105 transition-transform duration-300"
          >
            <img
              className="w-16 h-16 hover:scale-110 transition-transform duration-300"
              src={logo}
              alt="Movie Logo"
            />
          </Link>
          <Link
            to="/"
            className="text-xl lg:text-2xl font-semibold text-blue-600 hover:text-blue-700
                       hover:underline decoration-2 underline-offset-4 transition-all"
          >
            Movies
          </Link>
          <Link
            to="/watchlist"
            className="text-xl lg:text-2xl font-semibold text-blue-600 hover:text-blue-700
                       hover:underline decoration-2 underline-offset-4 transition-all"
          >
            Watchlist
          </Link>
        </div>

        {/* Search Input - Centered Without Pushing Other Elements */}
        {/* <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-1/3 max-w-lg p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
        </div> */}
      </div>
    </div>
  );
};
export default NavBar;
