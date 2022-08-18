import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineDownSquare, AiOutlineCloseSquare } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";


const PopupTwo = (props) => {

  return (
    <div className='popup-two-main offer-popUp1' style={{visibility:props.visible}}>
      <form action="">
        <div className='form-main-div'>
          <div className='close-window popTwo-close-window'>
            <IoArrowBackSharp className='close-icon' onClick={(e)=>{
              e.preventDefault()
              props.close('visible')
              props.visibleFunc('hidden')
            }}/>
          <span className='desc-span'>Description</span>
            <AiOutlineCloseSquare className='close-icon'/>
          </div>
          <div className='desc-input-div'>
            <p className='desc-p'>describe your issue here</p>
            <textarea type="text" className='desc-input' height="60"/>
          </div>
          <div className='images-container'>
          <div className='desc-upload-div'>
            <span className='desc-img-span'>images</span>
            <button className='desc-upload-btn'>upload images</button>
            <span className='desc-upload-span'>you can upload up to six images</span>
          </div>
          <div className='img-names-div'>
            <span className='img-name-span'>image name</span>
            <span className='img-name-span'>image name</span>
            <span className='img-name-span'>image name</span>
            <span className='img-name-span'>image name</span>
            <span className='img-name-span'>image name</span>
            <span className='img-name-span'>image name</span>
          </div>
          </div>
            <button className='popUp-next-btn popupTwo-nxt-btn'>next</button>
        </div>
      </form>
    </div>
  )
}

export default PopupTwo