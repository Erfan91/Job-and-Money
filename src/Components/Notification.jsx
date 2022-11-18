import React from 'react'
import { createContext } from 'react';
import { useEffect, useState, useContext } from 'react'
import { GoPrimitiveDot } from "react-icons/go";
import { Link } from 'react-router-dom';
import { OfferContext } from '../App';
import ProfileInView from './NtfnOffer';

const Notification = (props) => {
  const id = JSON.stringify(localStorage.getItem('_id'))
  const ids = JSON.parse(id)
  const [notifications, setNotifications] = useState([])
  const [isNotif, setIsNotif] = useState(Boolean)
  const [ntfnIndex, setIndex] = useState(null)
  const [display, setDisplay] = useState('none')

  useEffect(() => {
    fetch(`http://localhost:3001/ntfn/${ids}`)
      .then(result => result.json())
      .then(json => {
        const arr = [json]
        for (var i = arr.length - 1; i >= 0; i--) {
          arr[i].map((content, index) => {
            if (content.seen !== true) {
              props.isTrue(true)
            }else{
              props.isTrue(false)
            }
          })
        }
        setNotifications(json)
      })
  }, [])

  useEffect(() => {
    fetch(`http://localhost:3001/ntfn/${ids}`)
      .then(result => result.json())
      .then(json => {
        const arr = [json]
        for (var i = arr.length - 1; i >= 0; i--) {
          arr[i].map((content, index) => {
            if (content.seen !== true) {
              props.isTrue(true)
            }else{
              props.isTrue(false)
            }
          })
        }
        setNotifications(json)
      })
      refresher()
  }, [])

  const ntfnChecked = (id) => {
    fetch('http://localhost:3001/ntfn', {
      method: 'PUT',
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        _id: id
      })
    })
      .then(result => result.json())
      .then(json => {
        console.log(json)
      })
      refresher()
  }

  const refresher = () => {
    fetch(`http://localhost:3001/ntfn/${ids}`)
      .then(result => result.json())
      .then(json => {
        console.log(json, "notifsS")
        const arr = [json]
        for (var i = arr.length - 1; i >= 0; i--) {
          arr[i].map((content, index) => {
            if (content.seen !== true) {
              props.isTrue(true)
            }else{
              props.isTrue(false)
            }
          })
        }
        setNotifications(json)
      
      })
  }

  useEffect(()=>{
    if(props.display){
      setDisplay('flex')
    }else{
      setDisplay('none')
    }
  })
  const [offerId, setOfferId] = useState('')
const newPath = {
  pathname : "/pro-inView",
  param1 : offerId
}

const getIndex = (content) =>{
  const arr = [content]
  for(var i = 0; i<= arr.length; i++ ){
    console.log(content, "COntentebdugjdhb")
  }
  refresher()
}
  return (
    <div className='ntfn-main-div' style={{display: display}}>
      <div className='ntfn-head-div'>
        <GoPrimitiveDot className='dot-icon' />
        <span>Notifications</span>
      </div>
      <div >
        {
          notifications.map((content, index) => {
            const arr = [content]
            for(var i = arr.length -1; i >= 0; i--){
              console.log(arr[i])
              return (
                <>
                  {arr[i].seen ?
                   <Link className='link' to={"/ntfn-offer/"+  arr[i].subjectId._id }> 
                   <div className='ntfn-content seen-ntfn-content' onClick={()=>{
                      setIndex(ntfnIndex => ntfnIndex === index ? null : index)
                      refresher()
                      getIndex(content)
                    }}>
                      <img src={content.userId.image} alt="image not found" className='ntfn-user-image' />
                      <div>
                        <span className='ntfn-title-span'>{content.subjectId.title}</span>
                        <p className='ntfn-p'> <span>@{content.userId.userName}</span> {content.message}</p>
                      </div>

                    </div></Link>
                    :
                    <div className='ntfn-content' onClick={() => {
                      setIndex(ntfnIndex => ntfnIndex === index ? null : index)
                      ntfnChecked(content._id)
                      refresher()
                    }}>
                      <img src={content.userId.image} alt="image not found" className='ntfn-user-image' />
                      <div>
                        <span className='ntfn-title-span'>{content.subjectId.title}</span>
                        <p className='ntfn-p'> <span>@{content.userId.userName}</span> {content.message}</p>
                      </div>
                    </div>
                  }
                </>
              )
            }
          })
        }
      </div>
    </div> 
  )
}

export default Notification