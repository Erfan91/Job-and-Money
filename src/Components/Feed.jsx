import React, { useState } from 'react'
import { BiMessage, BiNotification, BiSearch, BiEuro, BiUpArrowAlt } from "react-icons/bi";
import { BsCreditCard2BackFill, BsClock, BsReplyAllFill } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { FaMoneyBillWave, FaUsers } from "react-icons/fa";

import { useEffect } from 'react';
const Feed = () => {
  const [offers, setOffers] = useState([])
  useEffect(() => {
    fetch('http://localhost:3001/offer')
      .then(result => result.json())
      .then(json => {
        console.log(json, 'MY JSON')

        setOffers(json)
      })
  }, [])
  // console.log(offers)
  return (
    <div className='feed-main-div'>
      <nav className='pro-nav'>
        <div className='nav-child1'>
          <span className='pro-nav-span'>Job&Money</span>
        </div>
        <div className='nav-child2'>
          <BiNotification className='pro-icons' />
          <BiMessage className='pro-icons' />
          {/* <img src={} alt="profile image"/> */}
          <div className='pro-pic-div'></div>
        </div>
      </nav>
      <div className="offers-main-div">
        <section className='offers-list'>
          {
            offers.map(offer => {
              console.log(offer, "SAME THING")
              return (
                <div className='offer-card'>
                  <div className='card-title'>
                    <span className='title-span'>{offer.title}</span>
                    {offer.specialist ? <button className='card-pro-btn'>Pro</button> : <button className='card-pro-btn card-pro-btn-off'>Pro</button>}
                  </div>
                  <div className="detailes-preview">
                    <div className='hour-card dtl-card'>
                      <div className="hours-dtl-div icon-container">
                        <BsClock className='hour-icon dtl-icon' />
                        <span className='icon-span'>Time</span>
                      </div>
                      <div className='card-line'></div>
                      <div className='hours-dtl-div'>
                        <span className='dtl-span'>{offer.estimatedTime}</span>
                        {offer.startingFrom[0] !== '1' ? <span className='dtl-span'>{offer.startingFrom}-{+offer.startingFrom[1] + parseInt(offer.estimatedTime[0]) + ':' + offer.startingFrom[3] + offer.startingFrom[4]}</span> : <span className='dtl-span'>{offer.startingFrom}-{parseInt(offer.startingFrom[0] + offer.startingFrom[1]) + parseInt(offer.estimatedTime[0]) + ':' + offer.startingFrom[3] + offer.startingFrom[4]}</span>}
                      </div>
                    </div>
                    <div className="location-card dtl-card">
                      <div className="hours-dtl-div icon-container">
                        <GrMapLocation className='location-icon dtl-icon' />
                        <span className='icon-span'>Location</span>
                      </div>
                      <div className="card-line"></div>
                      <div className="hours-dtl-div">
                        <span className='dtl-span'>{offer.city} ({offer.postalCode})</span>
                        <span className='dtl-span'>{offer.address}</span>
                      </div>
                    </div>
                    <div className="money-card dtl-card">
                      <div className="hours-dtl-div icon-container">
                        <FaMoneyBillWave className='money-icon dtl-icon' />
                        <span className='icon-span'>Payment</span>
                      </div>
                      <div className="card-line"></div>
                      <div className="hours-dtl-div">
                        <span className='dtl-span'>{offer.amount}<BiEuro /></span>
                        <span className='dtl-span'>{offer.paymentMethod}</span>
                      </div>
                    </div>
                    <div className="workers-card dtl-card">
                      <div className="hours-dtl-div icon-container">
                        <FaUsers className='workers-icon dtl-icon' />
                        <span className='icon-span'>Workers</span>
                      </div>
                      <div className="card-line"></div>
                      <div className="hours-dtl-div">
                        {offer.workers > 1 ? <span className='dtl-span'>{offer.workers}-Persons</span> : <span className='dtl-span'>{offer.workers}-Person</span>}
                        {/* when more than one worker is needed in an offer the zero below represents the number of workers applied for example an offer that needs more than 1 worker, when a worker applies and get accepted the zero changes to 1 and arrow changes color. by default its grey */}
                        <span className='dtl-span'><BiUpArrowAlt />0</span>
                      </div>
                    </div>
                    <div className="reply-card dtl-card">
                      <div className="hours-dtl-div icon-container">
                        <BsReplyAllFill className='reply-icon dtl-icon' />
                        <span className='icon-span'>Reply</span>
                      </div>
                      <div className="card-line"></div>
                      <div className="hours-dtl-div">
                        <span className='dtl-span'>Less than 30 minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </section>
        <section className='offers-detail'>
          
        </section>
      </div>
    </div>
  )
}

export default Feed