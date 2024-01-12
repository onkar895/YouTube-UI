/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const VideoShimmer = ({ itemCount }) => {
  return (
    <div>
      {[...Array(itemCount)].map((_, index) => (
        <div key={index} style={{ width: '100px', height: '120px' }}>
          <div className='bg-gray-300 mt-4 mx-4' />
        </div>
      ))}
    </div>
  );
};

export default VideoShimmer;