/* eslint-disable no-unused-vars */
import React from 'react'
import { Explore } from '../utils/constants';
import { Premium } from '../utils/constants';
import { Setting } from '../utils/constants';
import { Link } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";


const SideBar = () => {

  return (
    <div className='sticky'>
      <ul className='ml-2 mt-2'>
        <li className='flex items-center gap-5 bg-gray-100 w-52 pl-3 rounded-lg cursor-pointer'>
          <IoMdHome className='w-6 h-10' />
          <span className='font-bold'>Home</span>
        </li>
        <li className='flex items-center gap-5 pl-3 hover:bg-gray-100 hover:rounded-lg hover:w-52 cursor-pointer'>
          <SiYoutubeshorts className='w-6 h-10' />
          Shorts
        </li>
        <li className='flex items-center gap-5 pl-3 hover:bg-gray-100 hover:rounded-lg hover:w-52  cursor-pointer'>
          <MdSubscriptions className='w-6 h-10' />
          Subscriptions
        </li>
      </ul>
      <div className='mt-3 pl-3 w-70'>
        <hr />
      </div>

      <div className='ml-2 my-4'>
        <h1 className='font-bold ml-3 mb-2'>Explore</h1>
        <ul>
          {
            Explore.map(({ icon, name }) => {
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

      <div className='mt-3 pl-3 w-70'>
        <hr />
      </div>

      <div className='ml-2 my-4'>
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

      <div className='mt-3 pl-3 w-70'>
        <hr />
      </div>

      <div className='ml-2 my-4'>
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
  )
}

export default SideBar
