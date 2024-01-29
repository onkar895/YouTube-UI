/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ButtonList from '../Components/ButtonList';
import { YOUTUBE_SEARCH_API } from '../utils/APIList';
import { NavLink, useSearchParams } from 'react-router-dom';
import CustomError from './CustomError'
import SearchVideoPage from '../Components/SearchVideoPage';

const SearchResults = () => {
  const [searchParam] = useSearchParams();
  const searchQuery = searchParam.get('search_query');

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSearchResults();
  }, [searchQuery]);

  const getSearchResults = async () => {
    try {
      if (!searchQuery) return;

      const response = await fetch(
        `${YOUTUBE_SEARCH_API}&q=${searchQuery}&regionCode=IN&type=video`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error('Error while fetching search videos', error);
      setError('Failed to fetch videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="md:mt-[3.5rem] max-sm:mt-[4rem] max-sm:mx-auto">
        <div className='md:mx-24 md:w-full'>
          <ButtonList />
        </div>
        <div className='flex flex-col items-start gap-y-5 py-5'>
          {
            loading ? (
              <h1>Loading....</h1>
            ) : error ? (
              <CustomError message={error} />
            ) : videos.length === 0 ? (
              <CustomError message='Unable to fetch the request for now!' />
            ) : (
              videos.map((video) => (
                <NavLink to={"/watch?v=" + video?.id?.videoId} key={video?.id?.videoId} className='ml-24'>
                  <SearchVideoPage info={video} />
                </NavLink>
              ))
            )
          }
        </div>
      </div>
    </>

  );
};

export default SearchResults;