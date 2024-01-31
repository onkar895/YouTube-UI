/* eslint-disable no-unused-vars */
import React from 'react';

const ButtonsShimmer = () => {
  return (
    <div className='flex lg:w-[90.2vw] md:w-[80vw] max-sm:w-[94vw] md:h-8 gap-4 max-sm:h-8 animate-pulse'>
      {Array(20).fill('').map((_, index) => (
        <div key={index} className='px-8 rounded-lg bg-gray-300'>
          <div></div>
        </div>
      ))}
    </div>
  );
};

export default ButtonsShimmer;
