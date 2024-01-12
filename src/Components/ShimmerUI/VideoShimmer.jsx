/* eslint-disable no-unused-vars */
import React from 'react'

const VideoShimmer = () => {
  return (
    <div className='md:flex md:flex-wrap max-sm:flex max-sm:flex-col md:gap-x-4 md:gap-y-10'>
      {
        // creating a new Array instance using Array() constructor and map through every element of array 
        Array(50)
          .fill("")
          .map((_, index) => (
            <div key={index}>
              <div className='mt-8 cursor-pointer md:w-[40.4vw] lg:w-[28.5vw] max-sm:w-[100vw]'>
                <div className='bg-gray-200 rounded-2xl max-sm:w-[90vw] md:h-[25vw] lg:h-[15vw] max-sm:h-[50vw] mx-auto lg:w-[28.5vw] md:w-[40.4vw]'>
                </div>
              </div>
              <div className='flex max-sm:ml-6 mt-5 gap-2 items-center font-bold text-[14.6px] '>
                <div className='rounded-full w-10 h-10 bg-gray-200' ></div>
                <div className='mr-2 bg-gray-200 h-12 lg:w-[24.5vw] md:w-[33vw] max-sm:w-[75vw] rounded-lg'></div>
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default VideoShimmer
