import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiMessage, BiNotification, BiSearch } from "react-icons/bi";
import { BsFilePerson } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { MdOutlineDocumentScanner, MdOutlineAutoGraph } from "react-icons/md";
import Messages from './Messages';
import { OfferContext } from '../App';
import { useContext } from 'react';
const EmployeeProfile = () => {
  const Navigate = useNavigate()
  const [info, setInfo] = useState([])
  const [msgDisplay, setMsgDisplay] = useState('none')
  const id = JSON.stringify(localStorage.getItem('_id'))
  const ids = JSON.parse(id)
  const { setDisplayN } = useContext(OfferContext)

  useEffect(() => {
    fetch(`http://localhost:3001/user/${ids}`)
      .then(result => result.json())
      .then(json => {
        console.log(json)
        setInfo([json])
      })
    setDisplayN('flex')
  }, [])

  const sendProfession = (e)=>{
    e.preventDefault()
    fetch('http://localhost:3001/user/profession',{
      method: 'PUT',
      headers: new Headers({"content-type":"application/json"}),
      body: JSON.stringify({
        id: ids,
        profession: profession
      })
    }).then(result=>result.json())
    .then(json=>{
      console.log(json)
    })
    fetch(`http://localhost:3001/user/${ids}`)
      .then(result => result.json())
      .then(json => {
        console.log(json)
        setInfo([json])
      })
  }
  const [profession, setProfession] = useState('')
  return (
    <div className='empe-profile-main-div'>
      <div className='empe-content-div'>
        <Messages display={msgDisplay} />
        <div className='resp-div-1'>
          <div className="empe-offers content-div empe-cv">
            <div>
              <FaRegHandshake className="deal-icon cv-icon" />
              <span>My offers</span>
            </div>
          </div>
          <div className="empe-cv cc-v content-div">
            <div>
              <BsFilePerson className='cv-icon' onClick={() => {
                Navigate(`/cv/${ids}`)
              }} />
              <span>My Cv</span>
            </div>
          </div>
          <div className="personal-info content-div empe-cv">
            {
              info.map(user => {
                return (
                  <div className='info-div-child'>
                    <img src={user.image} className="empe-pro-img" />
                    <div className='empee-prfl-pInfo'>
                    <span className='empe-name-span'>{user.name} {user.surName}</span>
                    <span className='username-span'>@{user.userName}</span>
                    {!user?.profession?
                    <div className='profession-div'>
                      <input className='profession-input' placeholder='carpenter' onChange={(e)=>{
                        setProfession(e.target.value)
                      }}/>
                     {profession !==""? <button className='profession-button' onClick={sendProfession}>submit</button>: <span className='profession-sm-input'>Enter your profession</span>}
                    </div>
                    :
                      <span className='profession-span'>i am {user?.profession}</span>
                    }
                    </div>
                   
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="resp-div-1">
          <div className="information-documents content-div empe-cv">
            <div>
              <HiOutlineDocumentDuplicate className='doc-icon cv-icon' onClick={() => {
                Navigate('/docs')
              }} />
              <span>My Documents</span>
            </div>
          </div>
          <div className="rating-comments content-div empe-cv">
            <div>
              <MdOutlineAutoGraph className='rating-icon cv-icon' />
              <span>Reviews</span>
            </div>
          </div>
        </div>
        <div className="glass-container">
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

    </div>
  )
}

export default EmployeeProfile