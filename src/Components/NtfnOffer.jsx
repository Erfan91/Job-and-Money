import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { OfferContext } from '../App'
import Notification from './Notification'
import { AiOutlineFieldTime, AiOutlinePhone } from 'react-icons/ai'
import { MdPayments} from 'react-icons/md'
import { MdLocationOn } from 'react-icons/md'
import { MdOutlineMailOutline } from 'react-icons/md'
import { BsPlus } from 'react-icons/bs'
import { BsFillPersonCheckFill, BsFillPersonXFill } from 'react-icons/bs'

const ProfileInView = (props) => {
  const ft = props.id
   const params = useParams()
   const [offer, setOffer] = useState([])
   const [images, setImages] = useState([])
   const [candids, setCandids] = useState([])
   useEffect(()=>{
    fetch(`http://localhost:3001/offer/ntfn/${params.id}`)
    .then(result=>result.json())
    .then(json=>{
      console.log(json)
      setOffer([json])
      setImages(json.images)
      setCandids(candids =>(candids = json.candidates))
    })
   },[])
  return (
    <div className='ntfn-offer-main'>
      { 
      offer.map(offer=>{
        return(
      <section className='offers-detail' >
            <div className='offer-desc-page'>
              <div className='offer-page'>
                <div className='offer-info'>
                  <h4 className='title-h4'>{offer.title}</h4>
                  <div className='info-container'>
                    <AiOutlineFieldTime className='date-icon info-icons' />
                    <span className='info-span dte-span'>Date: Needed before  {offer.date}</span>
                  </div>
                  <div className="info-container">
                    <MdPayments className='pay-icon info-icons' />
                    <span className='info-span pmnt-span'>{offer.paymentMethod}: {offer.amount} Euros</span>
                  </div>
                  <div className="info-container">
                    <MdLocationOn className='location2-icon info-icons' />
                    <span className='info-span adrs-span'>Address: {offer.address}</span>
                  </div>
                  <div className='description-container'>
                    <div className='desp-div'>
                      <span className='des-span'>Description</span>
                      <div className='hori-line'></div>
                    </div>
                    <div className='text-container'>
                      <p>{offer.description}</p>
                      {
                        images.map(img => {
                          return (
                            <img src={img} alt="" width="450px" height="250px" style={{ marginLeft: "20px" }} />
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className='employer-info'>
                  <div className="hori-line"></div>
                    <h3 className='candidates-h3'>Candidates</h3>
                  <div className='candidates-div'>
                  {
                    candids.map((user, index)=>{
                     const arr = [user]
                    for(var i = arr.length -1; i >= 0; i--){
                      console.log(arr[i], "ARRI")
                      return(
                          <div className='candidates-content'>
                          <img src={arr[i].image} className="employer-img"/>
                          <span>{arr[i].name} {arr[i].surName}</span>
                          <p><small>@{arr[i].userName}</small></p>
                          <div className='candidates-btn-div'>
                            <button className='reject-btn'><BsFillPersonXFill className='reject-candidate-icon'/></button>
                            <button className='accept-btn'><BsFillPersonCheckFill className='accept-candidate-icon'/></button>
                          </div>
                          </div>
                      )
                    }

                    })
                  }

                  </div>
                  {/* <div className="apply-div" >
                    <div className='emp-img-div'>
                      <img src={offer.posterID.image} alt="offer owner" className='employer-img' />
                      <button className='msg-btn'><BsPlus className='pls-icon' /> Message</button>
                    </div>     
                  </div>
                  <div className='employer-content' >
                    <span className='employer-name'>{offer.posterID.name + offer.posterID.surName}</span>
                    <div>
                      <AiOutlinePhone className='phone-icon' />
                      <span className='emp-number'><strong>phone</strong>: {offer.posterID.phoneNumber}</span>
                    </div>
                    <div>
                      <MdOutlineMailOutline className='email-icon' />
                      <span className='emp-email'><strong>email</strong>: {offer.posterID.email}</span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            {/* <div className='invisible-div' ref={ref} >
          </div> */}
          </section>

        )
      })
    }
    </div>
      
  )
}

export default ProfileInView