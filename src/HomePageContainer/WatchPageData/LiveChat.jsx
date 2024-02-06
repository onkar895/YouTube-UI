/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../../utils/chatSlice'
import { generateRandomComment, generateRandomName } from '../../utils/helper'

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
  }, [])

  return (
    <div className='shadow-gray-200 shadow-2xl border md:h-[50vh] md:w-[92.5vw] lg:w-[28.4vw] lg:h-[81vh] md:rounded-2xl max-sm:rounded-2xl max-sm:h-[60vh] bg-gray-100 flex flex-col-reverse overflow-y-scroll overflow-x-hidden chatScroll'>
      {
        chatMessage.map((chat, index) => (
          <ChatMessage key={index} name={chat.name} message={chat.message} />
        ))
      }
    </div>
  )
}

export default LiveChat
