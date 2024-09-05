import { FiSend } from "react-icons/fi";
import React, { useEffect, useState } from 'react'
import { EmojiIcon } from '../../Svg/Emoji'
import { GalleryIcon } from '../../Svg/Gallery'
import { useSelector } from 'react-redux'
import avatar from '../../assets/avatar.jpg'
import { getDatabase, onValue, push, ref, set } from "firebase/database";
const Chatting = () => {
  const singleFriend = useSelector((single) => single.active.active)
  const user = useSelector((user) => user.logIn.loginValues)
  const db = getDatabase()
  const [messages, setMessages] = useState("")
  const [allmessages, setAllmessages] =  useState([])
 const handleMessages = () =>{
  set(push(ref(db, "SingleMessages")),{
    whoSendId : user.uid,
    whoSendName : user.displayName,
    whoReciveName : singleFriend.name,
    whoReciveId : singleFriend.id,
    message: messages,
    date : `Year  : ${new Date().getFullYear()} -  Month  : ${new Date().getMonth() + 1} - Date  :  ${new Date().getDate()} - Hours : ${new Date().getHours()} - Minutes : ${new Date().getMinutes()}`
  }).then(()  => {
    setMessages("")
  })
 }

 useEffect(() =>{
  onValue(ref(db, "SingleMessages"), (snapshot) =>{
    let messageArr = []
    snapshot.forEach((item) =>{
      if(user.uid === item.val().whoSendId && item.val().whoReciveId === singleFriend.id || item.val().whoReciveId === user.uid && item.val().whoSendId === singleFriend.id ){
        messageArr.push(item.val())
      }
    })
    setAllmessages(messageArr)
  })
 },[singleFriend.id])
 console.log(allmessages)
  return (
    <>
    <div className='w-full bg-white mt-3 rounded-md shadow-md '>
    <div className='w-full bg-[#E1E6ED] py-2 flex items-center  px-3'>
    <div className='flex justify-center items-center gap-x-2'>
    <div className='w-10 h-10  rounded-full overflow-hidden'>
    <img src={singleFriend.profile || avatar} alt="" className='w-full h-full rounded-full object-cover' />
</div>
<div>
    <span className='text-black font-robotoRegular'>{singleFriend.name || "Please select your friend for chatting"}</span>
</div>
    </div>
    </div>
    <div className='bg-white px-6 h-[430px] py-3 overflow-y-auto'>

    {
      singleFriend?.status === "single" ? 
      allmessages?.map((item) =>(
        user.uid === item.whoSendId ?   <div className='w-[60%] ml-auto'>
        <p className='text-white font-robotoRegular text-sm bg-[#0084FF] rounded-md py-2 inline-block px-4'> {item.message} </p>
         </div> : 
                  <div className='w-[60%] mr-auto my-3'>
                  <p className='text-black font-robotoRegular text-sm bg-[#F0F0F0] rounded-md py-2 inline-block px-4'>  {item.message} </p>
                   </div>
      ))
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
        <div >
            <EmojiIcon/>
        </div>
        <div>
          <GalleryIcon/>
        </div>
    </div>
    <div className='w-[60%]'>
      <input type="text" value={messages} placeholder='Write anything' onChange={(e) => setMessages(e.target.value) } className='w-full py-2 outline-none' />
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