/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchTagsUrl, videoFetchCatBased, YOUTUBE_VIDEO_API } from '../utils/APIList';
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from "react-icons/bi";
import ButtonsShimmer from './ShimmerUI/ButtonsShimmer';
import { ButtonNames } from '../utils/constants';

const ButtonList = () => {
  const listRef = useRef();
  const [searchParams] = useSearchParams();
  const [selectedButton, setSelectedButton] = useState("All");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [slideNumber, setSlideNumber] = useState(0);
  const [data, setData] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState("");
  const [tags, setTags] = useState([]);
  const [tagResults, setTagsResults] = useState({ state: false });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (direction) => {
    const box = listRef.current;
    const slideWidth = box.clientWidth;
    if (direction === "previous") {
      setSlideNumber(slideNumber - 1);
      box.scrollLeft -= slideWidth;
    } else if (direction === "next") {
      setSlideNumber(slideNumber + 1);
      box.scrollLeft += slideWidth;
    }
  };

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
    }
  }

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
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEO_API);

      if (!response.ok) {
        throw new Error(`Failed to fetch videos. Status: ${response.status}`);
      }

      const data = await response.json();
      setVideos(data.items);
      setError(null); // Clear error state on successful fetch
    } catch (error) {
      console.error('Error while fetching the videos:', error);
      setError('Failed to fetch videos. Please try again later.');
    }

  };

  const allClickHandler = async () => {
    const res = await getVideos();
    if (res) {
      setNextPageToken(res?.nextPageToken);
      setData([...res.items]);
      setTagsResults({
        state: false,
      });
    }
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
                data.length < 1 || tags.length < 1 ? (
                  <div>
                    <section className='space-x-2'>
                      {ButtonNames.map((item, index) => (
                        <button key={index} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${selectedButton === item ? 'bg-gray-900 text-white' : ''}`} onClick={() => setSelectedButton(item)}>
                          {item}
                        </button>
                      ))}
                    </section>
                  </div>
                ) : (
                  <section className='space-x-2'>
                    <small onClick={allClickHandler} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${selectedButton === "All" ? 'bg-gray-900 text-white' : ''}`}>
                      All
                    </small>
                    {tags.map(({ id, snippet: { title } }) => (
                      <button key={id} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${selectedButton === title ? 'bg-gray-900 text-white' : ''}`} onClick={() => tagFilterHandler(id, title)}>
                        {title}
                      </button>
                    ))}
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

export default ButtonList;
