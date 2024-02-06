/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../Components/VideoCard';
import VideoShimmer from '../Components/ShimmerUI/VideoShimmer';
import CustomError from '../HomePageContainer/CustomError';
import { NavLink } from 'react-router-dom';
import ButtonList from '../Components/ButtonList';
import { CHANNEL_INFO_API } from '../utils/APIList';

const SubScriptionPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const shimmerTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(shimmerTimer);
  }, []);

  useEffect(() => {
    // Fetch videos only if searchParams contain a valid channel Id
    if (searchParams.has('Id')) {
      fetchVideos();
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const channelId = searchParams.get('Id');
      const channelData = await fetchChannelData(channelId);
      if (channelData) {
        const { snippet, statistics, nextPageToken } = channelData;
        setVideos([...channelData.videos]);
        setNextPageToken(nextPageToken);
        setLoading(false);
      } else {
        setError('Unable to fetch channel data. Please try again later.');
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError('Unable to fetch videos. Please try again later.');
      setLoading(false);
    }
  };

  const fetchChannelData = async (channelId) => {
    try {
      const response = await fetch(`${CHANNEL_INFO_API}&id=${channelId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch channel data. Status: ${response.status}`);
      }
      const data = await response.json();
      const { items } = data;
      const channelSnippet = items?.[0]?.snippet;
      const channelStatistics = items?.[0]?.statistics;
      const profilePictureUrl = channelSnippet?.thumbnails?.default?.url || '';
      const subscribersCount = channelStatistics?.subscriberCount || 0;
      const nextPageToken = null; // Assuming nextPageToken is not used here

      return {
        snippet: channelSnippet,
        statistics: channelStatistics,
        profilePictureUrl: profilePictureUrl,
        subscribersCount: subscribersCount,
        nextPageToken: nextPageToken,
        videos: [] // Placeholder for videos
      };
    } catch (error) {
      console.error("Error fetching channel data:", error);
      return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 md:my-[3.81rem] lg:w-[90.2vw] md:w-[84.2vw] max-sm:w-[100vw] max-sm:my-[4.6rem] max-sm:mx-auto md:mx-24">
      <ButtonList />
      <div className='md:flex md:flex-wrap max-sm:flex max-sm:flex-col lg:gap-x-5 md:gap-x-6 md:gap-y-10 max-sm:gap-y-10 md:mt-20 max-sm:mt-16'>
        {loading ? (
          <VideoShimmer />
        ) : error ? (
          <CustomError message='Unable to fetch data. Please try again later.' />
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

export default SubScriptionPage;
