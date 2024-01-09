/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { LuEye } from 'react-icons/lu';
import { MdOutlineThumbUpOffAlt } from 'react-icons/md';

const VideoCard = ({ info }) => {
  console.log(info)
  const { snippet, statistics } = info;
  const { title, channelTitle, thumbnails } = snippet;

  return (
    <>
      <div className='mt-6 cursor-pointer md:w-[40.4vw] lg:w-[28.5vw] max-sm:w-[100vw] md:mx-auto'>
        <img src={thumbnails?.medium.url} alt="thumbnail" className='rounded-2xl w-[90vw] mx-auto lg:w-[28.5vw] md:w-[40.4]' />
        <ul className='pt-3 space-y-1 md:mx-auto mx-[1.2rem]'>
          <div className='font-bold text-[14.6px]'>
            <li>{title}</li>
          </div>
          <div className='text-gray-500 text-sm'>
            <li>{channelTitle}</li>
            <div className='flex items-center space-x-2'>
              <li>{statistics?.viewCount} Views</li>
              <LuEye className='text-gray-600' />
              <li className='text-black'>|</li>
              <li>{statistics?.likeCount} Likes</li>
              <MdOutlineThumbUpOffAlt className='text-gray-600' />
            </div>
          </div>
        </ul>
      </div>
      <div className='mt-6 cursor-pointer md:w-[40.4vw] lg:w-[28.5vw] max-sm:w-[100vw] md:mx-auto'>
        <img src={thumbnails?.medium.url} alt="thumbnail" className='rounded-lg w-[90vw] mx-auto lg:w-[28.5vw] md:w-[40.4]' />
        <ul className='pt-3 space-y-1 md:mx-auto mx-[1.2rem]'>
          <div className='font-bold text-[14.6px]'>
            <li>{title}</li>
          </div>
          <div className='text-gray-500 text-sm'>
            <li>{channelTitle}</li>
            <div className='flex items-center space-x-2'>
              <li>{statistics?.viewCount} Views</li>
              <LuEye className='text-gray-600' />
              <li className='text-black'>|</li>
              <li>{statistics?.likeCount} Likes</li>
              <MdOutlineThumbUpOffAlt className='text-gray-600' />
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};

export default VideoCard;
