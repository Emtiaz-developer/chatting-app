import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

import Lottie from 'lottie-react';
import logAnimation from '../Animations/logAnimations.json'
import LogFormComp from '../Components/Login/Index';
const LoginPage = () => {
  return (
   <>
     <ToastContainer/>
    <div className='w-full h-screen flex justify-center items-center'>
    <div className='w-1/2 bg-white rounded-md p-4 shadow-md flex items-center justify-between'>
    <div className='w-[48%]'>
    <Lottie animationData={logAnimation} loop={true} />
    </div>
    <div className='w-[48%]'>
        <LogFormComp toast={toast}/>
    </div>
    </div>
    </div>
   </>
  )
}

export default LoginPage