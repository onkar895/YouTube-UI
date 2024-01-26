/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MdOutlineThumbUpOffAlt, MdOutlineThumbDownOffAlt } from 'react-icons/md';
import { CiBellOn } from 'react-icons/ci';
import { useSearchParams } from 'react-router-dom';
import { CHANNEL_INFO_API, VIDEO_DETAILS_API } from '../utils/APIList';
import { formatNumberWithSuffix } from '../utils/constants';

const WatchPage = () => {
  const [videoData, setVideoData] = useState({});
  const [subscribe, setSubscribe] = useState(false);
  const [channelPicture, setChannelPicture] = useState('');
  const [subScribers, setSubScribers] = useState('')

  // useSearchParams is used for accessing and manipulating URL parameters.
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  const fetchVideoData = async () => {
    try {
      const data = await fetch(VIDEO_DETAILS_API + '&id=' + videoId);
      const response = await data.json();
      setVideoData(response?.items?.[0] || {}); // Ensure items array exists
    } catch (error) {
      console.log('Error while fetching video details', error);
    }
  };

  useEffect(() => {
    if (videoData?.snippet?.channelId) {
      fetchChannelData();
    }
  }, [videoData?.snippet?.channelId]);

  const fetchChannelData = async () => {
    try {
      const data = await fetch(CHANNEL_INFO_API + '&id=' + videoData?.snippet?.channelId);
      const response = await data.json();
      const profilePictureUrl =
        response?.items?.[0]?.snippet?.thumbnails?.default?.url || ''; // Ensure nested properties exist
      const subScribers = response?.items?.[0]?.statistics?.subscriberCount || ''
      setChannelPicture(profilePictureUrl);
      setSubScribers(subScribers)
    } catch (error) {
      console.log("Couldn't fetch channel profile picture", error);
    }
  };

  const subscriberCount = formatNumberWithSuffix(subScribers);
  const likeCount = formatNumberWithSuffix(videoData?.statistics?.likeCount);

  return (
    <div className='md:mx-[1.85rem] md:mt-14 max-sm:mt-[5rem] max-sm:mx-auto max-sm:w-[95vw] md:w-[92.5vw] lg:w-[69.8vw]'>
      <div>
        <iframe
          className='rounded-2xl max-sm:w-[95vw] max-sm:h-[28vh] md:w-[92.5vw] md:h-[40vh] lg:w-[69.7vw] lg:h-[81vh] object-cover'
          src={`${videoSrc}?autoplay=1&mute=0`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <div className='flex flex-col'>
          <div className='font-bold text-lg'>
            <h2> {videoData?.snippet?.title} </h2>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <img src={channelPicture} alt='ChannelProfile' className='rounded-full w-10' />
              <div className='flex flex-col'>
                <span>{videoData?.snippet?.channelTitle}</span>
                <span>{subscriberCount} Subscribers</span>
              </div>
              <button
                className='rounded-full p-2 bg-gray-700 hover:bg-black text-white'
                onClick={() => setSubscribe(!subscribe)} // Toggle subscribe state on each click
              >
                {subscribe ? (
                  <div className='flex items-center gap-1'>
                    <span>Subscribed</span>
                    <CiBellOn className='text-white' />
                  </div>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </div>
            <div className='flex gap-2'>
              <div className='flex gap-1'>
                <li>{likeCount}</li>
                <MdOutlineThumbUpOffAlt className='text-black bg-transparent' />
              </div>
              <div>
                <MdOutlineThumbDownOffAlt className='text-black bg-transparent' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
