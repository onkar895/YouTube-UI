/* eslint-disable no-unused-vars */
import React from 'react'
import SideBar from '../Components/SideBar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='flex'>
      <SideBar />
      {/* {
        The < Outlet > component from react-router-dom is a special component that is used within a parent route to render the child routes. In this case, it allows the child routes defined in the App component to be rendered inside the Body component.
      } */}
      <Outlet />
    </div>
  )
}

export default Body
