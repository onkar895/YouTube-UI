/* eslint-disable no-unused-vars */
import React from 'react'
import { Explore, Premium, Setting } from '../utils/constants';
import { MdHomeFilled } from "react-icons/md";
import { FaSquareYoutube } from "react-icons/fa6";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'


const SideBar = () => {

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen)

  const SideBarStyle = isMenuOpen
    ? 'fixed shadow-2xl hover:overflow-y-scroll md:w-[32vw] lg:w-[19vw] w-[52vw] h-full bg-white z-20 text-sm hover:overflow-x-hidden top-[55px] transition-shadow duration-500'
    : 'fixed hidden sm:flex md:flex-col text-xs space-y-6 mt-[73px] ml-1'

  // Early return pattern
  if (!isMenuOpen)
    return (
      <div className={SideBarStyle}>
        <div className='hover:bg-gray-100 hover:rounded-lg cursor-pointer flex flex-col items-center gap-1'>
          <NavLink to='/' exact='true' className='flex flex-col items-center'>
            <MdHomeFilled className='w-5 h-7' />
            <span className='font-bold'>Home</span>
          </NavLink>
        </div>
        <div className='hover:bg-gray-100 hover:rounded-lg cursor-pointer flex flex-col items-center gap-1'>
          <SiYoutubeshorts className='w-5 h-8' />
          <span>Shorts</span>
        </div>
        <div className='hover:bg-gray-100 hover:rounded-lg cursor-pointer flex flex-col items-center gap-1'>
          <MdSubscriptions className='w-5 h-8 ' />
          <span>Subscriptions</span>
        </div>
        <div className='hover:bg-gray-100 hover:rounded-lg cursor-pointer flex flex-col items-center gap-1'>
          <FaSquareYoutube className='w-4 h-8 text-black' />
          <span>You</span>
        </div>
      </div>
    );

  return (
    <>
      <div className={SideBarStyle}>
        <ul className='ml-2 md:ml-4 mt-3'>
          <li className=' bg-gray-100 md:w-52 w-[47vw] pl-[13px] rounded-lg'>
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

        <div className='ml-2 md:ml-4 my-4'>
          <h1 className='md:font-bold ml-3 mb-2 md:text-lg text-md font-bold'>Explore</h1>
          <ul>
            {
              Explore.map(({ icon, name }) => {
                return (
                  <div key={name}>
                    <li className='pl-[13px] rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg md:hover:w-52 hover:w-[47vw]'>
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

        <div className='ml-2 md:ml-4 my-4'>
          <h1 className='md:font-bold ml-3 mb-2 md:text-lg text-md font-bold'>More from YouTube</h1>
          <ul>
            {
              Premium.map(({ icon, name }) => {
                return (
                  <div key={name}>
                    <li className='pl-[13px] rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg md:hover:w-52 hover:w-[47vw]'>
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

        <div className='ml-2 md:ml-4 my-4'>
          <ul>
            {
              Setting.map(({ icon, name }) => {
                return (
                  <div key={name}>
                    <li className='pl-[13px] rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg md:hover:w-52 hover:w-[45vw}'>
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
    </>
  )
}

export default SideBar
