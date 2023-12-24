import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className="text-xs sm:text-sm md:text-[15px] lg:text-base h-[87.5vh] z-0 bg-no-repeat overflow-hidden bg-cover bg-center w-screen bg-[url('https://freefrontend.com/assets/img/html-funny-404-pages/HTML-Beer-404-Page.gif')]">
      <div className="mt-[25%] sm:mt-[22%] md:mt-[17%] lg:mt-[17%] ml-[50%] sm:ml-[49%] md:ml-[49%] lg:ml-[52%] text-center text-black">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-2.5 sm:mb-5 md:mb-8 lg:mb-10">Look like you are lost</h1>
        <p className="font-bold mb-6">
          The page you are trying to reach don't exit{" "}
        </p>
        <Link to="/" className="px-4 py-2.5 bg-amber-700 text-white rounded">
          Go Home
        </Link>
      </div>
    </div>
  );
};
