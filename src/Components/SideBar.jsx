/* eslint-disable no-unused-vars */
import React from 'react'
import { Explore } from '../utils/constants';
import { Premium } from '../utils/constants';
import { Setting } from '../utils/constants';
import { IoMdHome } from "react-icons/io";
import { FaSquareYoutube } from "react-icons/fa6";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { useSelector } from 'react-redux';


const SideBar = () => {

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen)

  // Early return pattern
  // if (!isMenuOpen) return null;

  return !isMenuOpen
    ?
    <div className='sticky text-xs space-y-6 mt-3'>
      <div className='hover:bg-gray-100 hover:rounded-lg cursor-pointer flex flex-col items-center gap-1'>
        <IoMdHome className='w-5 h-7' />
        <span>Home</span>
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
        <FaSquareYoutube className='w-4 h-8' />
        <span>You</span>
      </div>
    </div>
    : (
      <>
        <div className='sticky shadow-2xl overflow-y-auto h-screen w-1/5'>
          <ul className='ml-3 mt-2'>
            <li className='flex items-center gap-5 bg-gray-100 w-52 pl-3 rounded-lg cursor-pointer'>
              <IoMdHome className='w-5 h-10' />
              <span className='font-bold'>Home</span>
            </li>
            <li className='flex items-center gap-5 pl-3 hover:bg-gray-100 hover:rounded-lg hover:w-52 cursor-pointer'>
              <SiYoutubeshorts className='w-5 h-10' />
              Shorts
            </li>
            <li className='flex items-center gap-5 pl-3 hover:bg-gray-100 hover:rounded-lg hover:w-52  cursor-pointer'>
              <MdSubscriptions className='w-5 h-10' />
              Subscriptions
            </li>
          </ul>
          <div className='mt-3 pl-3 w-56'>
            <hr />
          </div>

          <div className='ml-3 my-4'>
            <h1 className='font-bold ml-3 mb-2'>Explore</h1>
            <ul>
              {
                Explore.map(({ icon, name }) => {
                  return (
                    <a href='#' key={name}>
                      <li className='flex items-center gap-5 pl-3 w-60 rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg hover:w-52'>
                        {icon}
                        <span>{name}</span>
                      </li>
                    </a>
                  )
                })
              }
            </ul>
          </div>

          <div className='mt-3 pl-3 w-60'>
            <hr />
          </div>

          <div className='ml-3 my-4'>
            <h1 className='font-bold ml-3 mb-2'>More from YouTube</h1>
            <ul>
              {
                Premium.map(({ icon, name }) => {
                  return (
                    <a href='#' key={name}>
                      <li className='flex items-center gap-5 pl-3 w-60 rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg hover:w-52 '>
                        {icon}
                        <span>{name}</span>
                      </li>
                    </a>
                  )
                })
              }
            </ul>
          </div>

          <div className='mt-3 pl-3 w-60'>
            <hr />
          </div>

          <div className='ml-3 my-4'>
            <ul>
              {
                Setting.map(({ icon, name }) => {
                  return (
                    <a href='#' key={name}>
                      <li className='flex items-center gap-5 pl-3 w-60 rounded-lg cursor-pointer hover:bg-gray-100 hover:rounded-lg hover:w-52 '>
                        {icon}
                        <span>{name}</span>
                      </li>
                    </a>
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
