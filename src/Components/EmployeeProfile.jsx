import React from 'react'
import { useState, useEffect } from 'react';
import { BiMessage, BiNotification, BiSearch } from "react-icons/bi";
import { BsFilePerson } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { MdOutlineDocumentScanner, MdOutlineAutoGraph } from "react-icons/md";

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
            <div className="empe-offers content-div empe-cv">
              <div>
                <FaRegHandshake className="deal-icon cv-icon"/>
                <span>My offers</span>
              </div>
            </div>
            <div className="empe-cv content-div">
              <div>
                <BsFilePerson className='cv-icon'/>
                <span>My Cv</span>
              </div>
            </div>
            <div className="personal-info content-div empe-cv">
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
            <div className="information-documents content-div empe-cv">
              <div>
                <HiOutlineDocumentDuplicate className='doc-icon cv-icon'/>
                <span>My Documents</span>
              </div>
            </div>
            <div className="rating-comments content-div empe-cv">
              <div>
                <MdOutlineAutoGraph className='rating-icon cv-icon'/>
                <span>Reviews</span>
              </div>
            </div>
        <div className='glass-div '>
        </div>
        <div className='glass-div glass-2 '>
        </div>
        <div className='glass-div glass-3'>
        </div>
        <div className='glass-div glass-4 '>
        </div>
        <div className="glass-div glass-5"></div>
        <div className="glass-div glass-6 "></div>

        </div>
        
    </div>
  )
}

export default EmployeeProfile