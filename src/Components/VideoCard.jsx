/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { LuEye } from 'react-icons/lu';
import { MdOutlineThumbUpOffAlt } from 'react-icons/md';
import { CHANNEL_PROFILE_PICTURE } from '../utils/APIList'
import { timeDuration } from '../utils/constants';
import { formatTime } from '../utils/constants';
import { formatNumberWithSuffix } from '../utils/constants';
import VideoShimmer from './ShimmerUI/VideoShimmer';

const VideoCard = ({ info }) => {
  const { snippet, statistics, contentDetails } = info;
  let duration = timeDuration(contentDetails.duration);
  // console.log(contentDetails.duration)
  const { title, channelTitle, thumbnails, channelId, publishedAt } = snippet;
  let days = formatTime(publishedAt);

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
    <div className='cursor-pointer md:w-[40.4vw] lg:w-[29vw] max-sm:w-[100%] md:mx-auto hover:scale-95 hover:transition-all duration-500'>
      <div
        className='relative'
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          src={thumbnails?.medium.url} alt="thumbnail"
          className='rounded-2xl w-[94%] mx-auto lg:w-[29vw] md:w-[40.4]'
        />
        <div className="absolute max-sm:bottom-1 max-sm:right-6 lg:bottom-1 lg:right-1 md:bottom-2 md:right-4 bg-black text-white px-2 py-1 rounded-lg text-xs">
          {duration}
        </div>

        {
          isHovered && (
            // Render the YouTube video iframe when hovered
            <div className={`absolute top-0 left-0 w-full h-full ${isHovered ? '' : 'hidden'}`}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${info.id}?autoplay=1&mute=1`}
                title={info.snippet.title}
                frameBorder="0"
                allowFullScreen
                autoPlay
                className="rounded-2xl"
              ></iframe>
            </div>
          )
        }

      </div>
      <ul className='pt-3 space-y-2 max-sm:text-justify md:mx-auto mx-[1.2rem] md:text-justify'>
        <div className='flex gap-2 items-center font-bold text-[14.6px] '>
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
              <MdOutlineThumbUpOffAlt className='text-gray-600' />
            </div>
          </div>
          <div className='flex items-center justify-between mr-2'>
            <div className='flex items-center space-x-1'>
              <li>{viewCount} Views</li>
              <LuEye className='text-gray-600' />
            </div>
            <div className='text-black'>
              {days > 30 ? (
                Math.ceil(days / 30.44) === 1 ? (
                  <span>{Math.ceil(days / 30.44)} Month ago</span>
                ) : (
                  <span>{Math.ceil(days / 30.44)} Months ago</span>
                )
              ) : Math.ceil(days) === 1 ? (
                <span>{Math.ceil(days)} day ago</span>
              ) : (
                <span>{Math.ceil(days)} days ago</span>
              )}
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
