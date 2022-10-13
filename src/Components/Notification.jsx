import React from 'react'
import { useEffect, useState } from 'react'
const Notification = (props) => {
    const id = JSON.stringify(localStorage.getItem('_id'))
  const ids = JSON.parse(id)
    const [notifications, setNotifications] = useState([])
    const [isNotif, setIsNotif] = useState(Boolean)
    useEffect(()=>{
        fetch(`http://localhost:3001/ntfn/${ids}`)
        .then(result=>result.json())
        .then(json=>{
            console.log(json, "notifsS")
            if(json.length){
                setIsNotif(true)
                props.isTrue(true)
            }else{
                setIsNotif(false)
            }
            setNotifications(json)
        })
    },[])
  return (
    <div>Notification</div>
  )
}

export default Notification