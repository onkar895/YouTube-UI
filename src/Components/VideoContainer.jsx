/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { YOUTUBE_VIDEO_API } from '../utils/APIList';
import VideoCard from '../Components/VideoCard';
import VideoShimmer from './ShimmerUI/VideoShimmer';
import CustomError from '../HomePageContainer/CustomError';
import { NavLink } from 'react-router-dom';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    getVideos();
  }, [pageNumber]); // Fetch videos when page number changes

  useEffect(() => {
    // Cleanup observer on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const getVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${YOUTUBE_VIDEO_API}&pageToken=${pageNumber}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch videos. Status: ${response.status}`);
      }
      const data = await response.json();
      setVideos(prevVideos => [...prevVideos, ...data.items]);
      setHasMore(data.nextPageToken !== undefined);
      setError(null); // Clear error state on successful fetch
    } catch (error) {
      console.error('Error while fetching the videos:', error);
      setError('Failed to fetch videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const lastVideoRef = useRef();
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    if (lastVideoRef.current) {
      observer.current.observe(lastVideoRef.current);
    }

    return () => {
      if (lastVideoRef.current) {
        observer.current.unobserve(lastVideoRef.current);
      }
    };
  }, [hasMore]);

  if (error) {
    return <CustomError message='Unable to fetch the request for now!' />;
  }

  return (
    <div className='md:flex md:flex-wrap max-sm:flex max-sm:flex-col lg:gap-x-5 md:gap-x-6 md:gap-y-10 max-sm:gap-y-10 md:mt-20 max-sm:mt-16'>
      {videos.map((video, index) => {
        if (videos.length === index + 1) {
          return (
            <div ref={lastVideoRef} key={video.id}>
              <NavLink to={`/watch?v=${video.id}`}>
                <VideoCard info={video} />
              </NavLink>
            </div>
          );
        } else {
          return (
            <NavLink to={`/watch?v=${video.id}`} key={video.id}>
              <VideoCard info={video} />
            </NavLink>
          );
        }
      })}
      {loading && <VideoShimmer />}
    </div>
  );
};

export default VideoContainer;
