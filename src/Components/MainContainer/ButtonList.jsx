/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ButtonNames } from '../../utils/constants';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ButtonList = () => {
  return (
    <div className='flex mt-20 gap-4'>
      <Carousel
        swipeable={false}    // disables the ability to swipe through the carousel items.
        draggable={false}    // disables dragging the carousel items.
        responsive={responsive}   // defines how the carousel responds to different screen sizes.
        infinite={true}  // enables infinite looping of carousel items,
        autoPlay={true}  // enables automatic play of the carousel items.
        autoPlaySpeed={2000}
        keyBoardControl={true}  // enables control of the carousel using keyboard arrow keys.
        showDots={false}   // whether to display pagination dots at the bottom of the carousel 
        slidesToSlide={1}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {
          ButtonNames.map((name, index) => (
            <div key={index}>
              <li className='list-none bg-gray-100 px-[12px] py-[6px] rounded-lg hover:bg-black hover:text-white text-sm'>
                <NavLink>
                  <span>
                    {name}
                  </span>
                </NavLink>
              </li>
            </div>
          ))
        }
      </Carousel >
    </div>

  );
};

export default ButtonList;
