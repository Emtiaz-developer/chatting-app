import React from 'react'
import regAnimation from '../Animations/regAnimations.json'
import Lottie from 'lottie-react'
import RegFromComp from '../Components/Registration/Index'
import { ToastContainer, toast } from 'react-toastify';
const Registration = () => {
  return (
    <>
    <ToastContainer/>
    <div className='w-full h-screen flex justify-center items-center'>
    <div className='w-1/2 bg-white rounded-md p-4 shadow-md flex items-center justify-between'>
    <div className='w-[48%]'>
    <Lottie animationData={regAnimation} loop={true} />
    </div>
    <div className='w-[48%]'>
        <RegFromComp toast={toast}/>
    </div>
    </div>
    </div>
    </>
  )
}

export default Registration