/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonNames } from '../../utils/constants';

const ButtonList = () => {

  return (
    <div className='mt-[72px] md:w-[83vw] lg:w-[90vw] w-[90vw] sticky'>
      <ul className='flex text-sm gap-4 overflow-y-auto scrollBar whitespace-nowrap cursor-pointer'>
        {
          ButtonNames.map((name, index) => (
            <li key={index} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg ${name === "All" ? "bg-gray-900 text-white" : " "}`}>
              <NavLink>
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
