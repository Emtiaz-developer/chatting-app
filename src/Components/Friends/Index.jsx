import React from 'react'
import { useLocation } from 'react-router-dom'

const Friends = () => {
    const location = useLocation()
    const {pathname} = location
  return (
    <>
    <div className='bg-white shadow-md rounded-md w-full h-[600px] px-5 overflow-y-auto'>
      <h1 className='text-black font-robotoBold mt-5 text-xl'>All Friends</h1>
      <div className='mt-4 flex justify-between items-center'>
      <div className='flex items-center gap-x-2'>
        <div className='bg-purple-500 w-10 h-10 rounded-full'>
          
        </div>
        <div>
          <span className='text-black font-robotoRegular'>Emtiaz Ahmad</span>
        </div>
      </div>
     {
        pathname === "/" && (
            <div className='flex items-center gap-x-2'>
            <button className='text-white rounded-md px-4 py-2 bg-[#6CD0FB]'>Message</button>
            
           </div>
        )
     }
      </div>


     </div>
    </>
  )
}

export default Friends