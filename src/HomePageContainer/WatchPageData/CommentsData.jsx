/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { BiMenuAltLeft } from "react-icons/bi";
import { YOUTUBE_COMMENTS_API } from '../../utils/APIList';
import Comments from './Comments';

const CommentsData = ({ videoId }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const data = await fetch(`${YOUTUBE_COMMENTS_API}&order=relevance&videoId=${videoId}`);
      const response = await data.json();
      if (response?.items) {
        setComments(response.items);
      } else {
        console.error('No comments found in the API response');
      }
    } catch (error) {
      console.error("Error while fetching comments", error);
    }
  };

  return (
    <div className='md:mx-[1.82rem] lg:mx-0 max-sm:mx-[0.65rem] max-sm:w-[95vw] md:w-[92.5vw] lg:w-[64.5vw] lg:my-3'>
      <div className='flex items-center gap-x-8'>
        <span className='font-bold text-lg cursor-pointer'>{comments.length} Comments</span>
        <div className='flex items-center gap-1'>
          <BiMenuAltLeft className='text-3xl cursor-pointer' />
          <span className='font-bold cursor-pointer'>Sort by</span>
        </div>
      </div>
      <div className='border border-gray-200 rounded-xl my-3 py-3 px-5'>
        <ul>
          {
            comments.map((comment, index) => (
              <Comments key={index} info={comment} isReply={false} />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default CommentsData
