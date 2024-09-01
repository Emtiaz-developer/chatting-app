import React from 'react'
import Friends from '../Components/Friends/Index'
import Chatting from '../Components/Chatting/Index'

const MessagePage = () => {
  return (
   <>
    <div className='grid grid-cols-[2fr,4fr] gap-x-5 '>
   <div>
    <Friends/>
   </div>
   <div className='px-5'>
    <Chatting/>
   </div>
    </div>
   </>
  )
}

export default MessagePage