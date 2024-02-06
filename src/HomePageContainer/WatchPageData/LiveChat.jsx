/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../../utils/chatSlice'
import { generateRandomComment, generateRandomName } from '../../utils/helper'
import MyPic from '../../assets/MyPic.jpg'

const LiveChat = () => {

  const dispatch = useDispatch()

  const chatMessage = useSelector((store) => store.chat.messages)

  useEffect(() => {
    const timer = setInterval(() => {
      // API Polling 
      dispatch(addMessage({
        name: generateRandomName(),
        message: generateRandomComment(),
      }))
    }, 2000)

    return () => clearInterval(timer)
  })

  return (
    <>
      <div className='shadow-gray-200 shadow-2xl md:h-[50vh] md:w-[92.5vw] lg:w-[28.4vw] lg:h-[81vh] max-sm:h-[60vh] bg-gray-100 flex flex-col-reverse overflow-y-scroll overflow-x-hidden chatScroll'>
        {
          chatMessage.map((chat, index) => (
            <ChatMessage key={index} name={chat.name} message={chat.message} />
          ))
        }
      </div>
      <div className='shadow-gray-200 shadow-2xl md:w-[92.5vw] lg:w-[28.4vw] bg-gray-100 py-4 border'>
        <div className='flex gap-4 mx-2'>
          <div className={`w-8 hover:cursor-pointer`}>
            <img className='rounded-full' src={MyPic} alt="Mypic" />
          </div>
          <input type="text" placeholder='Chat...' className='md:w-[92.5vw] lg:w-[22vw] border outline-none shadow-gray-400 shadow-2xl px-3 py-2 text-sm text-gray-600 bg-gray-100' />
        </div>
      </div>
    </>
  )
}

export default LiveChat
