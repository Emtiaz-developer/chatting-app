
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from 'react'
import { AddFriendIcon } from '../../Svg/AddFriend'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref as Ref } from 'firebase/storage'


import { createPortal } from 'react-dom'
import { CrossIcon } from '../../Svg/Cross'


const UserList = () => {
  const user = useSelector((user) => user.logIn.loginValues)
  const [friendrequsetlist, setFriendRequestList] = useState([])
  const [cancelrquest, setCancelRequest] = useState([])
  const [pendingrequest, setPendingRequest] = useState([])
  const [searchitems, setSearchItems] = useState("")
  const [frindlist, setFriendList] = useState([])
   const [imgshow, setImgShow] = useState(false);
   const [imgval, setImgVal] = useState(user.photoURL)
  const storage = getStorage();
  const [users, setUsers] = useState([])
  const db = getDatabase()
  useEffect(() =>{
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      const users = []
      snapshot.forEach((userList) =>{
        
        if(user.uid !== userList.key){
          getDownloadURL(Ref(storage, userList.key)).then((downloadURL) => {
            users.push({
              ...userList.val(),
              id: userList.key,
              photoURL : downloadURL
            })
          }).catch((err) =>{
            users.push({
              ...userList.val(),
              id: userList.key,
              photoURL : null
            })
          }).then(() =>{
            setUsers([...users])
          });
        }
      })
    });
  },[db, user.uid, storage])



 const handlePhote = (imgData) =>{
  if(imgshow === false){
    setImgShow(true)
  }else{
    setImgShow(false)
  }
  if(imgval === null){
    setImgVal(imgData.photoURL)
  }else{
    setImgVal(imgData.photoURL)
  }
 }

 // Show Friend request

const handleFriendRequest =(data) =>{
  set(push(ref(db, "FriendRequest")),{
    senderId : user.uid,
    senderName: user.displayName,
    senderProfile : user.photoURL ?? "avatar.jpg",
    reciverId : data.id,
    reciverName : data.username,
    reciverProfile: data.photoURL ?? "avatar.jpg"
  })
}

useEffect(() =>{
  const starCountRef = ref(db, 'FriendRequest/');
  onValue(starCountRef, (snapshot) => {
    let regArr = []
    let cancelArr = []
  snapshot.forEach((item) =>{
    regArr.push(item.val().reciverId + item.val().senderId)
    cancelArr.push({...item.val(), id: item.key})
  })
  setFriendRequestList(regArr)
  setCancelRequest(cancelArr)
  });
},[db])

useEffect(() =>{
  const starCountRef = ref(db, 'FriendRequest/');
  onValue(starCountRef, (snapshot) => {
    let pendArr = []
   snapshot.forEach((item) =>{
    if(user.uid === item.val().senderId){
      pendArr.push({...item.val(), id: item.key})
    }
   })
   setPendingRequest(pendArr)
  })
  
},[db, user.uid])

useEffect(() =>{
  const starCountRef = ref(db, 'friends/');
  onValue(starCountRef, (snapshot) => {
    let friendArr = []
    snapshot.forEach((item) =>{
      if(user.uid === item.senderId || user.uid === item.reciverId){
        friendArr.push({...item.val(), id: item.key})
      }
    })
    setFriendList(friendArr)
  });
},[db, user.uid])

 const handleCancelRequest =(itemId) =>{
  const cancelToreq = cancelrquest.find((req) => req.reciverId === itemId && req.senderId === user.uid)
    if(cancelToreq){
      remove(ref(db, "FriendRequest/" + cancelToreq.id))
    }
 }

 let filterUsers =  users.filter((userItem) =>{
  if(searchitems === ""){
    return userItem
  }else if(userItem.username.toLocaleLowerCase().indexOf(searchitems.toLocaleLowerCase()) > -1){
    return userItem
  }
})
  return (
    <>
      <div className='bg-[#FBFBFB] w-full h-[600px] px-5 overflow-y-auto'>
      <h1 className='text-black font-robotoBold mt-5 text-xl'>All Users ({users.length})</h1>
      <div className='mt-5 mb-5 w-full h-min relative'>
          <input type="text" value={searchitems} onChange={(e) => setSearchItems(e.target.value)} placeholder='Search' className='w-full py-2 border border-slate-400 rounded-md outline-none px-8' />
          <IoIosSearch className="absolute left-1 top-[10px] text-gray-400 w-6 h-6" />
        </div>

    {
      filterUsers.map((item, i) =>(
        <div className='mt-4 flex justify-between items-center' key={i}>
    <div className='flex items-center gap-x-2'>
      <div className=' w-10 h-10 rounded-full'>
        <img onClick={() => handlePhote(item)} src={item.photoURL || "avatar.jpg"} alt="" className='w-full h-full rounded-full object-cover overflow-hidden cursor-pointer' />
      </div>
      <div>
        <span className='text-black font-robotoRegular'>{item.username}</span>
     
      </div>
    </div>
    {
      friendrequsetlist.includes(item.id + user.uid) || friendrequsetlist.includes(user.uid + item.id) ? (
<div>
{
  pendingrequest.length   ? (
    <button onClick={() => handleCancelRequest(item.id)} className='bg-red-500 rounded-md text-white px-4 py-2'>Cancle Request</button>
   ) : (
    <button  className='bg-gray-500 rounded-md text-white px-4 py-2'>Pending Request</button>
   ) 
  
  
}
 
</div>
      ) : (
        <div className='text-black cursor-pointer' onClick={() => handleFriendRequest(item)}>
      <AddFriendIcon/>
    </div>
      )
    }
    

    </div>
      ))
    }
  


 
{
  imgshow && createPortal(
    <>
    <div className='w-[50%]  h-[500px]  p-2  fixed top-[50%] left-[50%] overflow-hidden -translate-x-[50%] -translate-y-[50%]'>
    <div className='w-full h-full bg-white p-2 shadow-md rounded-md relative'>
   
    <div className='border absolute border-slate-400 rounded-md w-[98%] overflow-hidden  top-4 h-[90%] mt-5 p-2'>
    <img src={imgval} alt="" className='w-full h-full overflow-hidden' />
    </div>
    <div className='absolute top-2 right-2 cursor-pointer' onClick={() => setImgShow(false)}>
      <CrossIcon/>
    </div>
    </div>
    </div>
    </>,
    document.body
  )
}
     </div>
    </>
  )
}

export default UserList