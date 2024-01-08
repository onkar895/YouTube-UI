/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { LuEye } from "react-icons/lu";
import { MdOutlineThumbUpOffAlt } from "react-icons/md";

const VideoCard = ({ info }) => {
  console.log(info)
  const { snippet, statistics } = info;
  const { title, channelTitle, thumbnails } = snippet;

  return (
    <div className='my-4 py-4 cursor-pointer w-96'>
      <img src={thumbnails.medium.url} alt="thumbnail" className='rounded-lg shadow-2xl w-[28vw]' />
      <ul className='py-3 space-y-1'>
        <div className='font-bold'>
          <li>{title}</li>
        </div>
        <div className='text-gray-500 text-sm'>
          <li>{channelTitle}</li>
          <div className='flex items-center space-x-2'>
            <li>{statistics.viewCount} Views </li>
            <LuEye className='text-gray-600' />
            <li className='text-black'>|</li>
            <li>{statistics.likeCount} Likes </li>
            <MdOutlineThumbUpOffAlt className='text-gray-600' />
          </div>
        </div>
      </ul>
    </div>
  )
}

export default VideoCard
