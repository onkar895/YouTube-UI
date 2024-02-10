/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BiLike, BiDislike } from 'react-icons/bi'
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi'
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const Comments = ({ info, isReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [like, setLike] = useState(true)
  const [disLike, setDisLike] = useState(true)
  const [likeCount, setLikeCount] = useState(0)

  const commentItem = getComments(info, isReply);

  const getComments = (item, isReply) => {
    if (isReply) {
      const { snippet } = item;
      return snippet;
    } else {
      const { snippet: { topLevelComment: { snippet } } } = item;
      return snippet;
    }
  }

  const handleLike = () => {
    setLike(!like);
    setDisLike(false);
    like ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);
  };

  const handleDislike = () => {
    setDisLike(!disLike);
    setLike(false);
    if (likeCount === 0) return;
    !disLike && setLikeCount(likeCount - 1);
  };

  return (
    <div className={`flex flex-col gap-2 ${isReply && "pl-4"}`}>
      <div className='flex items-center gap-2'>
        <div>
          <img
            src={commentItem?.authorProfileImageUrl}
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-sm">{commentItem?.authorDisplayName}</h1>
          <p className="text-sm text-gray-600">{commentItem?.textOriginal}</p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <button className='hover:rounded-full bg-gray-200' onClick={handleLike}>
                {
                  like ? (
                    <BiLike className='text-xl' />
                  ) : (
                    <BiSolidLike className='text-xl' />
                  )
                }
              </button>
              <span>{likeCount > 0 && likeCount}</span>
            </div>
            <button className='hover:rounded-full bg-gray-200' onClick={handleDislike}>
              {
                disLike ? (
                  <BiDislike className='text-xl' />
                ) : (
                  <BiSolidDislike className='text-xl' />
                )
              }
            </button>
          </div>
          <div className='hover:rounded-full bg-gray-200 p-2'>
            <span className='text-sm font-bold'>Reply</span>
          </div>
        </div>
        <div>
          {
            info.replies && (
              <>
                <h2 className={`${isReply && 'hidden'}  text-sm text-blue-500 font-semibold cursor-pointer`}
                  onClick={() => setShowReply(!showReply)}>
                  {
                    showReply ? (
                      <div className='flex items-center gap-2'>
                        <span>Hide replies</span>
                        <FaCaretUp className='text-xl' />
                      </div>
                    ) : (
                      <div className='flex items-center gap-2'>
                        <span>Show replies</span>
                        <FaCaretDown className='text-xl' />
                      </div>
                    )
                  }
                </h2>
                {
                  showReply && info.replies.comments.map((item) => {
                    return <Comments key={item?.id} comment={item} isReply={true} />;
                  })
                }
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Comments
