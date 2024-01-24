/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonNames } from '../utils/constants';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from "react-icons/bi";

const ButtonList = () => {
  const tabBoxRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    const tabBox = tabBoxRef.current;

    const handleScroll = () => {
      setIsScrollable(tabBox.scrollWidth > tabBox.clientWidth);
      setShowLeftButton(tabBox.scrollLeft > 0);
      setShowRightButton(tabBox.scrollLeft < tabBox.scrollWidth - tabBox.clientWidth);
    };

    tabBox.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Initial check for scrollability
    handleScroll();

    return () => {
      tabBox.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleScroll = (scrollValue) => {
    const tabBox = tabBoxRef.current;
    tabBox.scrollLeft += scrollValue;
  };

  return (
    <div className="md:w-[83vw] lg:w-[89.5vw] max-sm:w-[94vw] max-sm:mx-auto sticky md:top-[3.5rem] max-sm:top-[4rem] bg-white pt-4 z-10">
      <div className='max-sm:hidden'>
        {isScrollable && (
          <>
            {showLeftButton && (
              <button
                className="absolute left-0 top-0 bottom-0 rounded-full hover:scale-110"
                onClick={() => handleScroll(-200)}
              >
                <BiSolidChevronLeftCircle className="w-8 h-16 bg-white" />
              </button>
            )}
            {showRightButton && (
              <button
                className="absolute right-0 top-0 bottom-0 rounded-full hover:scale-110"
                onClick={() => handleScroll(200)}
              >
                <BiSolidChevronRightCircle className="w-8 h-16 bg-white" />
              </button>
            )}
          </>
        )}
      </div>
      <div className="overflow-x-auto transition-transform duration-300 ease-in-out">
        <ul className="flex text-sm gap-4 overflow-y-auto scrollBar whitespace-nowrap" ref={tabBoxRef}>
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
