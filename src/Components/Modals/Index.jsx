import React, { useRef, useState } from 'react'
import { CrossIcon } from '../../Svg/Cross'
import { UploadIcon } from '../../Svg/Upload'
import ImageCroper from '../ImageCroper/Index'
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, updateProfile } from 'firebase/auth';
import { loginUsers } from '../../feauters/Slices/UserSlice';


const Modals = ({setShow}) => {
    const auth = getAuth();
    const dispatch = useDispatch()
    const user = useSelector((user) => user.logIn.loginValues)
    const [loading, setLoading] = useState(false)
    const storage = getStorage();
const storageRef = ref(storage, user.uid);
    const inputRef = useRef(null)
    const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef(null)
    const handleChange = (e) =>{
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
    
        };
        reader.readAsDataURL(files[0]);
    
    }
    const getCropData = () => {
      setLoading(true)
      setShow(true)
        if (typeof cropperRef.current?.cropper !== "undefined") {
          setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
          const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
uploadString(storageRef, message4, 'data_url').then((snapshot) => {
    getDownloadURL(storageRef).then((downloadURL) => {
        updateProfile(auth.currentUser, {
           photoURL: downloadURL
          }).then(() =>{
            dispatch(loginUsers({...user, photoURL:downloadURL}))
            localStorage.setItem("user", JSON.stringify({...user, photoURL:downloadURL}))
          })
      });
 
});
        }
        const timerId = setTimeout(() =>{
          setLoading(false)
          setShow(false)
        },4000)
        return () =>{
          clearTimeout(timerId)
        }
      };
  return (
   <>
   <div className='bg-[#000000ad] w-full h-screen fixed top-0 left-0 flex items-center justify-center'>
    <div className='w-[30%] bg-white p-4 rounded-md shadow-md relative'>
    <h1 className='text-black font-robotoBold text-center'>Upload photo</h1>
    <div className='absolute top-2 right-2' onClick={() => setShow(false)}>
    <CrossIcon/>
    </div>

    <div className='w-full h-[300px] border border-slate-400 rounded-md p-3 mt-5'>
    <div className='w-full h-full bg-slate-400 rounded-md p-2 cursor-pointer flex items-center justify-center' onClick={() => inputRef.current.click()}>

    <div className='flex items-center justify-center'>
       <div>
       <div className='flex justify-center'>
            <UploadIcon/>
        </div>
        <h1 className='text-black font-robotoRegular'>Upload your profile picture</h1>
        <input type="file" ref={inputRef} hidden onChange={handleChange}/>
       </div>
    </div>
   
    </div>
    </div>
    </div>
    {
        image && <ImageCroper getCropData={getCropData} cropperRef={cropperRef} image={image} loading={loading} setLoading={setLoading}/>
    }
   </div>
   </>
  )
}

export default Modals