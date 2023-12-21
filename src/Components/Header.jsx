/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiVideoAddLine } from "react-icons/ri";
import YouTubeLogo from '../assets/YouTube_Logo.png'
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';

const Header = () => {
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu())
  }

  return (
    <div className='flex justify-between items-center px-4 py-2 bg-white'>
      <div className='flex'>
        <div className='p-1 hover:bg-gray-200 hover:rounded-full'>
          <FiMenu className='w-10 h-6 cursor-pointer' onClick={() => toggleMenuHandler()} />
        </div>
        <img src={YouTubeLogo} alt="YouTubeLogo" className='w-22 h-8 cursor-pointer' />
      </div>
      <div className='flex w-1/2'>
        <input type="text" placeholder='Search' className='rounded-s-full w-11/12 h-10 px-5 border border-gray-400 items-center' />
        <button className='border border-gray-400 rounded-r-full px-2 bg-neutral-50 hover:bg-gray-100'>
          <IoSearchOutline className='w-10 h-6' />
        </button>
      </div>

      <div className='flex items-center gap-8 text-2xl'>
        <RiVideoAddLine className='hover:cursor-pointer' />
        <div className='relative'>
          <IoNotificationsOutline className='hover:cursor-pointer relative' />
          <span className='absolute bottom-3 left-3 text-xs bg-red-600 rounded-full px-1 text-white'>9+</span>
        </div>
        <FaUserCircle className='hover:cursor-pointer' />
      </div>
    </div>
  )
}

export default Header
