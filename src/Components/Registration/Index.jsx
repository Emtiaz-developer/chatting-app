import { FiEye, FiEyeOff } from "react-icons/fi";
import React, { useState } from 'react'
import { useFormik } from "formik";
import { signUpValidation } from "../../Validation/Validation";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";


const RegFromComp = ({toast}) => {
    const auth = getAuth();
    const db = getDatabase()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const initialValues = {
        fullname : "",
        email : "",
        password : ""
    }
    const formik = useFormik({
        initialValues,
        onSubmit: () =>{
            createNewUsers()
        },
        validationSchema : signUpValidation
    })

    const createNewUsers = () =>{
        setLoading(true)
        createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
        .then(({user}) =>{
            updateProfile(auth.currentUser, {
                displayName: formik.values.fullname
              }).then(() =>{
                sendEmailVerification(auth.currentUser)
                .then(() =>{
                    toast.success('Email sent for verification', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        
                        });
                        const timerId = setTimeout(() =>{
                            navigate("/login")
                        },2000)
                        return () =>{
                            clearTimeout(timerId)
                        }
                        setLoading(false)
                }).then(() =>{
                    set(ref(db, "users/" + user.uid),{
                        username: user.displayName,
                        email:user.email
                    })
                })
                .catch((err) =>{
                    console.log(err.message)
                })
              })
         
        })
        .catch((err) =>{
            if(err.message.includes("auth/email-already-in-use")){
                toast.error('Email already use', {
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
            <input type="text" name="fullname" value={formik.values.fullname} onChange={formik.handleChange} placeholder='enter your name' className='border border-slate-400 rounded-md px-3 py-2 w-full mb-3' />
            {
                formik.errors.fullname && formik.touched.fullname && <p className="text-red-500 text-base mb-3">{formik.errors.fullname}</p>
            }
            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder='enter your email' className='border border-slate-400 rounded-md px-3 py-2 w-full mb-3' />
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
                loading ? <BeatLoader color="#fff" size={5}/> : "Sign Up"
                }</button>
        </form>
        <p className="mt-3 text-gray-400">Already have an account ? <Link to="/login" className="text-blue-400 hover:underline cursor-pointer">Sign in</Link></p>
       
    </div>
  </div>
  </>
  )
}

export default RegFromComp