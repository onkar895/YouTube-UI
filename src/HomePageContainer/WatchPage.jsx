/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import ChannelData from './WatchPageData/ChannelData';
import { useSearchParams } from 'react-router-dom'
import CommentsData from './WatchPageData/CommentsData';
import LiveChat from './WatchPageData/LiveChat';

const WatchPage = () => {

  // useSearchParams is used for accessing and manipulating URL parameters.
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className='md:flex md:mt-[4rem] max-sm:mt-[4.8rem]'>
      <div className='md:mx-[1.85rem] max-sm:mx-[0.65rem] max-sm:w-[95vw] md:w-[92.5vw] lg:w-[70vw]'>
        <div>
          <iframe
            className='rounded-2xl max-sm:w-[95vw] max-sm:h-[28vh] md:w-[92.5vw] md:h-[40vh] lg:w-[70vw] lg:h-[81vh] object-cover'
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
        <div className='md:hidden'>
          <LiveChat />
        </div>
        <div>
          <CommentsData />
        </div>
      </div>
      <div className='max-sm:hidden'>
        <LiveChat />
      </div>
    </div>

  );
};

export default WatchPage;