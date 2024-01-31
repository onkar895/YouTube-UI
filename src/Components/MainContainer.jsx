/* eslint-disable no-unused-vars */
import React from 'react'
import ButtonList from '../Components/ButtonList'
import VideoContainer from '../Components/VideoContainer'

const MainContainer = () => {

  return (
    <>
      <div className='flex flex-col gap-6 md:my-[3.81rem] lg:w-[90.2vw] md:w-[84.2vw] max-sm:w-[100vw] max-sm:my-[4.6rem] max-sm:mx-auto md:mx-24'>
        <ButtonList />
        <VideoContainer />
      </div>
    </>
  )
}

export default MainContainer