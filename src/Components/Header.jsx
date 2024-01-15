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
import { AiFillAudio } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


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

  const handleInput = `${showSearch ? 'w-[58vw] py-[7px] bg-gray-100 focus:outline-red-800 transition-all duration-500' : 'max-sm:hidden'} md:w-[36vw] lg:w-[40vw] border border-gray-400 rounded-l-full py-1 pl-3 md:pl-5 focus:outline-red-800 transition-all duration-500`

  // Function to handle the search button click
  const handleSearchButtonClick = () => {
    const screenWidth = window.innerWidth;
    // console.log(`Window inner width: ${screenWidth}`);
    if (screenWidth < 768 && !showSearch) {
      setShowSearch(true);
    }
  };

  return (
    <div className='flex justify-between items-center lg:px-4 md:px-4 px-2 pr-3 py-2 bg-white fixed w-full z-30 '>

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
      <div className={`${showSearch ? 'max-sm:hidden' : ''} flex items-center `}>
        <div className='md:ml-1 max-sm:ml-1 py-2 hover:bg-gray-200 hover:rounded-full'>
          <FiMenu className='w-10 h-6 cursor-pointer text-black' onClick={toggleMenuHandler} />
        </div>
        <img src={YouTubeLogo} alt="YouTubeLogo" className='w-22 h-8 cursor-pointer' onClick={handleClick} />
      </div>

      {/* Search Input */}
      <div className='flex items-center lg:gap-6 md:gap-3 max-sm:mr-5 '>
        <div className='flex'>
          <input
            type="text"
            placeholder='Search'
            className={handleInput}
          />
          <button
            className={`border border-gray-400 ${showSearch ? 'px-3' : 'max-sm:border-none max-sm:rounded-full max-sm:text-2xl max-sm:ml-28'} rounded-r-full md:py-2  md:px-4 flex justify-center items-center md:bg-zinc-100  hover:bg-zinc-200`}
            onClick={handleSearchButtonClick}
          >
            <IoSearchOutline className='md:w-10 h-6' />
          </button>
        </div>
        <div className=' bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full p-[9.5px] max-sm:hidden '>
          <AiFillAudio className='text-xl' />
        </div>
      </div>

      {/* Notification and User Icons */}
      <div className='flex items-center gap-6 text-[22px] md:mr-3'>
        <RiVideoAddLine className='hover:cursor-pointer md:flex hidden text-black' />
        <div className={`${showSearch ? 'max-sm:hidden' : ''} relative`}>
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
