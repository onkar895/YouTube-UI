/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { CHANNEL_INFO_API, VIDEO_DETAILS_API } from '../utils/APIList';
import { timeDuration, formatTime, formatNumberWithSuffix } from '../../utils/constants'

const RelatedVideos = ({ info, videoId }) => {
  const [videos, setVideos] = useState([]);
  const [channelPicture, setChannelPicture] = useState('');
  const [channelInfo, setChannelInfo] = useState([])
  const [isHovered, setIsHovered] = useState(false);
  const { snippet } = info;
  const { title, thumbnails, publishedAt, description, channelTitle } = snippet;

  const viewCount = formatNumberWithSuffix(videos?.statistics?.viewCount);
  let calender = formatTime(publishedAt);
  const duration = timeDuration(videos?.contentDetails?.duration);

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  const fetchVideoData = async () => {
    try {
      const data = await fetch(VIDEO_DETAILS_API + '&id=' + videoId);
      const response = await data.json();
      setVideos(response?.items?.[0] || {});
      // console.log(response?.items?.[0])
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
    } catch (error) {
      console.log("Couldn't fetch channel profile picture", error);
    }
  };

  return (
    <div className="md:flex max-sm:flex-col cursor-pointer lg:w-[30vw] md:w-[92.5vw] max-sm:w-[100%] md:mx-auto md:gap-x-3 " onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}>
      <div className='relative'>
        {
          isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center cursor-pointer justify-center rounded-lg">
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

        <div className='rounded-lg w-[100%] mx-auto lg:w-[18vw] md:w-[32.4vw] object-cover'>
          <img
            src={thumbnails.medium.url}
            alt="thumbnail"
            className="rounded-lg w-[94%] mx-auto lg:w-[18vw] md:w-[32.4vw] max-sm:w-[100%] object-cover"
          />
          <div className="absolute max-sm:bottom-1 max-sm:right-4 lg:bottom-1 lg:right- md:bottom-1 md:right-2 bg-black text-white px-2 py-1 rounded-lg text-xs">
            {duration}
          </div>
        </div>
      </div>
      <div className='md:flex md:flex-col max-sm:flex max-sm:flex-col max-sm:my-2  md:space-y-6 md:my-2 lg:space-y-2 max-sm:space-y-3 lg:my-0 max-sm:mx-2'>
        <div className='text-xs flex flex-col gap-2 lg:gap-1'>
          <h1 className='font-bold'>{title}</h1>
          <div className='flex items-center gap-2'>
            <span className='text-xs'>{channelTitle}</span>
          </div>
          <div className='md:flex max-sm:flex max-sm:gap-2 md:gap-2 text-xs'>
            <span>{viewCount} Views</span>
            <span>{calender}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelatedVideos