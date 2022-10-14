import React from 'react'
import { useEffect, useState } from 'react'
import { GoPrimitiveDot } from "react-icons/go";

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
  // const checkNtfn = (event) =>{
  //   let div = Array.from(event.currentTarget.children)
  //   // let divC = Array.from(div.children)
  //   // console.log(div, "DivDivDiv")
  // for(var i = div.length -1; i >= 0; i--){
  //   console.log(div[i].className)
  //   div[i].className !== "ntfn-content seen-ntfn-content" ? props.isTrue(true) : props.isTrue(false)
  // }
  // }
  useEffect(()=>{
    if(props.display){
      setDisplay('flex')
    }else{
      setDisplay('none')
    }
  })

  return (
    <div className='ntfn-main-div' style={{display: display}}>
      <div className='ntfn-head-div'>
        <GoPrimitiveDot className='dot-icon' />
        <span>Notifications</span>
      </div>
      <div >
        {
          notifications.map((content, index) => {
            return (
              <>
                {content.seen ?
                  <div className='ntfn-content seen-ntfn-content' >
                    <img src={content.userId.image} alt="image not found" className='ntfn-user-image' />
                    <div>
                      <span className='ntfn-title-span'>{content.subjectId.title}</span>
                      <p className='ntfn-p'> <span>@{content.userId.userName}</span> {content.message}</p>
                    </div>
                  </div>
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
          })
        }
      </div>
    </div>
  )
}

export default Notification