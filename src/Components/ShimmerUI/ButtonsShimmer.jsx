/* eslint-disable no-unused-vars */
import React from 'react'

const ButtonsShimmer = () => {

  return (

    <div className='md:w-[83vw] lg:w-[89.5vw] w-[92vw] max-sm:mx-auto md:top-[3.6rem] max-sm:top-[3.25rem] bg-white pt-4 z-10 lg:mt-[6rem]'>
      {Array(20)
        .fill('')
        .map((_, index) => {
          <div key={index}>
            <div className={`flex text-sm gap-4 overflow-y-auto scrollBar whitespace-nowrap cursor-pointer top-24 w-10 h-10`}>
              <div key={index} className={`bg-gray-100 hover:bg-gray-900 hover:text-white hover:transition duration-500 px-[12px] py-[6px] rounded-lg `}>
              </div>
            </div>
          </div>
        })}
    </div>
  )
}

export default ButtonsShimmer
