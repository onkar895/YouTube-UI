/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { CHANNEL_INFO_API, YOUTUBE_VIDEO_API } from '../utils/APIList';
import { timeDuration } from '../utils/constants';
import { formatNumberWithSuffix } from '../utils/constants';

const SearchVideoPage = ({ info }) => {

  const [videos, setVideos] = useState([]);

  const [channelPicture, setChannelPicture] = useState('');

  const [channelInfo, setChannelInfo] = useState([])

  const [isHovered, setIsHovered] = useState(false);

  const { snippet } = info;

  const { title, thumbnails, publishedAt, description } = snippet;

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEO_API);

      if (!response.ok) {
        throw new Error(`Failed to fetch videos. Status: ${response.status}`);
      }

      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error while fetching the videos:', error);
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
      console.log(response.items[0])
      setChannelInfo(response?.items[0])
      const profilePictureUrl = response?.items?.[0]?.snippet?.thumbnails?.default?.url || '';
      setChannelPicture(profilePictureUrl);
    } catch (error) {
      console.log("Couldn't fetch channel profile picture", error);
    }
  };

  return (
    <div className='md:flex max-sm:flex-col cursor-pointer lg:w-[90vw] md:w-[84.2vw] max-sm:w-[100%] md:mx-auto md:gap-x-3'>
      <div className='relative'
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}>

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

        <div className='rounded-2xl w-[100%] mx-auto lg:w-[29vw] md:w-[32.4vw] object-cover'>
          <img
            src={thumbnails.medium.url}
            alt="thumbnail"
            className="rounded-2xl w-[94%] mx-auto lg:w-[29vw] md:w-[32.4vw] object-cover"
          />
          <div className="absolute max-sm:bottom-1 max-sm:right-4 lg:bottom-1 lg:right-1 md:bottom-1 md:right-2 bg-black text-white px-2 py-1 rounded-lg text-xs">
            {videos?.contentDetails?.duration}
          </div>
        </div>
      </div>
      <div className='md:flex md:flex-col md:justify-between'>
        <div className=''>
          <h1>{title}</h1>
          <div className='md:flex'>
            <span>{channelInfo?.statistics?.viewCount}</span>
            <span>{channelInfo?.snippet?.publishedAt}</span>
          </div>
        </div>
        <div className='flex'>
          <img src={channelPicture} alt='ChannelProfile' className='rounded-full w-12 max-sm:w-10' />
          <span>{channelInfo?.snippet?.channelTitle}</span>
        </div>
        <div>
          <span>{channelInfo?.snippet?.description}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchVideoPage;