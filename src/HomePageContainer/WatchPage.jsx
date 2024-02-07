/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react';
import ChannelData from './WatchPageData/ChannelData';
import { useSearchParams } from 'react-router-dom'
import CommentsData from './WatchPageData/CommentsData';
import LiveChat from './WatchPageData/LiveChat';
import RelatedVideoPage from './WatchPageData/RelatedVideoPage';

const WatchPage = () => {

  const [container, setContainer] = useState(true)
  // useSearchParams is used for accessing and manipulating URL parameters.
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const videoSrc = useMemo(() => `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`, [videoId]);

  return (
    <div>
      <div className={`${container ? "lg:flex" : "md:flex max-sm:flex-col"} md:gap-4 md:mt-[4rem] max-sm:mt-[4.8rem] space-y-5 lg:space-y-0`}>
        <div className='md:flex md:flex-col md:ml-[1.82rem] max-sm:mx-[0.65rem] max-sm:w-[95vw] md:w-[92.5vw] lg:w-[64.5vw]'>
          <div>
            <iframe
              className='rounded-2xl max-sm:w-[95vw] max-sm:h-[28vh] md:w-[92.5vw] md:h-[40vh] lg:w-[64.5vw] lg:h-[81vh] object-cover'
              src={videoSrc}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
          </div>
          <div>
            <ChannelData videoId={videoId} />
          </div>
        </div>
        {/* For small and Medium sizes screens */}
        <div className='md:ml-7 lg:ml-0 max-sm:mx-[0.65rem]'>
          <LiveChat />
          <RelatedVideoPage />
        </div>
        {/* For large sizes screens */}
        {/* <div className='md:hidden max-sm:hidden lg:block'>
        <LiveChat />
        <RelatedVideoPage />
      </div> */}
      </div>
      <div>
        <CommentsData />
      </div>
    </div>

  );
};

export default WatchPage;