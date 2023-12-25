/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Button = ({ name }) => {

  return (
    <div>
      <button className='bg-gray-100 px-[12px] py-[6px] rounded-lg hover:bg-black hover:text-white text-sm'>
        {name}
      </button>
    </div>
  )
}

export default Button
