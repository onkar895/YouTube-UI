/* eslint-disable no-unused-vars */
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const WatchPage = () => {
  // useSearchParams is used for accessing and manipulating URL parameters.
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');

  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className='md:mx-[1.85rem] md:mt-14 max-sm:mt-[5rem] max-sm:mx-auto'>
      <iframe
        className='rounded-lg max-sm:w-[95vw] max-sm:h-[28vh] md:w-[92.5vw] md:h-[40vh] lg:w-[64.3vw] lg:h-[75vh] object-cover'
        src={videoSrc + "?autoplay=1&mute=0"}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default WatchPage;
