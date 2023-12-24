/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Button = ({ name }) => {

  return (
    <div>
      <button className='bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200'>
        {name}
      </button>
    </div>
  )
}

export default Button
