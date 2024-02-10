/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../utils/chatSlice';
import { generateRandomComment, generateRandomName } from '../../utils/helper';
import MyPic from '../../assets/MyPic.jpg';
import { VscSend } from 'react-icons/vsc';
import { FaRegFaceSmile } from "react-icons/fa6";

const LiveChat = () => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const dispatch = useDispatch();
  const chatMessage = useSelector((store) => store.chat.messages);

  const InputStyle = `relative md:w-[92.5vw] lg:w-[28.4vw] max-sm:w-[100%] outline-none shadow-gray-400 shadow-2xl py-1 text-sm mx-[9px] border-b-2 ${isFocused ? 'border-blue-700 transition-all duration-300 px-9' : 'border-gray-500'} text-gray-600 bg-gray-100`

  const ChatBoxStyle = 'shadow-gray-300 shadow-2xl md:h-[50vh] md:w-[92.5vw] lg:w-[30vw] lg:h-[58vh] max-sm:h-[50vh] bg-gray-100 flex flex-col-reverse md:overflow-y-scroll overflow-x-hidden chatScroll'

  let count = 0;

  useEffect(() => {
    const timer = setInterval(() => {
      // API Polling
      dispatch(
        addMessage({
          imgUrl: `https://source.unsplash.com/random/200x200?${count}`,
          name: generateRandomName(),
          message: generateRandomComment() + "...✨",
        })
      );
      count++;
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleChat = (e) => {
    e.preventDefault();

    dispatch(
      addMessage({
        imgUrl: MyPic,
        name: 'Omkar Karale',
        message: message,
      })
    );
    setMessage('');
  };

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsChatVisible(window.innerWidth >= 768); // Set to false for screen width less than 768px
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <div>
      <div className={`${isChatVisible ? "hover:bg-gray-900 bg-gray-800 text-white" : "hidden"} cursor-pointer py-3 border border-b-2 rounded-t-2xl bg-gray-100 hover:bg-gray-200 text-center text-sm`}>
        <span className='animate-pulse'>Live Chat</span>
      </div>
      {
        isChatVisible && (
          <div className={ChatBoxStyle}>
            {chatMessage.map((chat, index) => (
              <ChatMessage key={index} info={chat} />
            ))}
          </div>
        )
      }
      <div className={`${isChatVisible ? '' : 'hidden'}`}>
        <div className='shadow-gray-300 shadow-2xl border md:w-[92.5vw] lg:w-[30vw] bg-gray-100 py-3 max-sm:py-6 flex flex-col lg:gap-2 md:gap-2 max-sm:gap-2'>
          <div className='flex items-center justify-between mx-2'>
            <div className='flex items-center gap-3'>
              <div className={`w-6 hover:cursor-pointer`}>
                <img className='rounded-full' src={MyPic} alt='Mypic' />
              </div>
              <div className='text-sm cursor-pointer'>
                <span>Omkar Karale</span>
              </div>
            </div>
            <div className='text-lg'>😊</div>
          </div>
          <div>
            <form onSubmit={(e) => e.preventDefault()} className='flex items-center'>
              {
                isFocused && (
                  <span className='absolute z-10 ml-3 text-lg text-gray-700'>
                    <FaRegFaceSmile />
                  </span>
                )
              }
              <input
                type='text'
                placeholder='Chat...'
                value={message}
                className={InputStyle}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <button onClick={(e) => handleChat(e)}
                className='absolute lg:right-[1.85rem] max-sm:right-[1.35rem] md:right-[2.5rem] cursor-pointer'>
                <VscSend className={`${isFocused ? "text-blue-800 animate-pulse" : ""} text-gray-500 text-lg`} />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div onClick={toggleChatVisibility}
        className={`${!isChatVisible ? "rounded-xl bg-gray-800 hover:bg-gray-900 text-white" : ""} flex justify-center cursor-pointer py-3 border rounded-b-2xl bg-gray-800 text-white hover:bg-gray-900`}>
        <button className={`${isChatVisible ? "" : "animate-pulse"} text-sm lg:w-[28.3vw]`}>
          {isChatVisible ? 'Hide Chat' : 'Show Chat'}
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
