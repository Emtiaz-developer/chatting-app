import React from 'react'
import { EmojiIcon } from '../../Svg/Emoji'
import { GalleryIcon } from '../../Svg/Gallery'

const Chatting = () => {
  return (
    <>
    <div className='w-full h-[480px] bg-white mt-3 rounded-md shadow-md '>
    <div className='w-full bg-black py-2 flex items-center  px-3'>
    <div className='flex justify-center items-center gap-x-2'>
    <div className='w-10 h-10 bg-orange-200 rounded-full'>

</div>
<div>
    <span className='text-white font-robotoRegular'>Shawon Islam</span>
</div>
    </div>
    </div>
    
    </div>
    <div className='bg-[#F5F5F5] py-5 w-full flex items-center justify-center'>
    <div className='bg-white py-3 w-[532px] rounded-md'>
  <div className='flex items-center justify-evenly'>
  <div className='flex items-center gap-x-2 w-[15%]'>
        <div>
            <EmojiIcon/>
        </div>
        <div>
          <GalleryIcon/>
        </div>
    </div>
    <div className='w-[60%]'>
      <input type="text" placeholder='Write anything' className='w-full py-2 outline-none' />
    </div>
    <div className='w-[15%]'>
      <button className='text-white bg-blue-400 rounded-md px-4 py-2'>Send</button>
    </div>
  </div>
    </div>
    </div>
    </>
  )
}

export default Chatting