import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
const Offers = () => {
 const [info, setInfo] = useState([]);
 const id = JSON.stringify(localStorage.getItem('_id'))
 const ids = JSON.parse(id)
 useEffect(()=>{
  fetch(`http://localhost:3001/offer/apld/${ids}`)
  .then(result=>result.json())
  .then(json=>{
    console.log(json)
    setInfo([json])
  })
 },[])
  return (
    <div className='my-offers-main-div'>
        <div className='in-process'>
        
        </div>
        <div className="done-offers">

        </div>
    </div>
  )
}

export default Offers