/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MdOutlineThumbUpOffAlt } from 'react-icons/md';
import { MdOutlineThumbDownOffAlt } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { CiBellOn } from "react-icons/ci";
import { VIDEO_DETAILS_API } from '../utils/APIList';
import { CHANNEL_PROFILE_API } from '../utils/APIList';
import { formatNumberWithSuffix } from '../utils/constants';

const WatchPage = () => {
  const [videoData, setVideoData] = useState([]);
  const [subscribe, setSubscribe] = useState(false)

  // useSearchParams is used for accessing and manipulating URL parameters.
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  let subscriberCount = 0;
  if (videoData?.statistics?.subscriberCount) {
    subscriberCount = formatNumberWithSuffix(videoData?.statistics.subscriberCount);
  }

  let likeCount = 0;
  if (videoData?.statistics?.likeCount) {
    likeCount = formatNumberWithSuffix(videoData.likeCount);
  }

  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const profilePictureUrl = await CHANNEL_PROFILE_PICTURE(videoData?.snippet?.channelId);
      setProfilePicture(profilePictureUrl);
    };

    fetchProfilePicture();
  }, [videoData?.snippet?.channelId]);

  const CHANNEL_PROFILE_PICTURE = async () => {
    try {
      const data = await fetch(CHANNEL_PROFILE_API + "&id=" + videoData?.snippet?.channelId);
      const response = await data?.json();
      const profilePictureUrl = response?.items[0]?.snippet?.thumbnails?.default?.url;
      return profilePictureUrl;
    } catch (error) {
      console.log("couldn't fetch channel profile picture", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  const fetchVideoData = async () => {
    try {
      const data = await fetch(`${VIDEO_DETAILS_API}&id=${videoId}`);
      const response = await data.json();
      setVideoData(response?.items[0]);
      console.log(videoData);
    } catch (error) {
      console.log("Error while fetching the video details", error);
    }
  };

  return (

    <div className='md:mx-[1.85rem] md:mt-14 max-sm:mt-[5rem] max-sm:mx-auto max-sm:w-[95vw] md:w-[92.5vw] lg:w-[69.8vw]'>
      <div>
        <iframe
          className='rounded-2xl max-sm:w-[95vw] max-sm:h-[28vh] md:w-[92.5vw] md:h-[40vh] lg:w-[69.7vw] lg:h-[81vh] object-cover'
          src={`${videoSrc}?autoplay=1&mute=0`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen>
        </iframe>
      </div>
      <div>
        <div className='flex flex-col'>
          <div className='font-bold text-lg'>
            <h2> {videoData?.snippet?.title} </h2>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <img src={profilePicture} alt="ChannelProfile" className='rounded-full w-10' />
              <div className='flex flex-col'>
                <span>{videoData?.snippet?.channelTitle}</span>
                <span>{subscriberCount} Subscribers</span>
              </div>
              <button
                className='rounded-full p-2 bg-gray-700 hover:bg-black text-white'
                onClick={() => setSubscribe(!subscribe)} // Toggle subscribe state on each click
              >
                {
                  subscribe ? (
                    <div className="flex items-center gap-1">
                      <span>Subscribed</span>
                      <CiBellOn className="text-white" />
                    </div>
                  ) : (
                    <span>Subscribe</span>
                  )
                }
              </button>
            </div>
            <div className='flex gap-2'>
              <div className='flex gap-1'>
                <li>{likeCount} Likes</li>
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
