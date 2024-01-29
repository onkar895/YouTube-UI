/* eslint-disable no-unused-vars */
import React from 'react';
import { Explore, Premium, Setting } from '../utils/constants';
import { MdHomeFilled } from 'react-icons/md';
import { FaSquareYoutube } from 'react-icons/fa6';
import { SiYoutubeshorts } from 'react-icons/si';
import { MdSubscriptions } from 'react-icons/md';
import { CgMenuLeftAlt } from "react-icons/cg";
import YouTubeLogo from '../assets/YouTube_Logo.png';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen)

  const location = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate()

  function handleClick() {
    navigate("/");
  }

  // Function to toggle the side menu
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const SideBarStyle = isMenuOpen
    ? 'sidebar-open fixed left-0 md:w-[32vw] lg:w-[19vw] max-sm:w-[52vw] h-full bg-white z-50 text-sm md:top-0 max-sm:top-0 shadow-gray-700 shadow-2xl transition-shadow duration-300'
    : 'fixed max-sm:hidden md:flex-col text-xs space-y-6 mt-[73px] ml-1';


  // Early return pattern
  // If the menu is closed and the location is '/watch', hide the first sidebar
  if (!isMenuOpen) {
    if (location.pathname === '/watch') {
      return null;
    }

    // Render the first sidebar with four sections when the menu is closed.
    return (
      <div className={SideBarStyle}>
        <div className="hover:bg-gray-100 hover:rounded-lg cursor-pointer flex flex-col items-center gap-1">
          <NavLink to="/" exact="true" className="flex flex-col items-center">
            <MdHomeFilled className="w-5 h-7" />
            <span className="font-bold">Home</span>
          </NavLink>
        </div>
        <div className="hover:bg-gray-100 hover:rounded-lg cursor-pointer flex flex-col items-center gap-1">
          <SiYoutubeshorts className="w-5 h-8" />
          <span>Shorts</span>
        </div>
        <div className="hover:bg-gray-100 hover:rounded-lg cursor-pointer flex flex-col items-center gap-1">
          <MdSubscriptions className="w-5 h-8 " />
          <span>Subscriptions</span>
        </div>
        <div className="hover:bg-gray-100 hover:rounded-lg cursor-pointer flex flex-col items-center gap-1">
          <FaSquareYoutube className="w-4 h-8 text-black" />
          <span>You</span>
        </div>
      </div>
    );
  }

  // If the menu is open, render the toggle sidebar with all sections.
  return (
    <>
      <div className={SideBarStyle}>
        <div className='fixed flex items-center md:w-[32vw] lg:w-[19vw] max-sm:w-[52vw] md:gap-3 bg-white px-[1.35rem] py-[0.91rem] max-sm:[0.55rem] max-sm:px-[0.35rem] max-sm:py-[1.36rem]'>
          <div className='p-1 max-sm:p-1 hover:bg-gray-200 hover:rounded-full'>
            <CgMenuLeftAlt className='text-3xl cursor-pointer text-black' onClick={toggleMenuHandler} />
          </div>
          <img src={YouTubeLogo} alt="YouTubeLogo" className='w-22 h-8 cursor-pointer' onClick={handleClick} />
        </div>
        <div className='mt-[67.5px] block h-screen overflow-y-auto max-sm:mt-[80px] pb-16 sidebar'>
          <ul className='md:ml-4'>
            <li className=' bg-gray-100 md:w-52 w-[50.5vw] pl-[13px] rounded-lg'>
              <NavLink to='/' exact='true' className='flex items-center gap-5'>
                <MdHomeFilled className='w-5 h-10' />
                <span className='font-bold'>Home</span>
              </NavLink>
            </li>
            <li className='flex items-center gap-5 pl-[13px] hover:bg-gray-100 hover:rounded-lg md:hover:w-52 cursor-pointer hover:w[47vw]'>
              <SiYoutubeshorts className='w-5 h-10' />
              Shorts
            </li>
            <li className='flex items-center gap-5 pl-[13px] hover:bg-gray-100 hover:rounded-lg md:hover:w-52  cursor-pointer hover:w[47vw]'>
              <MdSubscriptions className='w-5 h-10' />
              Subscriptions
            </li>
          </ul>

          <div className='mt-3 pl-3 w-56'>
            <hr />
          </div>

          <div className='md:ml-4 my-4'>
            <h1 className='md:font-bold ml-3 mb-2 md:text-lg text-md font-bold'>Explore</h1>
            <ul>
              {
                Explore.map(({ icon, name }) => {
                  return (
                    <div key={name}>
                      <li className='pl-[13px] rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg md:hover:w-52 hover:w-[50.5vw]'>
                        <NavLink className='flex items-center gap-5'>
                          {icon}
                          <span>{name}</span>
                        </NavLink>
                      </li>
                    </div>
                  )
                })
              }
            </ul>
          </div>

          <div className='mt-3 pl-3 w-56'>
            <hr />
          </div>

          <div className='md:ml-4 my-4'>
            <h1 className='md:font-bold ml-3 mb-2 md:text-lg text-md font-bold'>More from YouTube</h1>
            <ul>
              {
                Premium.map(({ icon, name }) => {
                  return (
                    <div key={name}>
                      <li className='pl-[13px] rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg md:hover:w-52 hover:w-[50.5vw]'>
                        <NavLink className='flex items-center gap-5'>
                          <span className='text-red-600'>{icon}</span>
                          <span>{name}</span>
                        </NavLink>
                      </li>
                    </div>
                  )
                })
              }
            </ul>
          </div>

          <div className='mt-3 pl-3 w-56'>
            <hr />
          </div>

          <div className='md:ml-4 my-4'>
            <ul>
              {
                Setting.map(({ icon, name }) => {
                  return (
                    <div key={name}>
                      <li className='pl-[13px] rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg md:hover:w-52 hover:w-[50.5vw}'>
                        <NavLink className='flex items-center gap-5'>
                          {icon}
                          <span>{name}</span>
                        </NavLink>
                      </li>
                    </div>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

