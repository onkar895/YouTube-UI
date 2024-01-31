/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ButtonNames } from '../utils/constants';
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from "react-icons/bi";
import ButtonsShimmer from './ShimmerUI/ButtonsShimmer';

const ButtonList = () => {

  const listRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [slideNumber, setSlideNumber] = useState(0);
  const [selectedButton, setSelectedButton] = useState("All"); // State to track selected button

  useEffect(() => {
    // Simulate loading data
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

  const handleButtonClick = (ButtonName) => {
    const query = ButtonName.replace(" ", "+");
    setSelectedButton(ButtonName); // Update selected button
    if (query === "All") {
      navigate("/");
    } else {
      navigate(`/searchresults?search_query=${query}`);
    }
  };

  return (
    <div className="fixed z-10 lg:w-[90.2vw] md:w-[84.2vw] max-sm:w-[94vw] max-sm:mx-3 bg-white md:pt-3">
      <div className={`${loading ? "hidden" : ''} max-sm:hidden`}>
        <div className={slideNumber === 0 ? "hidden" : ""}>
          <button
            className="absolute left-0 rounded-full hover:scale-110 hover:transition-all duration-200"
            onClick={() => handleScroll("previous")}>
            <BiSolidChevronLeftCircle className="w-8 h-8 bg-white" />
          </button>
        </div>

        <div className={slideNumber === 1 ? "hidden" : ""}>
          <button
            className="absolute right-0 rounded-full hover:scale-110 hover:transition-all duration-200"
            onClick={() => handleScroll("next")}>
            <BiSolidChevronRightCircle className="w-8 h-8 bg-white" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto transition-transform duration-300 ease-in-out">
        <ul className="flex text-sm gap-4 overflow-y-auto scrollBar whitespace-nowrap scroll-smooth" ref={listRef}>
          {
            loading ? (
              <ButtonsShimmer />
            ) : (
              ButtonNames.map((name, index) => (
                <li key={index} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${selectedButton === name ? 'bg-gray-900 text-white' : ''}`}>
                  <button onClick={() => handleButtonClick(name)}>
                    <span>{name}</span>
                  </button>
                </li>
              ))
            )
          }
        </ul>
      </div>
    </div >
  );
};

export default ButtonList;
