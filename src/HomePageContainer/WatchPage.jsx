/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import ChannelData from './WatchPageData/ChannelData';
import { useSearchParams } from 'react-router-dom'
import CommentsData from './WatchPageData/CommentsData';

const WatchPage = () => {

  // useSearchParams is used for accessing and manipulating URL parameters.
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className='md:mx-[1.85rem] md:mt-14 max-sm:mt-[5rem] max-sm:mx-auto max-sm:w-[95vw] md:w-[92.3vw] lg:w-[69.5vw]'>
      <div>
        <iframe
          className='rounded-2xl max-sm:w-[95vw] max-sm:h-[28vh] md:w-[92.3vw] md:h-[40vh] lg:w-[69.5vw] lg:h-[81vh] object-cover'
          src={`${videoSrc}?autoplay=1&mute=0`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <ChannelData videoId={videoId} />
      </div>
      <div>
        <CommentsData />
      </div>
    </div>

  );
};

export default WatchPage;