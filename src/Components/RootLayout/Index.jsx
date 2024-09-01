import React from 'react'
import Navbar from '../Navbar/Index'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
     <div className='relative w-full h-screen '>
      <div className='h-[200px] bg-[#212121] w-full'>
      <div className='w-[80%] h-[700px] pb-5  bg-white shadow-md rounded-md absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
     <Navbar/>
     <Outlet/>
      </div>
      </div>
   </div>
    </>
  )
}

export default RootLayout