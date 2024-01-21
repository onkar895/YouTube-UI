/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import { BsArrowLeftShort } from "react-icons/bs";

const SearchBar = ({ showSearch, setShowSearch }) => {

  const handleInput = `${showSearch ? 'w-[57vw] py-[7px] bg-gray-100 focus:outline-red-800 transition-all duration-500' : 'max-sm:hidden'} md:w-[36vw] lg:w-[42vw] border md:py-[7px] lg:py-[7px] border-gray-400 rounded-l-full py-1 pl-3 md:pl-5 focus:outline-red-800 transition-all duration-500`

  const handleSearchButton = `border border-gray-300 ${showSearch ? 'px-3 text-lg' : 'max-sm:border-none max-sm:rounded-full max-sm:text-2xl max-sm:ml-28'} rounded-r-full md:px-3 flex justify-center items-center md:bg-gray-100  hover:bg-gray-200`

  // Function to handle the search button click
  const handleSearchButtonClick = () => {
    const screenWidth = window.innerWidth;
    // console.log(`Window inner width: ${screenWidth}`);
    if (screenWidth < 768 && !showSearch) {
      setShowSearch(true);
    }
  };

  // Function to handle the search input focus
  // const handleSearchFocus = () => {
  //   const screenWidth = window.innerWidth;
  //   if (screenWidth < 768 && !showSearch) {
  //     setShowSearch(true);
  //   }
  // };

  // Function to handle the arrow left button click in the search
  const handleArrowLeftClick = () => {
    setShowSearch(false);
  };

  return (
    <div className='flex'>
      {/* Arrow Left In sm Search To Move to normal Screen */}
      {
        showSearch &&
        <div className='flex items-center mx-1'>
          <button onClick={handleArrowLeftClick}>
            <BsArrowLeftShort className='text-4xl' />
          </button>
        </div>
      }
      <input
        type="text"
        placeholder='Search'
        className={handleInput}
      />
      <button
        className={handleSearchButton}
        onClick={handleSearchButtonClick}
      >
        <IoSearchOutline className='md:w-10 md:h-5' />
      </button>
    </div>
  )
}

export default SearchBar
