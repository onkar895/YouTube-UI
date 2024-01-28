/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ButtonList from '../Components/ButtonList';
import { YOUTUBE_SEARCH_API } from '../utils/APIList';
import { useSearchParams } from 'react-router-dom';
import SearchErrorPage from './SearchErrorPage';
import SearchVideoPage from '../Components/SearchVideoPage';

const SearchResults = () => {
  const [searchParam] = useSearchParams();
  const searchQuery = searchParam.get('search_query');

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    getSearchResults();
  }, [searchQuery]);

  return (
    <div className="flex flex-col max-sm:mx-auto">
      <ButtonList />
      <div className="md:mt-20 md:mx-24 max-sm:mt-2">
        <div className='flex flex-col items-start gap-y-5'>
          {
            loading ? (
              <h1>Loading....</h1>
            ) : videos.length === 0 ? (
              <SearchErrorPage />
            ) : (
              videos.map((video) => (
                <SearchVideoPage key={video.id.videoId} info={video} />
              ))
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
