/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// SearchVideoPage.jsx
import React, { useState } from 'react';

const SearchVideoPage = ({ info }) => {
  const { snippet, statistics, contentDetails, id } = info;

  const { title, channelTitle, thumbnails, channelId, publishedAt } = snippet;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='relative'
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}>
      <img
        src={thumbnails.medium.url}
        alt="thumbnail"
        className="rounded-2xl w-[94%] mx-auto lg:w-[29vw] md:w-[40.4]"
      />

      {
        isHovered && (
          // Render the translucent overlay when hovered
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center cursor-pointer justify-center rounded-2xl">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${info.id}?autoplay=1&mute=1`}
              title={info?.snippet?.title}
              frameBorder="0"
              allowFullScreen
              autoPlay
              className='rounded-2xl'>
            </iframe>
          </div>
        )
      }
    </div>
  );
};

export default SearchVideoPage;
