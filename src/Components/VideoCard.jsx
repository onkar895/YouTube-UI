/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { LuEye } from 'react-icons/lu';
import { BiLike } from "react-icons/bi";
import { timeDuration } from '../utils/constants';
import { CHANNEL_INFO_API } from '../utils/APIList';
import { formatTime } from '../utils/constants';
import { formatNumberWithSuffix } from '../utils/constants';
import VideoShimmer from './ShimmerUI/VideoShimmer';

const VideoCard = ({ info }) => {
  const { snippet, statistics, contentDetails } = info;
  let duration = timeDuration(contentDetails.duration);
  // console.log(contentDetails.duration)
  const { title, channelTitle, thumbnails, channelId, publishedAt } = snippet;
  let calender = formatTime(publishedAt);

  const [isHovered, setIsHovered] = useState(false);

  let viewCount = 0;
  if (info?.statistics?.viewCount) {
    viewCount = formatNumberWithSuffix(statistics.viewCount);
  }

  let likeCount = 0;
  if (info?.statistics?.likeCount) {
    likeCount = formatNumberWithSuffix(statistics.likeCount);
  }

  const [profilePicture, setProfilePicture] = useState("");

  const CHANNEL_PROFILE_PICTURE = async () => {
    try {
      const data = await fetch(CHANNEL_INFO_API + "&id=" + channelId);
      const response = await data?.json();
      const profilePictureUrl = response?.items[0]?.snippet?.thumbnails?.default?.url;
      return profilePictureUrl;
    } catch (error) {
      console.log("couldn't fetch channel profile picture", error);
    }
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const profilePictureUrl = await CHANNEL_PROFILE_PICTURE(channelId);
      setProfilePicture(profilePictureUrl);
    };

    fetchProfilePicture();
  }, [channelId]);


  if (!info) return (
    <VideoShimmer />
  )

  return (
    <div className='cursor-pointer md:w-[40.4vw] lg:w-[29vw] max-sm:w-[100%]'>
      <div
        className='relative'
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {
          isHovered && (
            // Render the translucent overlay when hovered
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center cursor-pointer justify-center rounded-2xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${info.id}?autoplay=1&mute=1`}
                title={info.snippet.title}
                frameBorder="0"
                allowFullScreen
                autoPlay
                className='rounded-2xl'>
              </iframe>
            </div>
          )
        }
        <img
          src={thumbnails?.medium.url} alt="thumbnail"
          className='rounded-2xl w-[94%] mx-auto lg:w-[29vw] md:w-[40.4vw]'
        />
        <div className="absolute max-sm:bottom-1 max-sm:right-4 lg:bottom-1 lg:right-1 md:bottom-2 md:right-4 bg-black text-white px-2 py-1 rounded-lg text-xs">
          {duration}
        </div>
      </div>
      <ul className='pt-3 space-y-1 max-sm:text-justify md:mx-auto mx-[1.2rem] md:text-justify'>
        <div className='flex gap-2 items-center font-bold text-[14.6px]'>
          <img src={profilePicture} alt="ChannelProfile" className='rounded-full w-10' />
          <li className='mr-2 overflow-hidden'>{title}...</li>
        </div>
        <div className='text-gray-500 md:text-sm text-xs ml-12 tracking-wider space-y-1'>
          <div className='flex items-center justify-between mr-2'>
            <div>
              <li>{channelTitle}</li>
            </div>
            <div className='flex items-center space-x-1'>
              <li>{likeCount} Likes</li>
              <BiLike className='text-gray-600' />
            </div>
          </div>
          <div className='flex items-center justify-between mr-2'>
            <div className='flex items-center space-x-1'>
              <li>{viewCount} Views</li>
              <LuEye className='text-gray-600' />
            </div>
            <div className='text-black'>
              {calender}
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

// Higher Order Component :
// export const RedBorderedVideoCard = ({ info }) => {
//   return (
//     <div className='border border-red-800 p-1 m-1'>
//       <VideoCard info={info} />
//     </div>
//   )
// }

export default VideoCard;