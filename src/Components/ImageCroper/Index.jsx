import React, { useState } from 'react'
import { CrossIcon } from '../../Svg/Cross'
import { Cropper } from 'react-cropper'
import { BeatLoader } from 'react-spinners'

const ImageCroper = ({getCropData, cropperRef, image, loading, setLoading}) => {
  
  return (
   <>
     <div className='bg-[#000000ad] w-full h-screen fixed top-0 left-0 flex items-center justify-center'>
    <div className='w-[30%] bg-white p-4 rounded-md shadow-md relative'>
    <h1 className='text-black font-robotoBold text-center'>Upload photo</h1>
    <div className='absolute top-2 right-2' onClick={() => setShow(false)}>
    <CrossIcon/>
    </div>
    <div className='mt-3 w-20 h-20 rounded-full mx-auto overflow-hidden'>
    <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
    </div>
    <div className='mt-5'>
    <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />
    </div>
    <button disabled={loading} onClick={getCropData} className='text-white bg-blue-400 rounded-md py-2 w-full mt-3'>{
      loading ? <BeatLoader color='#fff' size={5}/> : "Upload"
      }</button>
    </div>
    </div>
   </>
  )
}

export default ImageCroper