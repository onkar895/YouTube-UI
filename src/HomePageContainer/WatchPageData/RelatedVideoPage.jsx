/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

import RelatedVideos from './RelatedVideos'
import { NavLink } from 'react-router-dom'
import { YOUTUBE_VIDEO_API } from '../../utils/APIList'

const RelatedVideoPage = () => {

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getRelatedVideos()
  })

  const getRelatedVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEO_API)
      if (!data.ok) {
        throw new Error(`Failed to fetch videos. Status: ${data.status}`);
      }
      const response = await data.json()
      setVideos(response?.items)
      console.log(response?.items)
    } catch (error) {
      console.error('Error while fetching the videos:', error);
    }
  }

  return (
    <div className='md:flex md:flex-col max-sm:flex max-sm:flex-col lg:gap-x-5 md:gap-x-6 max-sm:mt-8 md:gap-y-10 lg:gap-y-6  max-sm:gap-y-10 my-5'>
      {
        videos.map((video) => (
          <NavLink to={`/watch?v=${video.id}`} key={video.id}>
            <RelatedVideos info={video} videoId={video.id} />
          </NavLink>
        ))
      }
    </div>
  )
}

export default RelatedVideoPage
