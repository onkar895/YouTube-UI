/* eslint-disable no-unused-vars */
import React from 'react'

const VideoShimmer = () => {
  return (
    <div className='md:flex md:flex-wrap max-sm:flex max-sm:flex-col md:gap-x-5 md:gap-y-16 max-sm:gap-y-16 max-sm:mx-3'>
      {
        // creating the new Array instance using Array() constructor and map through every element of array 
        Array(50)
          .fill("")
          .map((_, index) => (
            <div key={index}>
              <div className='cursor-pointer rounded-2xl md:w-[40.4vw] lg:w-[29vw] max-sm:w-[100vw] animate-pulse shadow-lg'>
                <div className='bg-gray-300 rounded-2xl max-sm:w-[94vw] md:h-[25vw] lg:h-[16vw] max-sm:h-[50vw] lg:w-[29vw] md:w-[40.4vw] animate-pulse'>
                </div>
              </div>
              <div className='flex max-sm:ml-1 mt-[1.2rem] gap-2 items-center font-bold text-[14.6px] animate-pulse'>
                <div className='rounded-full w-12 h-12 max-sm:w-10 max-sm:h-10 bg-gray-300 animate-pulse' ></div>
                <div className='space-y-2'>
                  <div className='mr-2 bg-gray-300 h-6 lg:w-[24vw] md:w-[32vw] max-sm:w-[78vw] rounded-sm animate-pulse'></div>
                  <div className='mr-2 bg-gray-300 h-6 lg:w-[16vw] md:w-[20vw] max-sm:w-[48vw] rounded-sm animate-pulse'></div>
                </div>
              </div>
              {/* <div className=' bg-gray-300 md:ml-12 max-sm:ml-[14vw] lg:w-[24.5vw] md:w-[33vw] max-sm:w-[78vw] h-4 mt-2 max-sm:mt-3 rounded-lg animate-pulse '>

              </div>
              <div className=' bg-gray-300 md:ml-12 max-sm:ml-[14vw]  lg:w-[24.5vw] md:w-[33vw] max-sm:w-[78vw] h-4 mt-2 max-sm:mt-3 rounded-lg animate-pulse'>
              </div> */}
            </div>

          ))
      }
    </div>
  )
}

export default VideoShimmer
