// eslint-disable-next-line no-unused-vars
import React from "react";

const Footer = () => {
  return (
    <div className="bg-white text-gray-800 py-6 text-center   mt-8">
      <p className="text-lg font-semibold">
        Made with <span className="text-red-500">❤️</span> by Deepak Gajwal
      </p>
      <div className="flex justify-center gap-6 mt-3">
        <a
          href="http://www.linkedin.com/in/deepak-gajwal-74610416b"
          className="hover:text-blue-500 transition duration-300 font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/deepak005-coder"
          className="hover:text-gray-500 transition duration-300 font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://leetcode.com/u/Deepak_Gajwal/"
          className="hover:text-yellow-500 transition duration-300 font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          LeetCode
        </a>
      </div>
    </div>
  );
};

export default Footer;
