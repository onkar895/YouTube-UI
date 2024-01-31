/* eslint-disable no-unused-vars */
import React from 'react'
import SideBar from '../Components/SideBar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Body = () => {

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen)

  const mainStyle = isMenuOpen ? 'blur-effect' : ''
  return (
    <div className='flex'>
      <SideBar />
      {/* {
        The < Outlet > component from react-router-dom is a special component that is used within a parent route to render the child routes. In this case, it allows the child routes defined in the App component to be rendered inside the Body component.
      } */}
      <div className={mainStyle}>
        <Outlet />
      </div>
    </div>
  )
}

export default Body
