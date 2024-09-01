import React, { useState } from 'react'
import { FriendsIcon } from '../../Svg/Friends'
import { MessagesIcon } from '../../Svg/Messages'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CameraIcon } from '../../Svg/Camera'
import { createPortal } from 'react-dom'
import Modals from '../Modals/Index'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../assets/avatar.jpg'
import { logoutUsers } from '../../feauters/Slices/UserSlice'

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((user) => user.logIn.loginValues)
  const [show, setShow] = useState(false)
  const {pathname} = location
  console.log(pathname)
  const handleLogout = (e) =>{
    e.preventDefault();
    navigate("/login")
    localStorage.removeItem("user")
    dispatch(logoutUsers())
  }
  return (
  <>
   <div className='flex justify-between items-center py-3 bg-slate-900 px-7'>
   
   <div className='flex items-center gap-x-2'>
    <div className='relative'>

    <div className=' rounded-full w-14 h-14'>
      <img src={user.photoURL || avatar} alt="" className='w-full h-full rounded-full object-cover overflow-hidden' />
    </div>
    <div onClick={() => setShow(true)} className='bg-white bottom-0 right-0 rounded-full w-5 h-5 absolute flex justify-center items-center cursor-pointer'>
     <CameraIcon/>
    </div>
    </div>
     <div>
       <span className='text-white font-robotoRegular'>{user.displayName}</span>
     </div>
   </div>
   <div className='flex items-center gap-x-3'>
   <Link to="/" className={pathname === "/" ? 'bg-[#6CD0FB] text-white  rounded-full w-10 h-10 flex justify-center items-center cursor-pointer' : 'bg-white  text-black rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'}>
    <FriendsIcon /> 
   </Link>
   <Link to="/message" className={pathname === "/message" ? 'bg-[#6CD0FB]  text-white rounded-full w-10 h-10 flex justify-center items-center cursor-pointer' : 'bg-white text-black rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'}>
   <MessagesIcon/>
   </Link>
   </div>
   <div>
     <button onClick={handleLogout} className='text-white font-robotoRegular px-4 py-2 bg-blue-400 rounded-md'>Logout</button>
   </div>
   
</div>

{
  show && createPortal(
      <Modals setShow={setShow}/>,
      document.body
  )
}
  </>
  )
}

export default Navbar