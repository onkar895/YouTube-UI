/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { fetchTagsUrl, YOUTUBE_SEARCH_API } from '../utils/APIList';
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from "react-icons/bi";
import ButtonsShimmer from './ShimmerUI/ButtonsShimmer';
import { TagNames } from '../utils/constants';

const CategoryList = () => {
  const listRef = useRef();
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("All");
  const [loading, setLoading] = useState(true);
  const [slideNumber, setSlideNumber] = useState(0);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await fetch(fetchTagsUrl);
      const data = await res.json();
      const items = data.items || []; // Extract items array from the response
      const tags = items.map(item => item.snippet.title); // Extract titles from items
      setTags(tags);
      setLoading(false); // Set loading to false after fetching tags
    } catch (error) {
      console.error('Error fetching tags:', error);
      setError('Failed to fetch tags. Please try again later.');
      setLoading(false);
    }
  };



  const handleExploreButtonClick = (ExploreName) => {
    const newQuery = ExploreName.replace(" ", "+");
    setSelectedButton(newQuery);
    setIsLoading(true); // Start loading
    if (newQuery === "All") {
      navigate("/");
    } else {
      navigate(`/explore?eq=${newQuery}`);
    }
  };

  const handleScroll = (direction) => {
    const box = listRef.current;
    const slideWidth = box.clientWidth;
    const newSlideNumber = direction === "previous" ? slideNumber - 1 : slideNumber + 1;
    setSlideNumber(newSlideNumber);
    box.scrollLeft += (direction === "previous" ? -slideWidth : slideWidth);
  };

  return (
    <div className="fixed z-10 lg:w-[90.2vw] md:w-[84.2vw] max-sm:w-[94vw] max-sm:mx-3 bg-white md:pt-3">
      <div className={`${loading ? "hidden" : ''} max-sm:hidden`}>
        <div className={slideNumber === 0 ? "hidden" : ""}>
          <button className="absolute left-0 rounded-full hover:scale-110 hover:transition-all duration-200" onClick={() => handleScroll("previous")}>
            <BiSolidChevronLeftCircle className="w-8 h-8 bg-white" />
          </button>
        </div>
        <div className={slideNumber === 1 ? "hidden" : ""}>
          <button className="absolute right-0 rounded-full hover:scale-110 hover:transition-all duration-200" onClick={() => handleScroll("next")}>
            <BiSolidChevronRightCircle className="w-8 h-8 bg-white" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto transition-transform duration-300 ease-in-out">
        <ul className="flex text-sm gap-4 overflow-y-auto scrollBar whitespace-nowrap scroll-smooth" ref={listRef}>
          {loading ? (
            <ButtonsShimmer />
          ) : (
            <>
              {
                tags.length === 0 && (
                  <div>
                    <section className='space-x-2'>
                      {
                        TagNames.map((item, index) => (
                          <button key={index} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${selectedButton === item ? 'bg-gray-900 text-white' : ''}`} onClick={() => handleExploreButtonClick(name)}>
                            {item}
                          </button>
                        ))
                      }
                    </section>
                  </div>
                )
              }

              {
                tags.length > 0 && (
                  <section className='space-x-2'>
                    <button onClick={() => navigate('/')} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${selectedButton === "All" ? 'bg-gray-900 text-white' : ''}`}>
                      All
                    </button>
                    {
                      tags.map((name, index) => {
                        return (
                          <button key={index} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${selectedButton === name ? 'bg-gray-900 text-white' : ''}`} onClick={() => handleExploreButtonClick(name)}>
                            {name}
                          </button>
                        )
                      })
                    }
                  </section>
                )
              }
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;

