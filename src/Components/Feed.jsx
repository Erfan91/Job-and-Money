import React, { useState } from 'react'
import { BiMessage, BiNotification, BiSearch } from "react-icons/bi";
import { BsCreditCard2BackFill, BsClock, BsReplyAllFill } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { FaMoneyBillWave, FaUsers } from "react-icons/fa";

import { useEffect } from 'react';
const Feed = () => {
  const [offers, setOffers] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3001/offer')
    .then(result=>result.json())
    .then(json=>{
      console.log(json,'MY JSON')
      setOffers(json)
    })
  },[])
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
            offers.map(offer=>{
              console.log(offer, "SAME THING")
              return(
                <div className='offer-card'>
                  <div className='card-title'>
                    <span>{offer.title}</span>
                    {offer.specialist?<button className='card-pro-btn'>Pro</button>:<button className='card-pro-btn card-pro-btn-off'>Pro</button>}
                  </div>
                  <div className="detailes-preview">
                    {/* to add little options lookalike horizontal cards for each info about offer like hour money workers.... to be done tomorrow */}
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