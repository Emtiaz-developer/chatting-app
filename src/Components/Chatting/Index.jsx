import React from 'react'
import { EmojiIcon } from '../../Svg/Emoji'
import { GalleryIcon } from '../../Svg/Gallery'

const Chatting = () => {
  return (
    <>
    <div className='w-full bg-white mt-3 rounded-md shadow-md '>
    <div className='w-full bg-[#E1E6ED] py-2 flex items-center  px-3'>
    <div className='flex justify-center items-center gap-x-2'>
    <div className='w-10 h-10 bg-orange-200 rounded-full'>

</div>
<div>
    <span className='text-black font-robotoRegular'>Shawon Islam</span>
</div>
    </div>
    </div>
    <div className='bg-white px-6 h-[430px] py-3 overflow-y-auto'>
    {/* sender message */}
     <div className='w-[60%] ml-auto'>
    <p className='text-white font-robotoRegular text-sm bg-[#0084FF] rounded-md py-2 inline-block px-4'>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime tenetur illum facilis, temporibus ratione quam tempora consequatur quasi fuga provident. Minus itaque accusantium voluptatem incidunt impedit iste provident ipsam earum vero sit, reiciendis nesciunt voluptas magni molestiae ipsa dolores mollitia explicabo pariatur commodi rerum! Quaerat provident ducimus mollitia, quae quam delectus debitis, nemo dolore atque consectetur sit ea minus error fuga architecto cum placeat deserunt officiis dolores alias blanditiis! Odit tempore consectetur, voluptatibus officia id hic impedit ad? Adipisci quam tenetur rerum! Facilis, eaque! Beatae reiciendis cum, veritatis consequuntur ipsam delectus porro impedit voluptas corporis ducimus, eaque necessitatibus autem consectetur. </p>
     </div>

         {/* reciver message */}
         <div className='w-[60%] mr-auto my-3'>
    <p className='text-black font-robotoRegular text-sm bg-[#F0F0F0] rounded-md py-2 inline-block px-4'>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime tenetur illum facilis, temporibus ratione quam tempora consequatur quasi fuga provident. Minus itaque accusantium voluptatem incidunt impedit iste provident ipsam earum vero sit, reiciendis nesciunt voluptas magni molestiae ipsa dolores mollitia explicabo pariatur commodi rerum! Quaerat provident ducimus mollitia, quae quam delectus debitis, nemo dolore atque consectetur sit ea minus error fuga architecto cum placeat deserunt officiis dolores alias blanditiis! Odit tempore consectetur, voluptatibus officia id hic impedit ad? Adipisci quam tenetur rerum! Facilis, eaque! Beatae reiciendis cum, veritatis consequuntur ipsam delectus porro impedit voluptas corporis ducimus, eaque necessitatibus autem consectetur. </p>
     </div>
          {/* sender message */}
          <div className='w-[60%] ml-auto my-3 overflow-hidden'>
    <img src="cat.jpg" alt="" className='w-full h-full object-cover rounded-md' />
     </div>

         {/* reciver message */}
         <div className='w-[60%] mr-auto my-3 overflow-hidden'>
    <img src="cat.jpg" alt="" className='w-full h-full object-cover rounded-md' />
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