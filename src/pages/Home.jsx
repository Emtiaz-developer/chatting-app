import React from 'react'
import LoogedUserRoute from '../Components/PrivateRoute/LoogedUserRoute'
import { AddFriendIcon } from '../Svg/AddFriend'
import UserList from '../Components/UserList/Index'
import FriendRequest from '../Components/FriendRequest/Index'
import Friends from '../Components/Friends/Index'

const Home = () => {
  return (
    <>
    
    <div className='grid grid-cols-[2fr,4fr]  '>
    <div>
      <UserList/>
    </div>
     <div className='grid grid-cols-2 gap-x-8 px-5'>
    <div>
    <FriendRequest/>
    </div>
    <div>
      <Friends/>
    </div>
     </div>
    </div>
    </>
  )
}

export default Home