/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FaCircleUser } from "react-icons/fa6";

const ChatMessage = ({ name, message }) => {
  return (
      <div className='flex items-center gap-3 shadow-md py-3 px-2 cursor-pointer hover:bg-gray-200 border'>
        <FaCircleUser className='text-2xl' />
        <div className='flex flex-col'>
          <span className='text-sm'>{name}</span>
          <span className='text-xs text-gray-500'>{message}...✨</span>
        </div>
      </div>
  )
}

export default ChatMessage
