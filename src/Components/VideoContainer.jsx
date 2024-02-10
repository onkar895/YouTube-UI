/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { YOUTUBE_VIDEO_API, YOUTUBE_SEARCHCATEGORY_API } from '../utils/APIList';
import VideoCard from '../Components/VideoCard';
import VideoShimmer from './ShimmerUI/VideoShimmer';
import CustomError from '../HomePageContainer/CustomError';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const category = useSelector((store) => store.videoCategory.category);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (category === 'All') {
      getVideos();
    } else {
      fetchVideosByCategory(category)
    }
  }, [category]);

  const fetchVideosByCategory = async (keyword, videoId) => {
    try {
      const response = await fetch(`${YOUTUBE_SEARCHCATEGORY_API}&q=${(keyword)}&videoCategoryId=${(videoId)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      console.log(data.items)
      setVideos(data.items)
      setError(null);
    } catch (error) {
      console.error('Error while fetching the videos:', error);
      setError('Failed to fetch videos. Please try again later.');
      setLoading(false);
    }
  };

  const getVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEO_API);
      if (!response.ok) {
        throw new Error(`Failed to fetch videos. Status: ${response.status}`);
      }
      const data = await response.json();
      setVideos(data.items);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error('Error while fetching the videos:', error);
      setError('Failed to fetch videos. Please try again later.');
      setLoading(false);
    }
  };

  if (error) {
    return <CustomError message='Unable to fetch the request for now!' />;
  }

  return (
    <div className='md:flex md:flex-wrap max-sm:flex max-sm:flex-col lg:gap-x-5 md:gap-x-6 md:gap-y-10 max-sm:gap-y-10 md:mt-20 max-sm:mt-16'>
      {loading ? (
        <VideoShimmer />
      ) : (
        videos.map((video) => (
          <NavLink to={`/watch?v=${video.id}`} key={video.id}>
            <VideoCard info={video} videoId={video.id} />
          </NavLink>
        ))
      )}
    </div>
  );
};

export default VideoContainer;
