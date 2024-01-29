/* eslint-disable no-unused-vars */
import React from 'react'
import ButtonList from '../Components/ButtonList'
import VideoContainer from '../Components/VideoContainer'

const MainContainer = () => {

  return (
    <>
      <div className='md:mx-24 md:mt-[4.4rem] max-sm:mt-[5rem] md:space-y-6 max-sm:space-y-6 max-sm:mx-auto'>
        <ButtonList />
        <VideoContainer />
      </div>
    </>
  )
}

export default MainContainer
