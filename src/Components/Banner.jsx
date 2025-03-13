/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

// function Banner() {
//   const [bannerData, setBannerData] = useState({
//     image:
//       "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
//     title: "Placeholder title",
//   });

//   useEffect(() => {
//     const fetchBannerData = async () => {
//       try {
//         const apiKey = "f4c4d5dfc484dcd1641baa765afed2e9";
//         const response = await fetch(
//           `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US&page=1`
//         );

//         if (!response.ok) throw new Error("Failed to fetch");

//         const data = await response.json();
//         const movie = data.results?.[1] || {};

//         setBannerData({
//           image: movie.backdrop_path
//             ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
//             : bannerData.image,
//           title: movie.title || bannerData.title,
//         });
//       } catch (error) {
//         console.error("Error fetching banner data:", error);
//       }
//     };

//     fetchBannerData();
//   }, []);

//   return (
//     <div
//       className="rounded-lg h-[20vh] md:h-[45vh] bg-cover bg-center flex items-end cursor-pointer"
//       style={{ backgroundImage: `url(${bannerData.image})` }}
//     >
//       <div className="text-white w-full text-center text-2xl font-bold p-4 bg-black bg-opacity-50">
//         {bannerData.title}
//       </div>
//     </div>
//   );
// }

function Banner() {
  const [bannerData, setBannerData] = useState([
    {
      image:
        "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
      title: "Placeholder title",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const apiKey = "f4c4d5dfc484dcd1641baa765afed2e9";
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        const movies = data.results.slice(
          Math.floor(Math.random() * data.results.length),
          data.results.length
        ); // Get first 5 movies

        const banners = movies.map((movie) => ({
          image: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
            : bannerData[0].image,
          title: movie.title || bannerData[0].title,
        }));

        setBannerData(banners);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBannerData();
  }, []);

  // Auto-slide effect
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
  //   }, 4000); // Change every 4 seconds

  //   return () => clearInterval(interval);
  // }, [bannerData]);

  // Manual navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
  };

  return (
    <div className="relative rounded-lg h-[40vh] md:h-[70vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${bannerData[currentIndex].image})` }}
      >
        <div className="absolute bottom-0 w-full text-center text-white text-2xl font-bold p-4 bg-black bg-opacity-50">
          {bannerData[currentIndex].title}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white text-lg"
        onClick={handlePrev}
      >
        ❮
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white text-lg"
        onClick={handleNext}
      >
        ❯
      </button>
    </div>
  );
}

export default Banner;
