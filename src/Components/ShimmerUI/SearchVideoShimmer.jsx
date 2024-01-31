/* eslint-disable no-unused-vars */
import React from 'react'

const SearchVideoShimmer = () => {
  return (
    <div className='md:flex md:flex-col max-sm:flex max-sm:flex-col md:gap-x-4 md:gap-y-16 max-sm:gap-y-16 md:mt-12 max-sm:mt-12'>
      {
        // creating a new Array instance using Array() constructor and map through every element of array 
        Array(50)
          .fill("")
          .map((_, index) => (

            <div key={index} className='flex items-start gap-x-5'>
              <div className='cursor-pointer md:w-[40.4vw] lg:w-[29vw] max-sm:w-[100vw] animate-pulse shadow-lg'>
                <div className='bg-gray-300 rounded-2xl max-sm:w-[94vw] md:h-[25vw] lg:h-[16vw] max-sm:h-[50vw] lg:w-[29vw] md:w-[40.4vw] animate-pulse'>
                </div>
              </div>
              <div className='flex max-sm:ml-1 mt-2 gap-2 items-center font-bold text-[14.6px] animate-pulse'>
                {/* <div className='rounded-full w-10 h-10 max-sm:w-10 max-sm:h-10 bg-gray-300 animate-pulse' ></div> */}
                <div className='space-y-8'>
                  <div className='bg-gray-300 h-5 lg:w-[56vw] md:w-[32vw] max-sm:w-[78vw] rounded-lg animate-pulse'></div>
                  <div className='bg-gray-300 h-5 lg:w-[48vw] md:w-[32vw] max-sm:w-[78vw] rounded-lg animate-pulse'></div>
                  <div className='bg-gray-300 h-5 lg:w-[40vw] md:w-[32vw] max-sm:w-[78vw] rounded-lg animate-pulse'></div>
                </div>
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default SearchVideoShimmer
