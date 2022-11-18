import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { OfferContext } from '../App'
import Notification from './Notification'
import { AiOutlineFieldTime, AiOutlinePhone } from 'react-icons/ai'
import { MdPayments} from 'react-icons/md'
import { MdLocationOn } from 'react-icons/md'
import { MdOutlineMailOutline } from 'react-icons/md'
import { BsPlus } from 'react-icons/bs'
import { BsFillPersonCheckFill, BsFillPersonXFill } from 'react-icons/bs'
import moment from 'moment';

const ProfileInView = (props) => {
   const id = JSON.stringify(localStorage.getItem('_id'))
   const ids = JSON.parse(id)
   const params = useParams()
   const [offer, setOffer] = useState([])
   const [images, setImages] = useState([])
   const [candids, setCandids] = useState([])
   const [offerId, setOfferId] = useState('')
   const [_id, set_Id] = useState('')
   useEffect(()=>{
    fetch(`http://localhost:3001/offer/ntfn/${params.id}`)
    .then(result=>result.json())
    .then(json=>{
      console.log(json)
      setOffer([json])
      setImages(json.images)
      setOfferId(json._id)
      setCandids(candids =>(candids = json.candidates))
    })
   },[])



  return (
    <div className='ntfn-offer-main'>
      { 
      offer.map(offer=>{
        return(
      <section className='offers-detail' >
            <div className='offer-desc-page ntfn-offer-window'>
              <div className='offer-page'>
                <div className='offer-info'>
                  <h4 className='title-h4'>{offer.title}</h4>
                  <div className='info-container'>
                    <AiOutlineFieldTime className='date-icon info-icons' />
                    <span className='info-span dte-span'>Date: Needed before  {moment(offer.date).format("MMM Do YY, h:mm a")}</span>
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
                        return(
                          <div className='candidates-content'>
                            <Link to={`/pro-nvu/${user._id}`}> <img src={user.image} className="employer-img"/></Link>
                          <span>{user.name} {user.surName}</span>
                          <p><small>@{user.userName}</small></p>
                          <div className='candidates-btn-div' key={index}>
                            <button className='reject-btn' onClick={(e)=>{
                              e.preventDefault()
                              fetch('http://localhost:3001/offer/rejectUser',{
                                method: 'PUT',
                                headers: new Headers({"content-type":"application/json"}),
                                body: JSON.stringify({
                                  _id: params.id,
                                  ownerId: user._id,
                                  userId: ids
                                })
                              }).then(result=>result.json())
                              .then(json=>{
                                console.log(json, "JDODJODJOD")
                              })
                            }}><BsFillPersonXFill className='reject-candidate-icon' /></button>
                            <button className='accept-btn' onClick={(e)=>{
                              e.preventDefault()
                              fetch('http://localhost:3001/offer/hireUser',{
                                method: 'PUT',
                                headers: new Headers({"content-type":"application/json"}),
                                body: JSON.stringify({
                                  offerId: params.id,
                                  workerId: user._id
                                })
                                }).then(result=>result.json())
                                .then(json=>{
                                  console.log(json, "User hired")
                          
                                })
                            }}><BsFillPersonCheckFill className='accept-candidate-icon'/></button>
                          </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>

        )
      })
    }
    </div>
      
  )
}

export default ProfileInView