/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { RiVideoAddLine } from 'react-icons/ri';
import YouTubeLogo from '../assets/YouTube_Logo.png';
import MyPic from '../assets/MyPic.jpg';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { AiFillAudio } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate()

  function handleClick() {
    navigate("/");
  }

  // Function to toggle the side menu
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className='flex justify-between items-center lg:px-4 md:px-4 max-sm:px-1 max-sm:pr-3 py-[15px] bg-white fixed w-full z-30'>

      {/* Logo and Menu Icon */}
      <div className={`${showSearch ? 'max-sm:hidden' : ''} flex items-center `}>
        <div className='md:ml-1 py-2 hover:bg-gray-200 hover:rounded-full'>
          <FiMenu className='w-10 h-6 cursor-pointer text-black' onClick={toggleMenuHandler} />
        </div>
        <img src={YouTubeLogo} alt="YouTubeLogo" className='w-22 h-8 cursor-pointer' onClick={handleClick} />
      </div>

      {/* SearchBar Component */}
      <div className='flex items-center lg:gap-6 md:gap-3 max-sm:mr-5 '>
        <SearchBar
          showSearch={showSearch}
          setShowSearch={setShowSearch}
        />
        <div className=' bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-full p-[9.5px] max-sm:hidden '>
          <AiFillAudio className='text-xl' />
        </div>
      </div>

      {/* Notification and User Icons */}
      <div className='flex items-center gap-6 text-[22px] lg:mr-3 md:mr-3'>
        <RiVideoAddLine className='hover:cursor-pointer md:flex hidden text-black' />
        <div className={`${showSearch ? 'max-sm:hidden' : ''} relative hover:rounded-full hover:bg:gray-200`}>
          <IoNotificationsOutline className='hover:cursor-pointer relative text-black' />
          <span className='absolute bottom-3 left-3 text-xs bg-red-600 rounded-full px-1 text-white hover:cursor-pointer'>
            9+
          </span>
        </div>
        <div className='w-8 h-9 hover:cursor-pointer'>
          <img className='rounded-full' src={MyPic} alt="Mypic" />
        </div>
      </div>
    </div>
  );
};

export default Header;
