/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { YOUTUBE_VIDEO_API } from '../utils/APIList';
import VideoCard from '../Components/VideoCard';
import VideoShimmer from './ShimmerUI/VideoShimmer';
import CustomError from '../HomePageContainer/CustomError';
import { NavLink } from 'react-router-dom';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError('Failed to fetch videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <CustomError message='Unable to fetch the request for now!' />;
  }

  return (
    <>
      <div className='md:flex md:flex-wrap max-sm:flex max-sm:flex-col md:gap-x-4 md:gap-y-10 max-sm:gap-y-10 md:mt-[4.8rem] max-sm:mt-[5rem] w-full'>
        {/* {
        videos[0] && <RedBorderedVideoCard info={videos[0]} />
      } */}
        {loading ? (
          <VideoShimmer />
        ) : (
          videos.map((video) => (
            <NavLink to={'/watch?v=' + video.id} key={video.id}>
              <VideoCard info={video} videoId={video.id} />
            </NavLink>
          ))
        )}
      </div>
    </>
  );
};

export default VideoContainer;
