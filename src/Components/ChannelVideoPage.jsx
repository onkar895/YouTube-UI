/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { CHANNEL_INFO_API, VIDEO_DETAILS_API } from '../utils/APIList';
import { CiBellOn } from 'react-icons/ci'
import { HiOutlineChevronDown } from 'react-icons/hi2'
import { formatTime, formatNumberWithSuffix, timeDuration } from '../utils/constants';

const ChannelVideoPage = ({ info, videoId }) => {

  const [videos, setVideos] = useState([]);
  const [channelPicture, setChannelPicture] = useState([]);
  const [channelInfo, setChannelInfo] = useState([])
  const [subScribers, setSubScribers] = useState(0)
  const [subscribe, setSubscribe] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { snippet } = info;
  const { title, thumbnails, publishedAt, description, channelTitle } = snippet;

  const subscriberCount = formatNumberWithSuffix(subScribers);
  const viewCount = formatNumberWithSuffix(videos?.statistics?.viewCount);
  let calender = formatTime(publishedAt);
  const duration = timeDuration(videos?.contentDetails?.duration);

  const RemoveSpaces = channelTitle.replace(/ /g, "")

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  const fetchVideoData = async () => {
    try {
      const data = await fetch(VIDEO_DETAILS_API + '&id=' + videoId);
      const response = await data.json();
      setVideos(response?.items?.[0] || {});
      console.log(response?.items?.[0])
    } catch (error) {
      console.log('Error while fetching video details', error);
    }
  };

  useEffect(() => {
    if (info?.snippet?.channelId) {
      fetchChannelData();
    }
  }, [info?.snippet?.channelId]);

  const fetchChannelData = async () => {
    try {
      const data = await fetch(CHANNEL_INFO_API + '&id=' + info?.snippet?.channelId);
      const response = await data.json();
      setChannelInfo(response?.items[0])
      const profilePictureUrl = response?.items?.[0]?.snippet?.thumbnails?.default?.url || '';
      setChannelPicture(profilePictureUrl);
      const subScribers = response?.items?.[0]?.statistics?.subscriberCount || ''
      setSubScribers(subScribers)
    } catch (error) {
      console.log("Couldn't fetch channel profile picture", error);
    }
  };

  return (
    <>
      <div className='flex items-center md:gap-3 max-sm:gap-2 md:w-[52vw] max-sm:w-[100%]'>
        <div className='flex flex-col gap-2 max-sm:gap-1'>
          <div>
            <img src={channelPicture} alt='ChannelProfile' className='rounded-full md:w-24 max-sm:w-14' />
          </div>
          <div>
            <span className='md:text-xl max-sm:lg font-bold'>{channelTitle}</span>
            <div className='text-sm text-gray-500'>
              <span className='text-sm'>@{RemoveSpaces}</span>
              <span>{subscriberCount} subscribers</span>
            </div>
            <span className='text-sm'>{description}</span>
            <button className='rounded-full'
              onClick={() => setSubscribe(!subscribe)}
            >
              {subscribe ? (
                <div className='flex items-center gap-1 max-sm:gap-2 py-[5px] max-sm:py-[7px] px-2 max-sm:px-5 bg-gray-100 rounded-full'>
                  <CiBellOn className='text-black text-2xl animate-pulse' />
                  <span className='max-sm:hidden text-sm'>Subscribed</span>
                  <HiOutlineChevronDown className='text-black text-xl ' />
                </div>
              ) : (
                <div className='flex py-[7px] max-sm:py-[8px] px-5 bg-black text-white rounded-full'>
                  <span className='max-sm:text-sm text-sm'>Subscribe</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className='cursor-pointer md:w-[40.4vw] lg:w-[29vw] max-sm:w-[100%]' onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}>
        <div className='relative'>
          {
            isHovered && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center cursor-pointer justify-center rounded-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${info?.id?.videoId}?autoplay=1&mute=1`}
                  title={info?.snippet?.title}
                  frameBorder="0"
                  allowFullScreen
                  autoPlay
                  className='rounded-2xl'>
                </iframe>
              </div>
            )
          }
          <img
            src={thumbnails.medium.url}
            alt="thumbnail"
            className="rounded-2xl w-[94%] mx-auto lg:w-[29vw] md:w-[40.4vw] object-cover"
          />
          <div className="absolute max-sm:bottom-1 max-sm:right-4 lg:bottom-1 lg:right-1 md:bottom-1 md:right-4 bg-black text-white px-2 py-1 rounded-lg text-xs">
            {duration}
          </div>
        </div>
        <div className='pt-3 space-y-1 max-sm:text-justify md:mx-auto mx-[1.2rem] md:text-justify'>
          <div className='md:flex md:flex-col gap-3 max-sm:flex'>
            <h1 className='font-bold mr-2 overflow-hidden text-[14.6px]'>{title}</h1>
            <div className='flex items-center gap-2'>
              <img src={channelPicture} alt='ChannelProfile' className='rounded-full w-10' />
              <span className='text-sm'>{channelTitle}</span>
            </div>
            <div className='md:flex md:gap-1 max-sm:flex max-sm:gap-1 text-sm'>
              <span>{viewCount} Views</span>
              <span >•</span>
              <span>{calender}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelVideoPage;