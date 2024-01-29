/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonNames } from '../utils/constants';
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from "react-icons/bi";

const ButtonList = () => {

  const listRef = useRef();
  const [slideNumber, setSlideNumber] = useState(0);

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

  return (
    <div className=" md:w-[83vw] lg:w-[89.5vw] max-sm:w-[94vw] max-sm:mx-auto sticky md:top-[3.6rem] max-sm:top-[4rem] bg-white pt-4 z-10 w-full">

      <div className='max-sm:hidden'>
        <div className={slideNumber === 0 ? "hidden" : ""}>
          <button
            className="absolute left-0 top-0 bottom-0 rounded-full hover:scale-110 hover:transition-all duration-200"
            onClick={() => handleScroll("previous")}>
            <BiSolidChevronLeftCircle className="w-8 h-16 bg-white" />
          </button>
        </div>

        <div className={slideNumber === 1 ? "hidden" : ""}>
          <button
            className="absolute right-0 top-0 bottom-0 rounded-full hover:scale-110 hover:transition-all duration-200"
            onClick={() => handleScroll("next")}>
            <BiSolidChevronRightCircle className="w-8 h-16 bg-white" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto transition-transform duration-300 ease-in-out">
        <ul className="flex text-sm gap-4 overflow-y-auto scrollBar whitespace-nowrap scroll-smooth" ref={listRef}>
          {ButtonNames.map((name, index) => (
            <li
              key={index}
              className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${name === 'All' ? 'bg-gray-900 text-white' : ''
                }`}
            >
              <NavLink to={`/${name.toLowerCase()}`}>
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ButtonList;
