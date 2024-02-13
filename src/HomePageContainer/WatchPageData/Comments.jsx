/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const Comments = ({ info, isReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const getComments = (item, isReply) => {
    return isReply ? item.snippet : item.snippet.topLevelComment.snippet;
  };

  const handleLike = () => {
    setLike(!like);
    setDislike(false);
    if (!like) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
  };

  const handleDislike = () => {
    setDislike(!dislike);
    setLike(false);
    if (!dislike && likeCount > 0) {
      setLikeCount(likeCount - 1);
    }
  };

  const commentItem = getComments(info, isReply);

  return (
    <div className='flex flex-col my-5'>
      <div className='flex items-center gap-2'>
        <div>
          <img
            src={commentItem?.authorProfileImageUrl}
            className="w-8 h-8 rounded-full"
            alt="Profile"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-sm">{commentItem?.authorDisplayName}</h1>
          <p className="text-sm text-gray-600">{commentItem?.textOriginal}</p>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex items-center px-7'>
          <div className='flex items-center'>
            <div className='flex items-center rounded-full px-1'>
              <button className='hover:bg-gray-200 p-2' onClick={handleLike}>
                {like ? <BiSolidLike className='text-xl' /> : <BiLike className='text-xl' />}
              </button>
              <span>{likeCount > 0 && likeCount}</span>
            </div>
            <button className='hover:bg-gray-200 rounded-full p-2' onClick={handleDislike}>
              {dislike ? <BiSolidDislike className='text-xl' /> : <BiDislike className='text-xl' />}
            </button>
          </div>
          <div className='hover:bg-gray-200 px-4 py-1 cursor-pointer rounded-full'>
            <span className='text-sm font-bold'>Reply</span>
          </div>
        </div>
        <div className='px-10'>
          {info.replies && (
            <>
              <h2
                className={`${isReply && 'hidden'} text-sm text-blue-500 font-semibold cursor-pointer`}
                onClick={() => setShowReply(!showReply)}
              >
                {showReply ? (
                  <div className='flex items-center gap-2'>
                    <span>Hide replies</span>
                    <FaCaretUp className='text-xl text-blue-500' />
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <span>Show replies</span>
                    <FaCaretDown className='text-xl text-blue-500' />
                  </div>
                )}
              </h2>
              {showReply && info.replies.comments && info.replies.comments.map((item) => (
                <Comments key={item?.id} info={item} isReply={true} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
