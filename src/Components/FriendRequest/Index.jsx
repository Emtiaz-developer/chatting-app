import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import avatar from '../../assets/avatar.jpg'
import Lottie from 'lottie-react'
import notFound from '../../Animations/notfound.json'



const FriendRequest = () => {
  const db = getDatabase()
  const [friendrequsetlist, setFriendRequestList] = useState([])
  // const [loading, setLoading] = useState(false)
  const user = useSelector((user) => user.logIn.loginValues)


  useEffect(() =>{
    const starCountRef = ref(db, 'FriendRequest/');
    onValue(starCountRef, (snapshot) => {
      let friendReq = []
      snapshot.forEach((item) =>{
        if(user.uid === item.val().reciverId ){
          friendReq.push({...item.val(), id: item.key})
        }
      })
      setFriendRequestList(friendReq)
    });

  },[db, user.uid])

  const handleAccept = (data) =>{
    // setLoading(true)
    set(push(ref(db, "friends")),{
      ...data
    }).then(() =>{
      // setLoading(false)
      remove(ref(db, 'FriendRequest/', + data.id))
    })
   console.log(data.id)
  }

  return (
  <>
     <div className='bg-white shadow-md rounded-md w-full h-[600px] px-5 overflow-y-auto'>
      <h1 className='text-black font-robotoBold mt-5 text-xl'>Friend Request</h1>
      

        {
        friendrequsetlist?.map((item) =>(
            <div className='mt-4 flex justify-between items-center' key={item.id}>
      <div className='flex items-center gap-x-2'>
        <div className=' w-10 h-10 rounded-full'>
          <img src={item.senderProfile || avatar} alt="" className='w-full h-full rounded-full object-cover' />
        </div>
        <div>
          <span className='text-black font-robotoRegular'>{item.senderName}</span>
        </div>
      </div>
      <div className='flex items-center gap-x-2'>
       <button onClick={() => handleAccept(item)} className='text-white rounded-md px-4 py-2 bg-[#6CD0FB]'>Accept</button>
       <button className='text-white rounded-md px-4 py-2 bg-[#D34A4A]'>Reject</button>
      </div>
      </div>
        )) 
        }
     </div>
  </>
  )
}

export default FriendRequest