import React, { useState } from 'react'
import { AiOutlineDownSquare, AiOutlineCloseSquare } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import { BsCreditCard2BackFill, BsClock } from "react-icons/bs";

const PopupThree = (props) => {
  console.log(props.images, "¨POP THREE FILE")
  let [numbers, setNumbers] = useState([]);
  const [display, setDisplay] = useState('none')

  const sender = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/offer', {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        title: props.popOneVal.title,
        posterID: props.popOneVal.ids,
        specialist: props.popOneVal.pro,
        description: props.popTwoVal,
        workers: props.popOneVal.workers,
        date: props.popOneVal.date,
        estimatedTime: props.popOneVal.estimatedTime,
        startingFrom: props.popOneVal.startHour,
        paymentMethod: props.popOneVal.payment,
        amount: props.popOneVal.amount,
        address: props.popOneVal.address,
        city: props.popOneVal.city,
        postalCode: props.popOneVal.codePostal,
        images: props.images

      })
    })
  }

  const numberFunc = () => {
    setDisplay('flex')
    if (numbers.length == 0) {
      for (var i = 0; i <= 9; i++) {
        setNumbers([numbers += i])
        setDisplay('flex')
      }
    } else {
      setDisplay('none')
      setNumbers([])
    }

  }

  return (
    <div className='popup-three-main offer-popUp1' style={{ visibility: props.visibleC }}>
      <div className='form-main-div'>
        <div className='close-window popTwo-close-window'>
          <IoArrowBackSharp className='close-icon' onClick={(e) => {
            e.preventDefault()
            props.visibilityB('visible')
            props.visibleCFunc('hidden')
          }} />
          <span className='desc-span'></span>
          <AiOutlineCloseSquare className='close-icon' onClick={() => {
            props.visibleCFunc('hidden')
          }} />
        </div>
        <div>
          {
            props.userInfo.map(data => {
              return (
                <div className='user-contents'>
                  <img src={data.image} alt="user's-image" className='popupThree-image' />
                  <div>
                    <span className='name-spn'>{data.name}</span><span className='name-spn'>{data.surName}</span>
                  </div>
                  <span><small>{data.email}</small></span>
                  <span><small>(+33){data.phoneNumber}</small></span>
                  <div className='creditCard-div'>
                    <span className='visa-spn'>Visa</span>
                    <span>49..........4290</span>
                    <div>
                      <BsCreditCard2BackFill className='card-icon' />
                    </div>
                  </div>
                  <div className='verfication-div' onClick={numberFunc}>
                    <div className="cercle"></div><div className="cercle"></div><div className="cercle"></div><div className="cercle"></div>
                  </div>
                  {/* <div className='number-board' style={{display}}>
                            {
                              numbers.map(num=>{
                              return <div className='n-board-child'>

                                <span className='n-span'>{num}</span>
                              </div>
                              })
                            }
                        </div> */}
                  <span className='sms-msg'>Enter the code received by sms</span>
                  <div className="verify-btn-div">
                    <button className='popupTwo-nxt-btn verify-btn' onClick={sender}>Verify</button>
                    {/* popUp-next-btn */}
                  </div>
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