/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { BsArrowLeftShort } from 'react-icons/bs';
import { IoCloseOutline } from "react-icons/io5";
import { YOUTUBE_SEARCH_SUGGESTION_API } from '../utils/APIList';
import { useSelector } from 'react-redux';
import { cacheResults } from '../utils/searchSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ showSearch, setShowSearch }) => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const searchCache = useSelector((store) => store.search)
  const search = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Styles stored in variables for better readability and maintainability
  const searchSuggestionBarStyles = `${showSearch ? 'max-sm:w-[98%] max-sm:rounded-b-2xl max-sm:h-full max-sm:border-none' : 'max-sm:hidden'} fixed py-5 bg-white md:shadow-2xl md:rounded-2xl md:w-[45vw] lg:w-[42.3vw] lg:h-[75vh] border border-gray-100 `;

  const inputStyles = `${showSearch ? 'w-[61vw] max-sm:mx-auto transition-all duration-500 max-sm:ml-2 ml-2 pl-[12px] py-2' : 'max-sm:hidden'} ${isInputFocused ? 'max-sm:w-[74vw] max-sm:mx-auto max-sm:focus:outline-0 max-sm:border max-sm:border-red-600 md:pl-[3.2rem] md:border md:border-blue-600' : ''} md:w-[36vw] lg:w-[42vw] md:py-[7px] lg:py-[7px] border border-gray-300 rounded-l-full py-1 pl-3 md:pl-6 items-center transition-all focus:outline-0 duration-500}`;

  const searchButtonStyles = `${showSearch ? 'max-sm:px-3 max-sm:py-[10px]' : 'max-sm:border-none max-sm:text-2xl max-sm:px-auto max-sm:ml-32'} text-xl px-[2px] py-[9px] border border-gray-300 md:hover:bg-gray-200 rounded-r-full md:px-6 flex justify-center items-center md:bg-gray-100`;

  /**
   * Suppose,
   * searchCache = {
   * "iphone" : ["iphone 13", "iphone 14", .....]
   * }
   * 
   * searchQuery = iphone 
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      // If there are cached suggestions for the current searchQuery, it sets those suggestions using setSuggestions.
      // If there are no cached suggestions, it calls the getSearchSuggestions function.
      if (searchCache[searchQuery]) {
        setSuggestions((searchCache[searchQuery]))
      } else {
        getSearchSuggestions()
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    }
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      console.log('API CALL - ' + searchQuery);
      const data = await fetch(`${YOUTUBE_SEARCH_SUGGESTION_API}q=${searchQuery}`);
      const response = await data.json();
      setSuggestions(response[1]);

      // Dispatching a Redux action (cacheResults) to update the search cache with the new suggestions.
      dispatch(cacheResults({
        [searchQuery]: response[1]  // key:value
      }))

    } catch (error) {
      console.error('Error while fetching search suggestions:', error);
    }
  };

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
    // setShowSuggestions(false);
  };

  const handleClearSearch = (event) => {
    event.preventDefault();
    setSearchQuery('');
    search.current.focus()
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (event, search) => {
    event.preventDefault();
    if (search !== "") {
      const query = search.replace(" ", "+");
      navigate(`/results?search_query=${query}`);
      handleScrollTop();
      setShowSuggestions(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <div>
        <div className='flex items-center'>
          {/* Left Arrow Button In sm Search To Move to normal Screen */}
          {
            showSearch && (
              <div className='flex'>
                <button onClick={handleArrowLeftClick} onFocus={handleClearSearch}>
                  <BsArrowLeftShort className='text-4xl' />
                </button>
              </div>
            )
          }

          {
            isInputFocused && (
              <div className='absolute flex items-center lg:ml-[1.4rem] md:ml-[1.4rem]'>
                <button className='max-sm:hidden '>
                  <IoSearchOutline className='text-xl' />
                </button>
              </div>
            )
          }

          {
            searchQuery && (
              <div className={`${showSearch ? "max-sm:right-16 max-sm:mx-auto" : "max-sm:hidden"} absolute lg:right-[27rem] md:right-[18.8rem] flex items-center`}>
                <button onClick={handleClearSearch} className={``}>
                  <IoCloseOutline className='text-2xl cursor-pointer' />
                </button>
              </div>
            )
          }

          <input
            type='text'
            ref={search}
            placeholder='Search'
            className={inputStyles}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <button className={searchButtonStyles} onClick={(event) => { handleSearchButtonClick(); handleSearch(event, searchQuery) }}>
            <IoSearchOutline />
          </button>
        </div>

        <div>
          {
            searchQuery && showSuggestions && (
              <div className={searchSuggestionBarStyles}>
                {
                  suggestions.length === 0 ? (
                    searchQuery !== "" && (
                      <h1 className="text-center py-4 font-bold text-lg">{`No Results Found for ${searchQuery}`}</h1>
                    )
                  ) : (
                    <ul className='space-y-2 font-bold'>
                      {
                        suggestions.map((suggestion) => (
                          <li key={suggestion} className='flex items-center hover:bg-gray-200 md:px-[0.7rem] py-1 max-sm:gap-4 cursor-pointer' onClick={(event) => handleSearch(event, suggestion)} >
                            <IoSearchOutline className='md:w-10 md:h-5 mt-1 max-sm:w-10 max-sm:h-5 ' />
                            {suggestion}
                          </li>
                        ))
                      }
                    </ul>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default SearchBar;
