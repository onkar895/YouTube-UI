/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// SearchVideoPage.jsx
import React, { useState } from 'react';
import { timeDuration } from '../utils/constants';

const SearchVideoPage = ({ info }) => {
  const { snippet, statistics, contentDetails } = info;
  // let duration = timeDuration(contentDetails.duration);
  const { title, channelTitle, thumbnails, channelId, publishedAt, description } = snippet;

  console.log(info)

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='flex cursor-pointer md:w-[100%] lg:w-[100%] max-sm:w-[100%] md:mx-auto'>
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

        <img
          src={thumbnails.medium.url}
          alt="thumbnail"
          className="rounded-2xl w-[94%] mx-auto lg:w-[29vw] md:w-[40.4]"
        />
        <div className="absolute max-sm:bottom-1 max-sm:right-4 lg:bottom-1 lg:right-1 md:bottom-2 md:right-4 bg-black text-white px-2 py-1 rounded-lg text-xs">
          { }
        </div>
      </div>
      <div>
        <div>
          <h1>{title}</h1>
        </div>
      </div>
    </div>

  );
};

export default SearchVideoPage;
