/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEO_API } from '../utils/APIList'
import VideoCard from '../Components/VideoCard'

const VideoContainer = () => {

  const [videos, setVideos] = useState([])

  useEffect(() => {
    getVideos();
  }, [])

  const getVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEO_API);

      if (!response.ok) {
        throw new Error(`Failed to fetch videos. Status: ${response.status}`);
      }
      // If the response is successful, it parses the JSON content of the response and updates the videos state with the received data. 
      const data = await response.json();
      // console.log(data.items);
      setVideos(data.items)
      // When you call setVideos(data.items), React will re-render the component with the new value of videos.
      // That means, when the state of a component changes (in this case, when setVideos(data.items) is called), React uses a process called reconciliation to efficiently update the user interface.
    } catch (error) {
      console.error('Error while fetching the videos:', error);
    }
  };


  return (
    <div className='md:flex md:flex-wrap max-sm:flex max-sm:flex-col md:gap-x-4 md:gap-y-10 mt-12' >
      {
        videos.map((video) => (
          <VideoCard key={video.id} info={video} />
        ))
      }
    </div>

  )
}

export default VideoContainer 
