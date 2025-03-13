/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import "../Components/WatchList.css";
import genreId from "../Helper/genreId";
import RecommendedMovies from "./RecommendedMovies";
import Footer from "./Footer";

const WatchList = () => {
  const [existingWatchList, setExistingWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) || []
  );
  const [tempWatchList, setTempWatchList] = useState(existingWatchList);
  const [genre, setGenre] = useState("All Genres");
  const [openModal, setOpenModal] = useState(false);

  // Remove movie from watchlist
  const removeFromWatchlist = (movie) => {
    const newList = existingWatchList.filter((m) => m.id !== movie.id);
    setExistingWatchList(newList);
    setTempWatchList(newList);
    localStorage.setItem("watchList", JSON.stringify(newList));
  };

  // Search handler
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = existingWatchList.filter((movie) =>
      movie.title.toLowerCase().includes(value)
    );
    setTempWatchList(filtered);
  };

  // Sort handler
  const handleAscendingSort = () => {
    let sorted = existingWatchList.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    console.log(sorted);

    setTempWatchList([...sorted]);
  };
  const handleDescendingSort = () => {
    const sorted = existingWatchList.sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setTempWatchList([...sorted]);
  };

  // Genere sort handler
  const genereSortHandler = (e) => {
    const genere = e.target.value;

    const clickedGenreSortList = existingWatchList.filter(
      (movie) => genreId[movie.genre_ids?.[0]] === genere
    );

    if (genere === "All Genres") {
      setTempWatchList(existingWatchList);
    } else {
      setTempWatchList(clickedGenreSortList);
    }
    setGenre(genere);
  };

  //getting watchlist genere to sort

  const getWatchListGenere = () => {
    const set = new Set();
    set.add("All Genres");
    existingWatchList.forEach((movie) => {
      set.add(genreId[movie.genre_ids?.[0]]);
    });

    return set;
  };

  return (
    <div className="p-4 ">
      <RecommendedMovies
        setOpenModal={setOpenModal}
        openModal={openModal}
        existingWatchList={existingWatchList}
      />
      <div className="flex flex-col items-center mb-8">
        {/* <h2 className="text-3xl font-bold mb-4">Your Watchlist</h2> */}
        <div>
          {[...getWatchListGenere()].map((genere, id) => {
            return (
              <button
                key={id}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2  cursor-pointer my-1"
                onClick={genereSortHandler}
                value={genere}
                style={{
                  backgroundColor: genere === genre ? "#2563EB" : "#9CA3AF",
                }}
              >
                {genere}
              </button>
            );
          })}
        </div>

        <div className="w-full max-w-2xl mb-1 mt-2">
          <input
            type="text"
            placeholder="Search Your Favorite movies..."
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={handleSearch}
          />
        </div>
      </div>

      {tempWatchList.length === 0 ? (
        <div className="text-center text-xl mt-8">
          Your watchlist is empty. Add some movies!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white rounded-lg">
              <tr>
                <th className="py-3 px-4 text-left">Movie</th>

                <th className="py-3 px-4 text-left cursor-pointer flex items-center gap-2">
                  <span
                    className="text-lg text-green-500 transition-transform hover:-translate-y-1"
                    onClick={handleAscendingSort}
                  >
                    ▲
                  </span>
                  <span className="font-semibold text-white-800">Rating</span>
                  <span
                    className="text-lg text-red-500 transition-transform hover:translate-y-1"
                    onClick={handleDescendingSort}
                  >
                    ▼
                  </span>
                </th>

                <th className="py-3 px-4 text-left cursor-pointer">
                  Popularity{" "}
                </th>
                <th className="py-3 px-4 text-left">Genres</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {tempWatchList.map((movie) => (
                <tr
                  key={movie.id}
                  className="border-b hover:bg-gray-50 cursor-pointer "
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                            : "https://via.placeholder.com/200x300?text=No+Poster"
                        }
                        alt={movie.title}
                        className="w-18 h-24 object-cover rounded mr-4"
                      />
                      <span className="font-semibold">{movie.title}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    {movie.vote_average.toFixed(1)} ⭐
                  </td>

                  <td className="py-4 px-4">
                    {movie.popularity?.toFixed(2) || "N/A"}
                  </td>

                  <td className="py-4 px-4">
                    {genreId[movie.genre_ids?.[0]] || "N/A"}
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => removeFromWatchlist(movie)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Footer />
    </div>
  );
};

// const WatchList = () => {
//   let existingWatchList = JSON.parse(localStorage.getItem("watchList"));
//   console.log(existingWatchList);

//   return (
//     <div className=" justify-center gap-4 items-center overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
//       {/*add genere tags */}
//       <div className="flex justify-center gap-4 items-center overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
//         <div>All Genere</div>
//       </div>

//       {/* <input
//         className="h-[3rem] w-[19rem] bg-gray-200 px-4 outline-none border border-slate-600 border rounded-xl"
//         placeholder="Search Movies"
//         type="text"
//         value=""
//       />

//       <select
//         className=" flex  h-[3rem] w-[9rem]   border rounded-xl"
//         value="Filter Genre"
//       >
//         <option value="value1">Select Genre</option>
//         <option value="value2">Option 2</option>
//         <option value="value3">Option 3</option>
//       </select> */}

//       <div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6
//          gap-4"
//       >
//         {existingWatchList.map((movie) => (
//           <div
//             key={movie.id}
//             className="movie-card rounded-lg  relative overflow-hidden hover:scale-110 duration-200 cursor-pointer"
//           >
//             <div className="ratings  absolute top-2 left-2 cursor-pointer bg-gray-800 bg-opacity-75 text-white">
//               {Math.abs(movie.vote_average).toFixed(1)} ⭐️{" "}
//             </div>

//             <img
//               className="w-full h-full object-cover object-center rounded-lg shadow-md hover:opacity-75 transition duration-300 ease-in-out"
//               src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//               alt={movie.title}
//             />

//             <div className="movie-info absolute bottom-0 left-0 w-full p-4 bg-gray-800 bg-opacity-75 text-white flex justify-between items-center">
//               <div>{movie.title}</div>

//               {/* Add a rating component here if needed */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default WatchList;
