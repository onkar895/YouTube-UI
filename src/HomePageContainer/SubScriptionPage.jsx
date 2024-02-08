/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { YOUTUBE_SEARCH_API } from '../utils/APIList';
import { NavLink, useSearchParams } from 'react-router-dom';
import CustomError from './CustomError'
import ChannelVideoPage from '../Components/ChannelVideoPage';
import SearchVideoShimmer from '../Components/ShimmerUI/SearchVideoShimmer';
import CategoryList from '../Components/CategoryList';

const SubScriptionPage = () => {
  const [searchParam] = useSearchParams();
  const channel = searchParam.get('Id');
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getSearchResults();
  }, [channel]);

  const getSearchResults = async () => {
    try {
      if (!channel) return;
      const response = await fetch(`${YOUTUBE_SEARCH_API}&q=${channel}&regionCode=IN&type=video`);
      if (!response.ok) {
        throw new Error(`Failed to fetch search results. Status: ${response.status}`);
      }
      const data = await response.json();
      setVideos(data.items || []);
      setError(null);
    } catch (error) {
      console.error('Error while fetching search videos', error);
      setError('Failed to fetch videos. Please try again later.');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 md:my-[3.81rem] lg:w-[90.2vw] md:w-[84.2vw] max-sm:w-[100%] max-sm:my-[4.6rem] max-sm:mx-auto md:mx-24">
        <div>
          <CategoryList />
        </div>
        <div className='md:flex md:flex-col max-sm:flex max-sm:flex-col lg:gap-x-5 md:gap-x-6 max-sm:mt-2 md:gap-y-10 max-sm:gap-y-10'>
          {
            isLoading ? (
              <SearchVideoShimmer />
            ) : error ? (
              <div className=''>
                <CustomError message='Unable to fetch the request for now!' />
              </div>
            ) : (
              videos.map((video) => (
                <NavLink to={"/watch?v=" + video?.id?.videoId} key={video?.id?.videoId}>
                  <ChannelVideoPage info={video} videoId={video?.id?.videoId} />
                </NavLink>
              ))
            )
          }
        </div>
      </div>
    </>
  );
};

export default SubScriptionPage;