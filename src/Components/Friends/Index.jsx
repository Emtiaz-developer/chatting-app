import { getDatabase, onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import avatar from '../../assets/avatar.jpg'

const Friends = () => {
    const location = useLocation()
    const {pathname} = location
    const navigate = useNavigate()
    const [friendslist, setFriendList] = useState([])
    const db = getDatabase()
    const user = useSelector((user) => user.logIn.loginValues)
    useEffect(() => {
      const starCountRef = ref(db, 'friends/');
      onValue(starCountRef, (snapshot) => {
        let friendArr = []
        snapshot.forEach((item) =>{
          if(user.uid === item.val().senderId || user.uid === item.val().reciverId){
            friendArr.push({...item.val(), id: item.key})
          }
        })
        setFriendList(friendArr)
      });
    }, [db, user.uid])
    
  console.log(friendslist)
  return (
    <>
    <div className='bg-white shadow-md rounded-md w-full h-[600px] px-5 overflow-y-auto'>
      <h1 className='text-black font-robotoBold mt-5 text-xl'>All Friends</h1>
     

      
    {
      friendslist?.map((item) =>(
        <div className='flex items-center justify-between  mt-3 hover:bg-[#efefef] px-4 py-2 rounded-md transition-all ease-linear duration-100 cursor-pointer'>
    <div className='flex items-center gap-x-2'>
        <div className='w-12 h-12 rounded-full overflow-hidden'>
       {user.uid === item.reciverId ?         <img  src={item.senderProfile || avatar} alt="" className='w-full h-full rounded-full object-cover overflow-hidden cursor-pointer' /> :    <img  src={item.reciverProfile || avatar} alt="" className='w-full h-full rounded-full object-cover overflow-hidden cursor-pointer' />}
        </div>
        <h3 className='font-robotoRegular text-black text-lg'>
        {user.uid === item.senderId ? item.reciverName : item.senderName}
        </h3>
        </div>
      {
        location.pathname === "/" && (
          <button onClick={() =>{
            navigate("/message")
          }} className='px-4 py-2 font-robotoRegular rounded-md bg-[#6CD0FB] text-white'>Message</button>
        )
      }

       
         
          
      
    </div>
      ))
    }
     </div>
    </>
  )
}

export default Friends