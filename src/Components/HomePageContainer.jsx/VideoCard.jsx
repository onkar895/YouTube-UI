/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { LuEye } from 'react-icons/lu';
import { MdOutlineThumbUpOffAlt } from 'react-icons/md';
import { CHANNEL_PROFILE_PICTURE } from '../../utils/APIList';

const VideoCard = ({ info }) => {
  console.log(info)
  const { snippet, statistics } = info;
  const { title, channelTitle, thumbnails, channelId, } = snippet;

  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    async function temp() {
      const profilePicture = await CHANNEL_PROFILE_PICTURE(channelId);
      setProfilePicture(profilePicture);
    }
    temp();
  }, [title]);

  return (
    <>
      <div className='mt-8 cursor-pointer md:w-[40.4vw] lg:w-[28.5vw] max-sm:w-[100vw] md:mx-auto'>
        <img src={thumbnails?.medium.url} alt="thumbnail" className='rounded-2xl w-[90vw] mx-auto lg:w-[28.5vw] md:w-[40.4]' />
        <ul className='pt-3 space-y-1 md:mx-auto mx-[1.2rem]'>
          <div className='flex gap-2 items-center font-bold text-[14.6px]'>
            <img src={profilePicture} alt="ChannelProfile" className='rounded-full w-10' />
            <li>{title}</li>
          </div>
          <div className='text-gray-500 md:text-sm text-xs ml-12'>
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
