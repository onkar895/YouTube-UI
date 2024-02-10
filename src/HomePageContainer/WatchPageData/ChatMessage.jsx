/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FaCircleUser } from "react-icons/fa6";

const ChatMessage = ({ info }) => {
  return (
    <div className='flex items-center gap-3 shadow-md py-2 px-2 cursor-pointer hover:bg-gray-200 border'>
      <img src={info.imgUrl} alt="UserImage" className='w-7 rounded-full' />
      <div className='flex flex-col'>
        <span className='text-sm'>{info.name}</span>
        <span className='text-xs text-gray-500 overflow-x-hidden'>{info.message}</span>
      </div>
    </div>
  )
}

export default ChatMessage
