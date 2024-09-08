import { FiSend } from "react-icons/fi";
import React, { useEffect, useRef, useState } from 'react'

import { EmojiIcon } from '../../Svg/Emoji'
import { GalleryIcon } from '../../Svg/Gallery'
import { useSelector } from 'react-redux'

import { getDatabase, onValue, push, ref, set } from "firebase/database";

import EmojiPicker from "emoji-picker-react";

import { getDownloadURL, getStorage, ref as Ref, uploadBytesResumable } from "firebase/storage";

const Chatting = () => {
  const singleFriend = useSelector((single) => single.active.active)
  const user = useSelector((user) => user.logIn.loginValues)
  const db = getDatabase()
  const storage = getStorage();
  const [messages, setMessages] = useState("")
  const [emojiShow, setEmojiShow] = useState(false)
  const [allmessages, setAllmessages] =  useState([])
  const scroolRef = useRef(null)
  const inputRef = useRef(null)
 const handleMessages = () =>{
  set(push(ref(db, "SingleMessages")),{
    whoSendId : user.uid,
    whoSendName : user.displayName,
    whoReciveName : singleFriend.name,
    whoReciveId : singleFriend.id,
    message: messages,
    date : new Date().toString()
  }).then(()  => {
    setMessages("")
    setEmojiShow(false)
  })
 }


 useEffect(() =>{
  onValue(ref(db, "SingleMessages"), (snapshot) =>{
    let messageArr = []
    snapshot.forEach((item) =>{
      if(user.uid === item.val().whoSendId && item.val().whoReciveId === singleFriend.id || user.uid === item.val().whoReciveId && item.val().whoSendId === singleFriend.id){
        messageArr.push(item.val())
      }
    })
    setAllmessages(messageArr)
  })
 },[singleFriend.id])

const handleEmojiSelect = ({emoji}) =>{
  setMessages(messages + emoji)
}

const handleImageUpload = (e) =>{
  const imgFiles = e.target.files[0]
  const storageRef = Ref(storage, `${user.displayName} = singleImageMessage/ ${imgFiles}`);

  const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

  uploadTask.on('state_changed', 
    (snapshot) => {

      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
     
    }, 
    (error) => {
    console.log(error.message)
    }, 
    () => {
    
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        set(push(ref(db, "SingleMessages")),{
          whoSendId : user.uid,
          whoSendName : user.displayName,
          whoReciveName : singleFriend.name,
          whoReciveId : singleFriend.id,
          message: messages,
          img: downloadURL,
          date : new Date().toString()
        }).then(()  => {
          setMessages("")
          setEmojiShow(false)
        })
      });
    }
  );

}

useEffect(() =>{
  scroolRef.current?.scrollIntoView({
    behavior : "smooth"
  })
},[messages])

const handleSendMessage = (e) =>{
  if(e.key === "Enter"){
    handleMessages()
  }
}

  return (
    <>
    <div className='w-full bg-white mt-3 rounded-md shadow-md '>
    <div className='w-full bg-[#E1E6ED] py-2 flex items-center  px-3'>
    <div className='flex justify-center items-center gap-x-2'>
    <div className='w-10 h-10  rounded-full overflow-hidden'>
    <img src={singleFriend.profile || "avatar.jpg"} alt="" className='w-full h-full rounded-full object-cover' />
</div>
<div>
    <span className='text-black font-robotoRegular'>{singleFriend.name || "Please select your friend for chatting"}</span>
</div>
    </div>
    </div>
    <div className='bg-white px-6 h-[430px] py-3 overflow-y-auto'>

  
   {
    singleFriend?.status === "single" ? 
    <div>
      {
        allmessages?.map((item, i) =>(
            <div key={i} ref={scroolRef}>
      {
        user.uid === item.whoSendId ? 
        <div className='w-[60%] ml-auto flex items-end flex-col'>
        {
          item.img ?  <div className='w-[60%] ml-auto my-3 overflow-hidden'>
          <img src={item.img} alt="" className='w-full h-full object-cover rounded-md' />
           </div>  : <>
           <p className='text-white font-robotoRegular text-sm bg-[#0084FF] rounded-md py-2 inline-block px-4'> {item.message} </p>
        <span className="mt-2 text-sm text-slate-400 mb-2"> </span>
           </>
        }
         </div>
        :  <div className='w-[60%] mr-auto my-3 flex items-start flex-col'>
        {
          item.img ? <div className='w-[60%] mr-auto my-3 overflow-hidden'>
          <img src={item.img} alt="" className='w-full h-full object-cover rounded-md' />
           </div> : <>
           <p className='text-black font-robotoRegular text-sm bg-[#F0F0F0] rounded-md py-2 inline-block px-4'>  {item.message}</p>
           <span className="mt-2 text-sm text-slate-400 mb-2"></span>
           </>
        }
         </div>
      }
            </div>
        ))
      }
    </div>
    : ""
   }


        

          {/* sender message */}
          {/* <div className='w-[60%] ml-auto my-3 overflow-hidden'>
    <img src="cat.jpg" alt="" className='w-full h-full object-cover rounded-md' />
     </div> */}

         {/* reciver message */}
         {/* <div className='w-[60%] mr-auto my-3 overflow-hidden'>
    <img src="cat.jpg" alt="" className='w-full h-full object-cover rounded-md' />
     </div> */}
    </div>
    
    </div>
    <div className='bg-[#F5F5F5] py-5 w-full flex items-center justify-center'>
    <div className='bg-white py-3 w-[532px] rounded-md'>
  <div className='flex items-center justify-between gap-x-20'>
  <div className='flex items-center gap-x-2 w-[15%] mx-4'>
        <div className="relative">
  
          <div className="cursor-pointer" onClick={() => setEmojiShow((prev) => !prev)}>
          <EmojiIcon/>
          </div>
          {
        emojiShow && (
          <div   className="absolute bottom-8 -left-5">
          <EmojiPicker onEmojiClick={handleEmojiSelect}/>
         </div>
        )
      }
        </div>
        <div className="cursor-pointer" onClick={() => inputRef.current.click()}>
          <GalleryIcon/>
        </div>
        <input type="file" ref={inputRef} hidden onChange={handleImageUpload} />
    </div>
    <div className='w-[60%]'>
      <input type="text" value={messages} placeholder='Write anything' onChange={(e) => setMessages(e.target.value) } className='w-full py-2 outline-none' onKeyUp={handleSendMessage} />
    </div>
    <div className='w-[15%]'>
      <button  onClick={handleMessages} className='text-white bg-blue-400 rounded-md px-3 py-2 flex items-center justify-center'><FiSend color="#fff" size={20}/></button>
    </div>
  </div>

    </div>

    </div>
    </>
  )
}

export default Chatting