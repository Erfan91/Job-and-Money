import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineDownSquare, AiOutlineCloseSquare } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import PopupThree from './PopupThree';

const PopupTwo = (props) => {
  const [visibleC, setVisibleC] = useState('hidden')
  // console.log(props.popOneVal[0])

  // <Form Values>
  const [issue, setIssue] = useState('');

  return (
    <div className='popup-two-main offer-popUp1' style={{ visibility: props.visible }}>
      <form action="">
        <div className='form-main-div '>
          <div className='close-window popTwo-close-window pTwo'>
            <IoArrowBackSharp className='close-icon' onClick={(e) => {
              e.preventDefault()
              props.close('visible')
              props.visibleFunc('hidden')
            }} />
            <span className='desc-span'>Description</span>
            <AiOutlineCloseSquare className='close-icon' onClick={() => {
              props.visibleFunc('hidden')
            }} />
          </div>
          <div className='desc-input-div'>
            <p className='desc-p'>describe your issue here</p>
            <textarea type="text" className='desc-input' height="60" onChange={(e) => {
              e.preventDefault()
              setIssue(e.target.value)
            }} />
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
          <button className='popUp-next-btn popupTwo-nxt-btn' onClick={(e) => {
            e.preventDefault()
            setVisibleC('visible')
            props.visibleFunc('hidden')
          }}>Next</button>
        </div>
      </form>
      <PopupThree userInfo={props.userInfo} visibilityB={props.visibleFunc} visibleC={visibleC} visibleCFunc={setVisibleC} popOneVal={props.popOneVal} popTwoVal={issue}/>
    </div>
  )
}

export default PopupTwo