/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";

const SideBar = () => {
  return (
    <div>
      <ul className='ml-2 mt-2'>
        <li className='flex items-center gap-5 bg-gray-200 w-60 pl-3 rounded-lg cursor-pointer'>
          <IoMdHome className='w-6 h-10' />
          Home
        </li>
        <li className='flex items-center gap-5 pl-3 hover:bg-gray-200 hover:rounded-lg cursor-pointer'>
          <SiYoutubeshorts className='w-6 h-10' />
          Shorts
        </li>
        <li className='flex items-center gap-5 pl-3 hover:bg-gray-200 hover:rounded-lg cursor-pointer'>
          <MdSubscriptions className='w-6 h-10' />
          Subscriptions
        </li>
      </ul>
    </div>
  )
}

export default SideBar
