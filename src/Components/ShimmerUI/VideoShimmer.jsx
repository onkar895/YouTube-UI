/* eslint-disable no-unused-vars */
import React from 'react'

const VideoShimmer = () => {
  return (
    <div>
      {
        // creating a new Array instance using Array() constructor and map through every element of array 
        Array(50)
          .fill("")
          .map((_, index) => (
            <div key={index}>


            </div>
          ))
      }
    </div>
  )
}

export default VideoShimmer
