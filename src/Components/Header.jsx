/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5';
import { RiVideoAddLine } from 'react-icons/ri';
import { BsArrowLeftShort } from "react-icons/bs";
import YouTubeLogo from '../assets/YouTube_Logo.png';
import MyPic from '../assets/MyPic.jpg';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';



const Header = () => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);

  // Function to toggle the side menu
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  // Function to handle the search input focus
  // const handleSearchFocus = () => {
  //   const screenWidth = window.innerWidth;
  //   if (screenWidth < 768 && !showSearch) {
  //     setShowSearch(true);
  //   }
  // };

  // Function to handle the arrow left button click in the search
  const handleArrowLeftClick = () => {
    setShowSearch(false);
  };

  // Function to handle the search button click
  const handleSearchButtonClick = () => {
    const screenWidth = window.innerWidth;
    console.log(`Window inner width: ${screenWidth}`);
    if (screenWidth < 768 && !showSearch) {
      setShowSearch(true);
    }
  };

  return (
    <div className='flex justify-between items-center md:px-4 px-2 pr-4 py-2 bg-white fixed w-full z-20'>

      {/* Arrow Left In sm Search To Move to normal Screen */}
      {
        showSearch &&
        <div className='flex items-center mx-1'>
          <button onClick={handleArrowLeftClick}>
            <BsArrowLeftShort className='text-4xl' />
          </button>
        </div>
      }

      {/* Logo and Menu Icon */}
      <div className={`${showSearch ? 'max-sm:hidden' : ''} flex items-center`}>
        <div className='p-1 hover:bg-gray-200 rounded-full'>
          <FiMenu className='w-10 h-6 cursor-pointer' onClick={toggleMenuHandler} />
        </div>
        <img src={YouTubeLogo} alt="YouTubeLogo" className='w-22 h-8 cursor-pointer' />
      </div>

      {/* Search Input */}
      <div className='flex max-sm:mr-5'>
        <input
          type="text"
          placeholder='Search'
          className={`${showSearch ? 'w-[60vw] focus:outline-red-600' : 'max-sm:hidden'} md:w-[40vw] border border-gray-400 rounded-l-full py-1 pl-3 md:pl-5`}
        />
        <button
          className={`border border-gray-400 ${showSearch ? '' : 'max-sm:border-none max-sm:rounded-full max-sm:text-2xl max-sm:ml-20'} rounded-r-full md:py-2 px-2 md:px-4 flex justify-center items-center  hover:bg-gray-100`}
          onClick={handleSearchButtonClick}
        >
          <IoSearchOutline className='md:w-10 h-6' />
        </button>
      </div>

      {/* Notification and User Icons */}
      <div className='flex items-center gap-8 text-2xl md:mr-3'>
        <RiVideoAddLine className='hover:cursor-pointer md:flex hidden' />
        <div className={`${showSearch ? 'max-sm:hidden' : ''} relative`}>
          <IoNotificationsOutline className='hover:cursor-pointer relative' />
          <span className='absolute bottom-3 left-3 text-xs bg-red-600 rounded-full px-1 text-white hover:cursor-pointer'>
            9+
          </span>
        </div>
        <div className='w-7 hover:cursor-pointer'>
          <img className='rounded-full' src={MyPic} alt="Mypic" />
        </div>
      </div>
    </div>
  );
};

export default Header;
