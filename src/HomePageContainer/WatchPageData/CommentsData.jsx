/* eslint-disable no-unused-vars */
import React from 'react'
import { BiMenuAltLeft } from "react-icons/bi";

const CommentsData = () => {
  return (
    <div className='md:mx-[1.82rem] max-sm:mx-[0.65rem] max-sm:w-[95vw] md:w-[92.5vw] lg:w-[64.5vw] lg:my-3  border-2'>
      <div className='flex items-center gap-x-8'>
        <span className='font-bold text-lg cursor-pointer'>Comments</span>
        <div className='flex items-center gap-1'>
          <BiMenuAltLeft className='text-3xl cursor-pointer' />
          <span className='font-bold cursor-pointer'>Sort by</span>
        </div>
      </div>
    </div>
  )
}

export default CommentsData
