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

const ChannelPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [channelData, setChannelData] = useState({});
  const [videos, setVideos] = useState([]);
  const [channelId, setChannelId] = useState('');
  const [channelPicture, setChannelPicture] = useState('');
  const [subscribers, setSubscribers] = useState(0);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setChannelId(searchParams.get('sq'));
    getAllVideos(searchParams.get('sq'));
  }, [searchParams]);

  useEffect(() => {
    if (channelData.snippet?.channelId) {
      fetchChannelData();
    }
  }, [channelData.snippet?.channelId]);

  const getAllVideos = async (channelId) => {
    try {
      const res = await fetchChannelData(channelId);
      if (res) {
        setChannelData({
          ...res?.[0]?.items?.[0]?.snippet,
          ...res?.[0]?.items?.[0]?.statistics,
        });
        setVideos([...res[1].items]);
      }
    } catch (error) {
      console.log("Error fetching videos:", error);
      setError('Unable to fetch videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchChannelData = async () => {
    try {
      const response = await fetch(`${CHANNEL_INFO_API}&id=${channelId}`);
      const data = await response.json();
      const { items } = data;
      const channelSnippet = items?.[0]?.snippet;
      const channelStatistics = items?.[0]?.statistics;
      const profilePictureUrl = channelSnippet?.thumbnails?.default?.url || '';
      const subscribersCount = channelStatistics?.subscriberCount || 0;

      setChannelPicture(profilePictureUrl);
      setSubscribers(subscribersCount);
    } catch (error) {
      console.log("Error fetching channel data:", error);
      setError('Unable to fetch channel data. Please try again later.');
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

export default ChannelPage;
