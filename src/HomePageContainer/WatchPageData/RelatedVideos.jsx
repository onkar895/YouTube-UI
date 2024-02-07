/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { timeDuration, formatTime, formatNumberWithSuffix } from '../../utils/constants'

const RelatedVideos = ({ info }) => {
  const { snippet, contentDetails, statistics } = info;
  const { title, thumbnails, channelTitle, publishedAt } = snippet;
  const [isHovered, setIsHovered] = useState(false);
  const duration = timeDuration(contentDetails.duration);
  const calender = formatTime(publishedAt);
  const viewCount = statistics?.viewCount ? formatNumberWithSuffix(statistics.viewCount) : 0;

  return (
    <div className="md:flex max-sm:flex-col cursor-pointer lg:w-[30vw] md:w-[84.2vw] max-sm:w-[100%] md:mx-auto md:gap-x-3" onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}>
      <div className='relative'>
        {
          isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center cursor-pointer justify-center rounded-lg">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${info?.id}?autoplay=1&mute=1`}
                title={info?.snippet?.title}
                frameBorder="0"
                allowFullScreen
                autoPlay
                className='rounded-2xl'>
              </iframe>
            </div>
          )
        }

        <div className='rounded-lg w-[100%] mx-auto lg:w-[16vw] md:w-[32.4vw] object-cover'>
          <img
            src={thumbnails.medium.url}
            alt="thumbnail"
            className="rounded-lg w-[94%] mx-auto lg:w-[16vw] md:w-[32.4vw] object-cover"
          />
          <div className="absolute max-sm:bottom-1 max-sm:right-4 lg:bottom-1 lg:right- md:bottom-1 md:right-2 bg-black text-white px-2 py-1 rounded-lg text-xs">
            {duration}
          </div>
        </div>
      </div>
      <div className='md:flex md:flex-col md:space-y-8 md:my-2 lg:space-y-3 lg:my-0'>
        <div className='text-xs'>
          <h1 className='font-bold'>{title}</h1>
          <div className='md:flex md:gap-2 text-xs'>
            <span>{viewCount} Views</span>
            <span>{calender}</span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-xs'>{channelTitle}</span>
        </div>
      </div>
    </div>
  );
}

export default RelatedVideos
