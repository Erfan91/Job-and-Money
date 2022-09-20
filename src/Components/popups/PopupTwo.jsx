import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineDownSquare, AiOutlineCloseSquare } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import PopupThree from './PopupThree';
import axios from 'axios';

const PopupTwo = (props) => {
  const [visibleC, setVisibleC] = useState('hidden')
  const [issue, setIssue] = useState('');  
  const [imgBoolean, setImageBoolean] = useState(Boolean)
  const imageUploader = React.useRef(null);
  const imageUploader1 = React.useRef(null);
  const imageUploader2 = React.useRef(null);
  const imageUploader3 = React.useRef(null);
  const imageUploader4 = React.useRef(null);
  const imageUploader5 = React.useRef(null);
  const [myImage, setImage] = useState('');
  const [file, setFile] = useState([]);
  console.log(file, "OUT OF FUNCTION")
  const [display, setDisplay] = useState('block')
  
  let uploadedImage = React.useRef(null);
  const imageChanger = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      setImage(e.target.files[0])
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file);
    }
  }
  const uploadedImage1 = React.useRef(null);
  const imageChanger1 = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage1;
      setImage(e.target.files[0])
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file);
    }
  }

  const uploadedImage2 = React.useRef(null);
  const imageChanger2 = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage2;
      setImage(e.target.files[0])
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file);
    }
  }

  const uploadedImage3 = React.useRef(null);
  const imageChanger3 = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage3;
      setImage(e.target.files[0])
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file);
    }
  }

  const uploadedImage4 = React.useRef(null);
  const imageChanger4 = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage4;
      setImage(e.target.files[0])
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file);
    }
  }

  const uploadedImage5 = React.useRef(null);
  const imageChanger5 = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage5;
      setImage(e.target.files[0])
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file);
    }
  }


  const uploadImage = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('myImage', myImage)
    axios({
      method: "post",
      url: 'http://localhost:3001/offer/upload-image',
      data: formData
    })
      .then(result => {
        const { data } = result;
        setFile(file => [...file, data.url])
        console.log(file,'FIELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLSSSSSSSSSSSSESESE')

      })
      .catch(err => {
        console.log(err)
      })
    setDisplay('none')
  }


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
              setImageBoolean(true)
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
            {/* <div className='desc-upload-div'>
              <span className='desc-img-span'>images</span>
              <button className='desc-upload-btn'>upload images</button>
              <span className='desc-upload-span'>you can upload up to six images</span>
            </div> */}
            <div className='img-names-div'>
              <div className='issue-img1-div'>
                <input type="file" accept='/image*' ref={imageUploader} onChange={imageChanger} style={{ display: 'none' }} />
                <div className='issue-img1-div2' onClick={() => {
                  imageUploader.current.click()
                  setDisplay('none')
                }}>
                  <img ref={uploadedImage} className='issue-image' />
                </div>
                <button onClick={uploadImage} className='upload-btn'>Upload</button>
              </div>
              <div className='issue-img1-div'>
                <input type="file" accept='/image*' ref={imageUploader1} onChange={imageChanger1} style={{ display: 'none' }} />
                <div className='issue-img1-div2' onClick={() => {
                  imageUploader1.current.click()
                  setDisplay('none')
                }}>
                  <img ref={uploadedImage1} className='issue-image' />
                </div>
                <button onClick={uploadImage} className='upload-btn'>Upload</button>
              </div>
              <div className='issue-img1-div'>
                <input type="file" accept='/image*' ref={imageUploader2} onChange={imageChanger2} style={{ display: 'none' }} />
                <div className='issue-img1-div2' onClick={() => {
                  imageUploader2.current.click()
                  setDisplay('none')
                }}>
                  <img ref={uploadedImage2} className='issue-image' />
                </div>
                <button onClick={uploadImage} className='upload-btn'>Upload</button>
              </div>
              <div className='issue-img1-div'>
                <input type="file" accept='/image*' ref={imageUploader3} onChange={imageChanger3} style={{ display: 'none' }} />
                <div className='issue-img1-div2' onClick={() => {
                  imageUploader3.current.click()
                  setDisplay('none')
                }}>
                  <img ref={uploadedImage3} className='issue-image' />
                </div>
                <button onClick={uploadImage} className='upload-btn'>Upload</button>
              </div>
              <div className='issue-img1-div'>
                <input type="file" accept='/image*' ref={imageUploader4} onChange={imageChanger4} style={{ display: 'none' }} />
                <div className='issue-img1-div2' onClick={() => {
                  imageUploader4.current.click()
                  setDisplay('none')
                }}>
                  <img ref={uploadedImage4} className='issue-image' />
                </div>
                <button onClick={uploadImage} className='upload-btn'>Upload</button>
              </div>
              <div className='issue-img1-div'>
                <input type="file" accept='/image*' ref={imageUploader5} onChange={imageChanger5} style={{ display: 'none' }} />
                <div className='issue-img1-div2' onClick={() => {
                  imageUploader5.current.click()
                  setDisplay('none')
                }}>
                  <img ref={uploadedImage5} className='issue-image' />
                </div>
                <button onClick={uploadImage} className='upload-btn'>Upload</button>
              </div>
            </div>
          </div>
          <button className='popUp-next-btn popupTwo-nxt-btn' onClick={(e) => {
            e.preventDefault()
            setVisibleC('visible')
            props.visibleFunc('hidden')
          }}>Next</button>
        </div>
      </form>
      <PopupThree userInfo={props.userInfo} visibilityB={props.visibleFunc} visibleC={visibleC} visibleCFunc={setVisibleC} popOneVal={props.popOneVal} popTwoVal={issue} images={file}/>
    </div>
  )
}

export default PopupTwo