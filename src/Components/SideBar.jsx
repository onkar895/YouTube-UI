/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Explore, Premium, Setting, Home, Subscriptions } from '../utils/constants';
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
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen)

  const [searchParams] = useSearchParams();
  const [selectedButton, setSelectedButton] = useState("Home");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate()

  useEffect(() => {
    const Query = searchParams.get("sq");
    if (Query) {
      setSelectedButton(Query);
    } else {
      setSelectedButton("Home");
    }
  }, [])

  function handleClick() {
    navigate("/");
  }

  const StopLoading = () => {
    setTimeout(() => {
      // Close sidebar after 1000ms
      dispatch(toggleMenu());
      setIsLoading(false); // Stop loading
    }, 1000);
  }

  const handleButtonClick = () => {
    setIsLoading(true); // Start loading
    StopLoading()       // Stop Loading and Close sidebar after 1000ms 
  };

  // Function to toggle the side menu
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const SideBarStyle = isMenuOpen
    ? ' sidebar-open fixed left-0 md:w-[30vw] lg:w-[19vw] max-sm:w-[60vw] h-full bg-white z-50 text-sm md:top-0 max-sm:top-0 shadow-gray-700 shadow-2xl transition-shadow duration-300'
    : 'fixed max-sm:hidden md:flex-col text-xs space-y-6 mt-[73px] ml-1'

  // Early return pattern
  // If the menu is closed and the location is '/watch', hide the first sidebar
  if (!isMenuOpen) {
    if (location.pathname === '/watch') {
      return null;
    }

    // Render the first sidebar with four sections when the menu is closed.
    return (
      <div className={SideBarStyle}>
        <div className="hover:bg-gray-100 hover:rounded-lg cursor-pointer flex flex-col items-center gap-1" >
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
        <div className='fixed flex items-center md:w-[30vw] lg:w-[19vw] max-sm:w-[60vw] md:gap-3 max-sm:gap-1 bg-white px-[1.35rem] md:h-[3.8rem] max-sm:px-[0.35rem] max-sm:h-[4.6rem]'>
          <div className='md:p-1 md:mt-[0.1rem] max-sm:p-1 hover:bg-gray-200 hover:rounded-full'>
            <CgMenuLeftAlt className='text-3xl cursor-pointer text-black' onClick={toggleMenuHandler} />
          </div>
          <img src={YouTubeLogo} alt="YouTubeLogo" className='w-22 h-8 cursor-pointer' onClick={handleClick} />
        </div>
        <div className='mt-[67.5px] block h-screen overflow-y-auto max-sm:mt-[74px] pb-16 sidebar'>
          <ul className='md:ml-4'>
            {
              Home.map(({ icon, name }) => {
                return (
                  <div key={name}>
                    <NavLink to={name === "Home" ? '/' : `/explore?sq=${name}`}>
                      <li className={`pl-[13px] rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg lg:hover:w-[16.2vw] md:hover:w-[25.5vw] hover:w-[58.5vw] ${selectedButton === name ? 'bg-gray-100 lg:w-[16.2vw] md:w-[25.5vw] max-sm:w-[58.5vw]' : ''}`} onClick={handleButtonClick}>
                        <button className='flex items-center gap-5' >
                          {icon}
                          <span>{name}</span>
                        </button>
                      </li>
                    </NavLink>
                  </div>
                )
              })
            }
          </ul>

          <div className='mt-3 pl-3 w-56'>
            <hr />
          </div>

          <div className='md:ml-4 my-4'>
            <h1 className='md:font-bold ml-3 mb-2 md:text-lg text-md font-bold'>SubScriptions</h1>
            <ul>
              {
                Subscriptions.map(({ src, profileId, fullname }) => {
                  return (
                    <div key={profileId}>
                      <NavLink to={`/channel?Id=${profileId}`}>
                        <li className={`py-[10px] pl-[13px] rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg lg:hover:w-[16.2vw] md:hover:w-[25.5vw] hover:w-[58.5vw] ${selectedButton === fullname ? 'bg-gray-100 lg:w-[16.2vw] md:w-[25.5vw] max-sm:w-[58.5vw]' : ''}`} onClick={handleButtonClick}>
                          <div className='flex items-center gap-5' >
                            <img src={src} alt="" className="rounded-full w-5"
                            />
                            <span className="">{fullname}</span>
                          </div>
                        </li>
                      </NavLink>
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
            <h1 className='md:font-bold ml-3 mb-2 md:text-lg text-md font-bold'>Explore</h1>
            <ul>
              {
                Explore.map(({ icon, name }) => {
                  return (
                    <div key={name}>
                      <NavLink to={`/explore?sq=${name}`}>
                        <li className={`pl-[13px] rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg lg:hover:w-[16.2vw] md:hover:w-[25.5vw] hover:w-[58.5vw] ${selectedButton === name ? 'bg-gray-100 lg:w-[16.2vw] md:w-[25.5vw] max-sm:w-[58.5vw]' : ''}`} onClick={handleButtonClick}>
                          <button className='flex items-center gap-5' >
                            {icon}
                            <span>{name}</span>
                          </button>
                        </li>
                      </NavLink>
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
                      <NavLink to={`/explore?sq=${name}`}>
                        <li className={`pl-[13px] rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg lg:hover:w-[16.2vw] md:hover:w-[25.5vw]  hover:w-[58.5vw] ${selectedButton === name ? 'bg-gray-100 lg:w-[16.2vw] md:w-[25.5vw] max-sm:w-[58.5vw]' : ''}`} onClick={handleButtonClick}>
                          <button className='flex items-center gap-5'>
                            <span className='text-red-600'>{icon}</span>
                            <span>{name}</span>
                          </button>
                        </li>
                      </NavLink>
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
                      <li className='pl-[13px] rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg lg:hover:w-[16.2vw] md:hover:w-[25.5vw]  hover:w-[58.5vw}'>
                        <button className='flex items-center gap-5'>
                          {icon}
                          <span>{name}</span>
                        </button>
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