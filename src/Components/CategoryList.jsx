/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTagsUrl, videoFetchCatBased } from '../utils/APIList';
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from "react-icons/bi";
import ButtonsShimmer from './ShimmerUI/ButtonsShimmer';
import { TagNames } from '../utils/constants';

const CategoryList = () => {
  const listRef = useRef();
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("All");
  const [loading, setLoading] = useState(true);
  const [slideNumber, setSlideNumber] = useState(0);
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState("");

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
    try {
      const res = await fetch(fetchTagsUrl);
      const { items } = await res.json();
      setTags(items || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
      setError('Failed to fetch tags. Please try again later.');
    }
  };

  const tagFilterHandler = async (id, title) => {
    try {
      const res = await videoFetchCatBased(title, id);
      if (res?.items?.length > 0) {
        setNextPageToken(res.nextPageToken || "");
        setData(res.items);
        setSelectedButton(title);
      }
    } catch (error) {
      console.error('Error fetching videos based on category:', error);
      setError('Failed to fetch videos based on category. Please try again later.');
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
              {tags.length === 0 && (
                <div>
                  <section className='space-x-2'>
                    {TagNames.map((item, index) => (
                      <button key={index} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${selectedButton === item ? 'bg-gray-900 text-white' : ''}`} onClick={() => setSelectedButton(item)}>
                        {item}
                      </button>
                    ))}
                  </section>
                </div>
              )}

              {tags.length > 0 && (
                <section className='space-x-2'>
                  <small onClick={() => navigate('/')} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${selectedButton === "All" ? 'bg-gray-900 text-white' : ''}`}>
                    All
                  </small>
                  {tags.map(({ id, snippet: { title } }) => (
                    <button key={id} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${selectedButton === title ? 'bg-gray-900 text-white' : ''}`} onClick={() => tagFilterHandler(id, title)}>
                      {title}
                    </button>
                  ))}
                </section>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;