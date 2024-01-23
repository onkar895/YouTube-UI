/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import { BsArrowLeftShort } from "react-icons/bs";
import { YOUTUBE_SEARCH_API } from '../utils/APIList'

const SearchBar = ({ showSearch, setShowSearch }) => {

  const [searchQuery, setSearchQuery] = useState("")

  const [suggestions, setSuggestions] = useState([])

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      getSearchSuggestions()
    }, 200);

    return () => {
      clearTimeout(timer)
    }

  }, [searchQuery])


  const getSearchSuggestions = async () => {
    try {
      console.log("API CALL - " + searchQuery)
      const data = await fetch(YOUTUBE_SEARCH_API + "q=" + searchQuery);
      const response = await data.json();
      // console.log(response[1]);
      setSuggestions(response[1])
    } catch (error) {
      console.error('Error while fetching search suggestions:', error);
    }
  };

  const handleSearchSuggestionBar = `${showSearch ? "max-sm:w-[100%]  rounded-b-2xl" : "max-sm:hidden"}  fixed py-5 bg-white shadow-2xl rounded-2xl md:w-[44vw] lg:w-[42.3vw] lg:h-[75vh] border border-gray-100`

  const handleInput = `${showSearch ? 'w-[62.5vw] mx-auto py-[8px] border-none bg-gray-200 transition-all duration-500 ml-2' : 'max-sm:hidden'} md:w-[36vw] lg:w-[42vw] md:py-[7px] lg:py-[7px] border border-gray-400 rounded-l-full py-1 pl-3 md:pl-6 focus:outline-gray-300 transition-all duration-500 ${isInputFocused ? 'max-sm:w-[75.5vw] max-sm:mx-auto' : ''}`

  const handleSearchButton = `${showSearch ? 'px-3 text-lg max-sm:bg-gray-200' : 'max-sm:border-none max-sm:rounded-full max-sm:text-2xl max-sm:ml-28'} border border-gray-300 rounded-r-full md:px-3 flex justify-center items-center md:bg-gray-100`

  // Function to handle the search button click
  const handleSearchButtonClick = () => {
    const screenWidth = window.innerWidth;
    // console.log(`Window inner width: ${screenWidth}`);
    if (screenWidth < 768 && !showSearch) {
      setShowSearch(true);
    }
  };

  // Function to handle the arrow left button click in the search
  const handleArrowLeftClick = () => {
    setShowSearch(false);
  };

  return (
    <>
      <div>
        <div className='flex'>

          {/* Left Arrow Button In sm Search To Move to normal Screen */}
          {
            showSearch &&
            <div className='flex items-center'>
              <button onClick={handleArrowLeftClick}>
                <BsArrowLeftShort className='text-4xl' />
              </button>
            </div>
          }

          <input
            type="text"
            placeholder='Search'
            className={handleInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsInputFocused(true)
              setShowSuggestions(true)
            }
            }
            onBlur={() => {
              setIsInputFocused(false);
              setTimeout(() => setShowSuggestions(false), 200);
            }}
          />
          <button
            className={handleSearchButton}
            onClick={handleSearchButtonClick}
          >
            <IoSearchOutline className='md:w-10 md:h-5' />
          </button>
        </div>

        <div>
          {
            searchQuery && showSuggestions && (
              <div className={handleSearchSuggestionBar}>
                <ul className='space-y-2 font-bold'>
                  {
                    suggestions.map((suggestion) => (
                      <li key={suggestion} className={`flex items-center hover:bg-gray-200 md:px-[0.7rem] py-1 max-sm:gap-3`}>
                        <IoSearchOutline className='md:w-10 md:h-5 mt-1 max-sm:w-9 max-sm:h-5 ' />
                        {suggestion}
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
          }
        </div>
      </div>
    </>

  )

}

export default SearchBar
