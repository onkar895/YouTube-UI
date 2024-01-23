/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonNames } from '../utils/constants'

const ButtonList = () => {

  return (
    <div className='md:w-[83vw] lg:w-[89.5vw] max-sm:w-[94vw] max-sm:mx-auto sticky md:top-[3.6rem] max-sm:top-[3.6rem] bg-white pt-4 z-10'>
      <ul className='flex text-sm gap-4 overflow-y-auto scrollBar whitespace-nowrap cursor-pointer'>
        {
          ButtonNames.map((name, index) => (
            <li key={index} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${name === "All" ? "bg-gray-900 text-white" : " "}`}>
              <NavLink to={`/${name.toLowerCase()}`}>
                <span>
                  {name}
                </span>
              </NavLink>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ButtonList;