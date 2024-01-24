/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { BsArrowLeftShort } from 'react-icons/bs';
import { IoCloseOutline } from "react-icons/io5";
import { YOUTUBE_SEARCH_API } from '../utils/APIList';
import { useSelector } from 'react-redux';

const SearchBar = ({ showSearch, setShowSearch }) => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(getSearchSuggestions, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      console.log('API CALL - ' + searchQuery);
      const data = await fetch(`${YOUTUBE_SEARCH_API}q=${searchQuery}`);
      const response = await data.json();
      setSuggestions(response[1]);
    } catch (error) {
      console.error('Error while fetching search suggestions:', error);
    }
  };

  // Styles stored in variables for better readability and maintainability
  const searchSuggestionBarStyles = `${showSearch ? 'max-sm:w-[98%] max-sm:rounded-b-2xl' : 'max-sm:hidden'} fixed py-5 bg-white md:shadow-2xl md:rounded-2xl md:w-[44.5vw] lg:w-[42.3vw] lg:h-[75vh] border border-gray-100 ${isMenuOpen ? 'md:ml-20 md:w-[38vw] lg:ml-0' : ''}`;

  const inputStyles = `${showSearch ? 'w-[62.5vw] mx-auto transition-all duration-500 ml-2 pl-4 py-2' : 'max-sm:hidden'} md:w-[36vw] lg:w-[42vw] md:py-[7px] lg:py-[7px] border border-gray-300 md:rounded-l-full max-sm:rounded-l-xl py-1 pl-3 md:pl-6 transition-all focus:outline-0 duration-500 ${isInputFocused ? 'max-sm:w-[75.5vw] max-sm:mx-auto max-sm:focus:outline-0 md:pl-[3.2rem] md:border md:border-blue-500 max-sm:border max-sm:border-blue-500 ' : ''} ${isMenuOpen ? 'md:w-[28.8vw] md:ml-20 lg:ml-0' : ''}`;

  const searchButtonStyles = `${showSearch ? 'max-sm:px-3 max-sm:py-[10px] max-sm:rounded-r-xl' : 'max-sm:border-none max-sm:text-2xl max-sm:px-auto max-sm:pl-32'} text-xl px-[2px] py-[9px] border border-gray-300 hover:bg-gray-200 rounded-r-full md:px-6 flex justify-center items-center md:bg-gray-100 ${isInputFocused ? 'md:border md:border-blue-500 max-sm:border max-sm:border-blue-500 ' : ''}`;

  // Function to handle the search button click
  const handleSearchButtonClick = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768 && !showSearch) {
      setShowSearch(true);
    }
  };

  // Function to handle the arrow left button click in the search
  const handleArrowLeftClick = () => {
    setShowSearch(false);
  };

  // Function to handle input focus
  const handleInputFocus = () => {
    setIsInputFocused(true);
    setShowSuggestions(true);
  };

  // Function to handle input blur
  const handleInputBlur = () => {
    setIsInputFocused(false);
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <div>
        <div className='flex items-center'>
          {/* Left Arrow Button In sm Search To Move to normal Screen */}
          {
            showSearch && (
              <div className='flex'>
                <button onClick={handleArrowLeftClick}>
                  <BsArrowLeftShort className='text-4xl' />
                </button>
              </div>
            )
          }

          {
            isInputFocused && (
              <>
                <div className={` absolute z-30 max-sm:hidden flex items-center`}>
                  <div className={`${isMenuOpen ? 'md:ml-[6.4rem] lg:ml-0' : ''} lg:ml-[1.4rem] md:ml-[1.4rem]`}>
                    <IoSearchOutline className='text-xl' />
                  </div>
                  <div className={`${isMenuOpen ? 'md:ml-[9rem] lg:ml-0' : ''} lg:ml-[29rem] md:ml-[12.5rem]`}>
                    <IoCloseOutline className='text-2xl cursor-pointer' onClick={handleClearSearch} />
                  </div>
                </div>
              </>
            )
          }

          <input
            type='text'
            placeholder='Search'
            className={inputStyles}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <button className={searchButtonStyles} onClick={handleSearchButtonClick}>
            <IoSearchOutline />
          </button>
        </div>

        <div>
          {
            searchQuery && showSuggestions && (
              <div className={searchSuggestionBarStyles}>
                <ul className='space-y-2 font-bold'>
                  {suggestions.map((suggestion) => (
                    <li key={suggestion} className={`flex items-center hover:bg-gray-200 md:px-[0.7rem] py-1 max-sm:gap-3`}>
                      <IoSearchOutline className='md:w-10 md:h-5 mt-1 max-sm:w-9 max-sm:h-5 ' />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default SearchBar;
