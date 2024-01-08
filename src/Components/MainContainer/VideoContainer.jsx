/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { YOUTUBE_VIDEO_API } from '../../utils/APIList';

const VideoContainer = () => {

  useEffect(() => {
    getVideos();
  }, [])

  const getVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEO_API);
      const data = await response.json()
      console.log(data);
    } catch (error) {
      console.error('Error while fetching the videos:', error);
    }
  };


  return (
    <div>
      <h1>VideoContainer</h1>
    </div>
  )
}

export default VideoContainer 
