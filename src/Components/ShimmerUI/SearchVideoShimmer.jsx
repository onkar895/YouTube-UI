/* eslint-disable no-unused-vars */
import React from 'react'

const SearchVideoShimmer = () => {
  return (
    <div className='md:flex md:flex-col max-sm:flex max-sm:flex-col md:gap-x-4 md:gap-y-16 mt-12 max-sm:gap-y-14 max-sm:mx-3'>
      {
        // creating a new Array instance using Array() constructor and map through every element of array 
        Array(50)
          .fill("")
          .map((_, index) => (

            <div key={index} className='flex items-start gap-x-5 max-sm:flex max-sm:flex-col max-sm:gap-3'>
              <div className='cursor-pointer md:w-[40.4vw] lg:w-[29vw] max-sm:w-[100vw] animate-pulse shadow-lg'>
                <div className='bg-gray-300 rounded-2xl max-sm:w-[94vw] md:h-[25vw] lg:h-[16vw] max-sm:h-[50vw] lg:w-[29vw] md:w-[40.4vw] animate-pulse'>
                </div>
              </div>
              <div className='flex max-sm:ml-1 mt-2 gap-2 max-sm:gap-1 items-center font-bold text-[14.6px] animate-pulse'>
                <div className='rounded-full md:hidden lg:hidden max-sm:w-12 max-sm:h-12 bg-gray-300 animate-pulse' ></div>
                <div className='md:space-y-8 max-sm:space-y-4'>
                  <div className='bg-gray-300 h-5 lg:w-[56vw] md:w-[42vw] max-sm:w-[78vw] rounded-lg animate-pulse'></div>
                  <div className='bg-gray-300 h-5 lg:w-[48vw] md:w-[34vw] max-sm:w-[48vw] rounded-lg animate-pulse'></div>
                  <div className='bg-gray-300 h-5 lg:w-[40vw] md:w-[26vw] max-sm:hidden rounded-lg animate-pulse'></div>
                </div>
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default SearchVideoShimmer
