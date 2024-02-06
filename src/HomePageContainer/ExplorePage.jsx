/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../Components/VideoCard';
import VideoShimmer from '../Components/ShimmerUI/VideoShimmer';
import CustomError from '../HomePageContainer/CustomError';
import { NavLink } from 'react-router-dom';
import ButtonList from '../Components/ButtonList';
import { YOUTUBE_VIDEO_API, YOUTUBE_SEARCH_API } from '../utils/APIList';

const ExplorePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setSearchQuery(searchParams.get('sq'));
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery === 'Trending') {
      getVideos(YOUTUBE_VIDEO_API);
    } else if (searchQuery) {
      const searchUrl = `${YOUTUBE_SEARCH_API}&q=${searchQuery}&regionCode=IN&type=video`;
      getVideos(searchUrl);
    }
  }, [searchQuery]);

  const getVideos = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch videos. Status: ${response.status}`);
      }

      const data = await response.json();
      setVideos(data.items);
      setError(null);
    } catch (error) {
      console.error('Error while fetching videos:', error);
      setError('Failed to fetch videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:my-[3.81rem] lg:w-[90.2vw] md:w-[84.2vw] max-sm:w-[100vw] max-sm:my-[4.6rem] max-sm:mx-auto md:mx-24">
      <ButtonList />
      <div className='md:flex md:flex-wrap max-sm:flex max-sm:flex-col lg:gap-x-5 md:gap-x-6 md:gap-y-10 max-sm:gap-y-10 md:mt-20 max-sm:mt-16'>
        {loading ? (
          <VideoShimmer />
        ) : error ? (
          <CustomError message='Unable to fetch the request for now!' />
        ) : (
          videos.map((video) => (
            <NavLink to={`/watch?v=${video.id}`} key={video.id}>
              <VideoCard info={video} videoId={video.id} />
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
