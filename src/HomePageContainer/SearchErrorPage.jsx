/* eslint-disable no-unused-vars */
// SearchErrorPage.jsx
import React from 'react';

const SearchErrorPage = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-5">
      <p className="text-2xl text-red-600 sm:text-5xl font-bold">Error</p>
      <p className="text-lg sm:text-xl">Oops! Something Went Wrong. Please try again later...</p>
    </div>
  );
};

export default SearchErrorPage;
