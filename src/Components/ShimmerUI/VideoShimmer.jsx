/* eslint-disable no-unused-vars */
import React from 'react'
import { NavLink } from 'react-router-dom'

const VideoShimmer = () => {
  return (
    <div className='md:flex md:flex-wrap max-sm:flex max-sm:flex-col md:gap-x-4 md:gap-y-16 max-sm:mx-3 max-sm:gap-y-10'>
      {
        // creating a new Array instance using Array() constructor and map through every element of array 
        Array(50)
          .fill("")
          .map((_, index) => (

            <NavLink key={index}>
              <div className='cursor-pointer md:w-[40.4vw] lg:w-[29vw] max-sm:w-[100vw] animate-pulse shadow-lg'>
                <div className='bg-gray-300 rounded-2xl max-sm:w-[94vw] md:h-[25vw] lg:h-[16vw] max-sm:h-[50vw] lg:w-[29vw] md:w-[40.4vw] animate-pulse'>
                </div>
              </div>
              <div className='flex max-sm:ml-1 mt-[1rem] gap-2 items-center font-bold text-[14.6px] animate-pulse'>
                <div className='rounded-full w-10 h-10 bg-gray-300 animate-pulse' ></div>
                <div className='mr-2 bg-gray-300 h-12 lg:w-[24.5vw] md:w-[33vw] max-sm:w-[75vw] rounded-lg animate-pulse'></div>
              </div>
              <div className=' bg-gray-300 md:ml-12 max-sm:ml-[14vw] lg:w-[24.5vw] md:w-[33vw] max-sm:w-[75vw] h-4 mt-2 rounded-lg animate-pulse '>

              </div>
              <div className=' bg-gray-300 md:ml-12 max-sm:ml-[14vw]  lg:w-[24.5vw] md:w-[33vw] max-sm:w-[75vw] h-4 mt-2 rounded-lg animate-pulse'>

              </div>
            </NavLink>

          ))
      }
    </div>
  )
}

export default VideoShimmer
