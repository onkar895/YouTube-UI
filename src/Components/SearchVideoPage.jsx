/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { CHANNEL_INFO_API } from '../utils/APIList';
import { timeDuration } from '../utils/constants';
import { formatNumberWithSuffix } from '../utils/constants';

const SearchVideoPage = ({ info }) => {

  const [subScribers, setSubScribers] = useState(0)
  const [isHovered, setIsHovered] = useState(false);

  const { snippet, statistics, contentDetails } = info;
  // let duration = timeDuration(contentDetails.duration);
  const { title, channelTitle, thumbnails, channelId, publishedAt, description } = snippet;

  console.log(info)

  const subscriberCount = formatNumberWithSuffix(subScribers);

  useEffect(() => {
    if (info?.snippet?.channelId) {
      fetchChannelData();
    }
  }, [info?.snippet?.channelId]);

  const fetchChannelData = async () => {
    try {
      const data = await fetch(CHANNEL_INFO_API + '&id=' + info?.snippet?.channelId);
      const response = await data.json();
      const subScribers = response?.items?.[0]?.statistics?.subscriberCount || ''
      setSubScribers(subScribers)
      console.log(response.items[0])
    } catch (error) {
      console.log("Couldn't fetch channel profile picture", error);
    }
  };

  return (
    <div className='flex cursor-pointer lg:w-[90vw] md:w-[84.2vw] max-sm:w-[100%] md:mx-auto md:gap-x-3 bg-gray-300'>
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

        <div className='rounded-2xl w-[94%] mx-auto lg:w-[29vw] md:w-[40.4vw] object-cover'>
          <img
            src={thumbnails.medium.url}
            alt="thumbnail"
            className="rounded-2xl w-[94%] mx-auto lg:w-[29vw] md:w-[40.4vw] object-cover"
          />
          <div className="absolute max-sm:bottom-1 max-sm:right-4 lg:bottom-1 lg:right-1 md:bottom-2 md:right-4 bg-black text-white px-2 py-1 rounded-lg text-xs">
            { }
          </div>
        </div>
      </div>
      <div>
        {title}
      </div>
    </div>

  );
};

export default SearchVideoPage;