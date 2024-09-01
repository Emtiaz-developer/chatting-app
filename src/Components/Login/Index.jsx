import { FiEye, FiEyeOff } from "react-icons/fi";
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signInValidation } from "../../Validation/Validation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginUsers } from "../../feauters/Slices/UserSlice";
import { BeatLoader } from "react-spinners";

const LogFormComp = ({toast}) => {
    const [show, setShow] =  useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = getAuth();
  const initialValues = {
    email : "",
    password: ""
  }
    const formik = useFormik({
        initialValues,
        onSubmit: () =>{
            singInUsers()
        },
        validationSchema : signInValidation
    })

const singInUsers = () =>{
    setLoading(true)
    signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
    .then(({user}) =>{
       if(user.emailVerified === true){
        dispatch(loginUsers(user))
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/")
        setLoading(false)

       }else{
        toast.error('Please verify your email', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            
            });
            setLoading(false)
       }
    }).catch((err) =>{
        if(err.message.includes("auth/invalid-credential")){
            toast.error('Invalid email or password', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                
                });
        }
        setLoading(false)
    })
}
    const handleShow = (e) =>{
        e.preventDefault();
        if(show === false){
            setShow(true)
        }else{
            setShow(false)
        }
    }

  return (
    <>
    <div>
    <h1 className='text-black font-robotoBold mb-3 text-lg'>Register for your new journey</h1>
    
    <div>
        <form onSubmit={formik.handleSubmit}>
          
          
            <input type="email" name="email" value={formik.values.email}  onChange={formik.handleChange} placeholder='enter your email' className='border border-slate-400 rounded-md px-3 py-2 w-full mb-3' />
            {
                formik.errors.email && formik.touched.email && <p className="text-red-500 text-base mb-3">{formik.errors.email}</p>
            }
            <div className='relative'>
                <input type={show ? "text" : "password"} name="password" value={formik.values.password} onChange={formik.handleChange} placeholder='enter your password'  className='border border-slate-400 rounded-md px-3 py-2 w-full mb-3'/>
                <button onClick={handleShow}>{
                    show ? <FiEye className="w-5 h-5 absolute top-3 right-3"/>   : <FiEyeOff className="w-5 h-5 absolute top-3 right-3"/>
                    }</button>
            </div>
            {
                formik.errors.password && formik.touched.password && <p className="text-red-500 text-base mb-3">{formik.errors.password}</p>
            }
           
            <button disabled={loading} className="bg-black text-white font-robotoBold w-full py-2 rounded-md">{
                loading ? <BeatLoader color="#fff" size={5}/> : "Sign In"
                }</button>
        </form>
        <p className="mt-3 text-gray-400">Already have an account ? <Link to="/registration" className="text-blue-400 hover:underline cursor-pointer">Sign Up</Link></p>
       
    </div>
  </div>
    </>
  )
}

export default LogFormComp