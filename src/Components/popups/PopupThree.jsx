import React from 'react'
import { AiOutlineDownSquare, AiOutlineCloseSquare } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import { BsCreditCard2BackFill } from "react-icons/bs";

const PopupThree = (props) => {
  console.log(props.popOneVal[0])
  return (
    <div className='popup-three-main offer-popUp1' style={{visibility:props.visibleC}}>
        <div className='form-main-div'>
          <div className='close-window popTwo-close-window'>
            <IoArrowBackSharp className='close-icon' onClick={(e)=>{
              e.preventDefault()
              props.visibilityB('visible')
              props.visibleCFunc('hidden')
            }}/>
           <span className='desc-span'></span>
            <AiOutlineCloseSquare className='close-icon' onClick={()=>{
              props.visibleCFunc('hidden')
            }}/>
          </div>
          <div>
           {
            props.userInfo.map(data=>{
                return(
                    <div className='user-contents'>
                        <img src={data.image} alt="user's-image" className='popupThree-image'/>
                       <div>
                         <span className='name-spn'>{data.name }</span><span className='name-spn'>{ data.surName}</span>
                       </div> 
                        <span><small>{data.email}</small></span>
                        <span><small>(+33){data.phoneNumber}</small></span>
                        <div className='creditCard-div'>
                            <span className='visa-spn'>Visa</span> <span>49..........4290</span> <BsCreditCard2BackFill className='card-icon'/>
                        </div>
                        <div className='verfication-div'>
                            <div className="cercle"></div><div className="cercle"></div><div className="cercle"></div><div className="cercle"></div>
                        </div>
                        <span className='sms-msg'>Enter the code received by sms</span>
                        <button className='popUp-next-btn popupTwo-nxt-btn'>Verify</button>
                    </div>
                )
            })
           }
          </div>
        </div>
    </div>
  )
}

export default PopupThree