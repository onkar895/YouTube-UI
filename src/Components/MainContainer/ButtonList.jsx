/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonNames } from '../../utils/constants';

const ButtonList = () => {

  return (
    <div className='flex mt-20 gap-4 overflow-x-scroll no-scrollbar'>
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
    </div>
  );
};

export default ButtonList;
