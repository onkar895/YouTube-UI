/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { YOUTUBE_VIDEO_API } from '../utils/APIList';
import VideoCard from '../Components/VideoCard';
import VideoShimmer from './ShimmerUI/VideoShimmer';
import Error from '../HomePageContainer/Error';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEO_API);

      if (!response.ok) {
        throw new Error(`Failed to fetch videos. Status: ${response.status}`);
      }
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error while fetching the videos:', error);
    }
  };

  if (!videos || videos.length === 0) {
    return <Error />
  }

  return (
    <div className='md:flex md:flex-wrap max-sm:flex max-sm:flex-col md:gap-x-4 md:gap-y-10 mt-12'>
      {videos.length === 0 ? (
        <VideoShimmer itemCount={50} />
      ) : (
        videos.map((video) => <VideoCard key={video.id} info={video} />)
      )}
    </div>
  );
};

export default VideoContainer;

