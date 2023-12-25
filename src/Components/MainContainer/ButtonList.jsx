/* eslint-disable no-unused-vars */
import React from 'react'
import Button from './Button'
import { ButtonNames } from '../../utils/constants'

const ButtonList = () => {

  return (

    <div className='mt-20'>
      <div className='flex gap-4'>
        {
          ButtonNames.map((name) => (
            <Button key={name} name={name} />
          ))
        }
      </div>
    </div>
  )
}

export default ButtonList
