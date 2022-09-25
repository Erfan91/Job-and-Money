import React from 'react'
import { useState, useEffect } from 'react';
import { BiMessage, BiNotification, BiSearch } from "react-icons/bi";
const EmployeeProfile = () => {
    const [info, setInfo] = useState([])
    const id = JSON.stringify(localStorage.getItem('_id'))
    const ids = JSON.parse(id)
    useEffect(() => {
        fetch(`http://localhost:3001/user/${ids}`)
          .then(result => result.json())
          .then(json => {
            console.log(json)
            setInfo([json])
          })
        
      }, [])

  return (
    <div className='empe-profile-main-div'>
        <nav className='pro-nav'>
              <div className='nav-child1'>
                <span className='pro-nav-span'>Job&Money</span>
              </div>
              <div className='nav-child2'>
                <BiNotification className='pro-icons' />
                <BiMessage className='pro-icons' />
                {/* <img src={user.image} alt="profile image" className='profile-image'/> */}
              </div>
        </nav>

        <div className='empe-content-div'>
            <div className="empe-offers content-div"></div>
            <div className="empe-cv content-div">
              <div>
                <span>My Cv</span>
              </div>
            </div>
            <div className="personal-info content-div">
              {
                info.map(user=>{
                  return(
                    <div className='info-div-child'>
                      <img src={user.image} className="empe-pro-img"/>
                      <span className='empe-name-span'>{user.name} {user.surName}</span>
                      <span className='username-span'>@{user.userName}</span>
                    </div>  
                  )
                })
              }
            </div>
            <div className="information-documents content-div"></div>
            <div className="rating-comments content-div"></div>
        </div>
    </div>
  )
}

export default EmployeeProfile