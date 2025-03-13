/* eslint-disable no-unused-vars */

import "../Components/Movies.css";
import MoviesCard from "../cards/MoviesCard";
import React, { useEffect, useState } from "react";
import "../Components/Movies.css";
import Footer from "./Footer";

function Movies() {
  const [pageNo, setPageNo] = useState(1);
  const [movies, setMovies] = useState([]);
  const apiKey = "f4c4d5dfc484dcd1641baa765afed2e9";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US&page=${pageNo}`
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        console.log(data);

        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [pageNo]);

  return (
    <div>
      <div className="text-2xl font-bold text-center m-5">
        <h1>Trending Movies</h1>
      </div>

      <MoviesCard movies={movies} />

      {/* Pagination start  */}

      <div className="p-4 w-full mt-8 flex justify-center gap-2 items-center">
        <button
          onClick={() => setPageNo((p) => Math.max(1, p - 1))}
          disabled={pageNo === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded">{pageNo}</span>
        <button
          onClick={() => setPageNo((p) => p + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
}

// function Movies() {
//   // setup basic pagination
//   const [pageNo, setPageNo] = useState(1);

//   // we will be using this static list of movies then we will replace it with actual  data fetching logic
//   const [movies, setMovies] = useState([]);

//   const prevArrowHandler = () => {
//     let curPageNo = pageNo;

//     if (curPageNo <= 1) return;
//     setPageNo(curPageNo - 1);
//   };

//   const nextArrowHandler = () => {
//     let curPageNo = pageNo;
//     setPageNo(curPageNo + 1);
//   };

//   useEffect(() => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         //Add this in .env file
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjJlMzQyOTFmYzBhODU3MWMwZDVmMWFiZjU3Njk3MiIsIm5iZiI6MTczNjM1MjczNy43ODQsInN1YiI6IjY3N2VhM2UxYjExZDA4ODExMTdiMTczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gh0D67Q5XK8aXweiNHobHQ8fVkxKkqqIwAakKaEVJBk",
//       },
//     };

//     fetch(
//       `https://api.themoviedb.org/3/trending/movie/day?language=en-US &page=${pageNo}`,
//       options
//     )
//       .then((res) => res.json())
//       .then((res) => {
//         setMovies(res.results);
//         console.log(res, res.length);
//       })
//       .catch((err) => console.error(err));
//   }, [pageNo]);

//   const movieClickHandler = () => {};

//   return (
//     <div>
//       <div className=" text-2xl font-bold text-center m-5">
//         <h1 className="movie-inf">Trending Movies</h1>
//       </div>

//       {/* Show movies here */}

//       <MoviesCard pageNo={pageNo} movies={movies} />

//       {/* Pagination */}

//       <div className="bg-gray-400 p-4 h-[50px] w-full mt-8 flex justify-center gap-2">
//         <div onClick={prevArrowHandler} className="px-8">
//           <i className="prev fa-solid fa-arrow-left  cursor-pointer"></i>
//         </div>
//         <div>{pageNo}</div>
//         <div onClick={nextArrowHandler} className="px-8">
//           <i className="next fa-solid fa-arrow-right po  cursor-pointer"></i>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Movies;
