import React from 'react'
import { Outlet } from 'react-router-dom'
import Navber from '../components/Navber'

const Layout = () => {
  return (
    <>
        <div>Layout</div>

        <Navber/>
        <Outlet/>

    </>
  )
}

export default Layout