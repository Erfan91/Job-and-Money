import React, { useState } from 'react'
import { BiMessage, BiNotification, BiSearch, BiEuro, BiUpArrowAlt } from "react-icons/bi";
import { BsCreditCard2BackFill, BsClock, BsReplyAllFill, BsFillCalendarDateFill, BsPlus } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { FaMoneyBillWave, FaUsers } from "react-icons/fa";
import { MdPayments, MdLocationOn, MdOutlineMailOutline, MdOutlineClose } from "react-icons/md";
import { AiOutlineFieldTime, AiOutlinePhone, AiOutlineSearch } from "react-icons/ai";
import { IoChevronForward, IoCloseOutline } from "react-icons/io5";
import { IoIosNotifications, IoIosCheckmarkCircle } from "react-icons/io";
import random from '../images/up.jpg'
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { OfferContext } from '../App';
import { useContext } from 'react';
import {motion} from 'framer-motion'
import SearchWindow from './SearchWindow';
const Feed = () => {
  const Navigate = useNavigate()
  const [offers, setOffers] = useState([]);
  const [title, setTitle] = useState('');
  const [payment, setPayment] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [employer, setEmployer] = useState('');
  const [empNumber, setENumber] = useState('');
  const [empEmail, setEmpEmail] = useState('')
  const [empImg, setEmpImg] = useState('');
  const [postDate, setPDate] = useState('');
  const [srchDisplay, setHDisplay] = useState('none')
  const [srchBtnDisplay, setSrchBtnD] = useState('block');
  const [info, setInfo] = useState([])
  const [updateMsg, setUpdateMsg] = useState('');
  const [srchMode, setSrchMode] = useState('User');
  const [placeholder1, setPlaceHolder1] = useState('username');
  const [placeholder2, setPlaceHolder2] = useState('City')
  const [redBgColor, setRedBg] = useState({});
  const [greenBgColor, setGreenBg] = useState('');
  const [images, setImages] = useState([]);
  const [appliedMsgDisplay, setAppliedDis] = useState('');
  const [position, setPosition] = useState('')
  const [width, setWidth] = useState('')
  const bref = React.useRef(null);
  const [ref, inView] = useInView();
  const [offerId, setOfferId] = useState('');
  const [empDivJcontent, setJcontent] = useState('')
  const [posterId, setPosterId] = useState('')
  const [winHeight, setwinHeight] = useState('')
  const id = JSON.stringify(localStorage.getItem('_id'))
  const ids = JSON.parse(id)
  const {setDisplayN} = useContext(OfferContext)
  const [searchName, setSearchName] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchBorder, setSearchBorder] = useState('');
  // Animation States
  const [transit, setTransit] = useState({})
  const [initial, setInitial] = useState({y:-2})
  const [animate, setAnimation] = useState({y:0})

  const [displayS, setDisplayS] = useState('none')
  useEffect(() => {
    fetch('http://localhost:3001/offer')
      .then(result => result.json())
      .then(json => {
        console.log(json, 'MY JSON')
        setOffers(json)
        setTitle(json[0].title)
        setPayment(json[0].paymentMethod)
        setDate(moment(json[0].startingFrom).format("MMM Do YY, h:mm:ss a"))
        setAddress(json[0].address + ", " + json[0].city + " (" + json[0].postalCode + ")")
        setDescription(json[0].description)
        setAmount(json[0].amount)
        setEmployer(json[0].posterID.name + " " + json[0].posterID.surName);
        setENumber(json[0].posterID.phoneNumber)
        setEmpEmail(json[0].posterID.email)
        setEmpImg(json[0].posterID.image)
        setPosterId(json[0].posterID._id)
        setPDate(json[0].createdAt)
        setImages(json[0].images)
        setOfferId(json[0]._id)

      })
      if(offers.length > 3){
        setwinHeight('auto')
      }else{
        setwinHeight('100vh')
      }
  }, [])

  useEffect(() => {
    fetch(`http://localhost:3001/user/${ids}`)
      .then(result => result.json())
      .then(json => {
        console.log(json)
        setInfo([json])
      })
      setDisplayN('flex')
  }, [])
  // onMouseMove={()=>{ console.log(window.pageYOffset,"SCROLL HEIGHT///////")}}
  // console.log(window.innerHeight,"INNER HEIGHT")

  const updater = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/offer', {
      method: 'PUT',
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        offerId: offerId,
        workerId: ids,
        posterId: posterId
      })
    }).then(result => result.json())
      .then(json => {
        console.log(json, "THIS IS JSON")
        setUpdateMsg(json.message)
        if(json.message !== ""){
          setAppliedDis('none')
        }else{
          setUpdateMsg(json.message)
          setJcontent('center')
        }
      })
  }


  const searchUser = () =>{
    if(searchName == ""){
      setSearchBorder('0.5px solid red')
      setDisplayS('flex')

    }else{
       fetch('http://localhost:3001/user/srchd',{
      method: 'POST',
      headers: new Headers({"content-type":"application/json"}),
      body: JSON.stringify({
        username: searchName,
        city: searchCity
      })
    }).then(result=>result.json())
    .then(json=>{
      console.log(json, "Search Result")
      setSearchResult(json)
    })
    setDisplayS('flex')
    }
   
  }

  const searchOffer = () =>{
    fetch('http://localhost:3001/offer/srchd',{
      method: 'POST',
      headers: new Headers({"content-type":"application/json"}),
      body: JSON.stringify({
        title: searchName,
        city: searchCity
      })
    }).then(result=>result.json())
    .then(json=>{
      console.log(json)
      setSearchResult(json)
    })
    setDisplayS('flex')
  }

  return (
    <>
      <div className='feed-main-div' style={{height: winHeight}}>
        <div className="offers-main-div">
          <section className='offers-list'>
            {
              offers.map(offer => {
                // console.log(offer, "SAME THING")
                return (
                  <div className='offer-card' onClick={() => {
                    setTitle(offer.title)
                    setPayment(offer.paymentMethod)
                    setDate(offer.startingFrom)
                    setAddress(offer.address + ", " + offer.city + " (" + offer.postalCode + ")")
                    setDescription(offer.description)
                    setAmount(offer.amount)
                    setEmployer(offer.posterID.name + " " + offer.posterID.surName);
                    setENumber(offer.posterID.phoneNumber)
                    setEmpEmail(offer.posterID.email)
                    setEmpImg(offer.posterID.image)
                    setPDate(offer.createdAt)
                    setImages(offer.images)
                    setOfferId(offer._id)
                  }}>
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
                    <div className="app-messages">
                      <p className='app-text'>This offer requires skills as you have and its nearby </p>
                      <p className='app-text'>posted on {moment(postDate).format('MMM Do, h:mm a' )} by <span className='employer-span'>{offer.posterID.name + " " + offer.posterID.surName}</span> </p>
                    </div>
                  </div>
                )
              })
            }
          </section>
          <section className='offers-detail' ref={bref}>
            <div className='offer-desc-page' style={{ position: position, width: width }}>
              <div className='offer-page'>
                <div className='offer-info'>
                  <h4 className='title-h4'>{title}</h4>
                  <div className='info-container'>
                    <AiOutlineFieldTime className='date-icon info-icons' />
                    <span className='info-span dte-span'>Date: Needed before  {date}</span>
                  </div>
                  <div className="info-container">
                    <MdPayments className='pay-icon info-icons' />
                    <span className='info-span pmnt-span'>{payment}: {amount} Euros</span>
                  </div>
                  <div className="info-container">
                    <MdLocationOn className='location2-icon info-icons' />
                    <span className='info-span adrs-span'>Address: {address}</span>
                  </div>
                  <div className='description-container'>
                    <div className='desp-div'>
                      <span className='des-span'>Description</span>
                      <div className='hori-line'></div>
                    </div>
                    <div className='text-container'>
                      <p>{description}</p>
                      {
                        images.map(img => {
                          return (
                            <img src={img} alt="" className='offer-images-iss' width="450px" height="250px" style={{ marginLeft: "20px" }} />
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className='employer-info'>
                  <div className="hori-line"></div>
                  <div className="apply-div" style={{display:appliedMsgDisplay}}>
                    <div className='emp-img-div'>
                      <img src={empImg} alt="offer owner" className='employer-img' />
                      <button className='msg-btn'><BsPlus className='pls-icon' /> Message</button>
                    </div>
                    <button className='apply-btn' onClick={updater}>Apply</button>
                  </div>
                    {appliedMsgDisplay !== "" ? 
                    <div className='apld-msg-div'  style={{alignItems:empDivJcontent}}>
                      <p><small>{updateMsg}</small></p>
                      <IoIosCheckmarkCircle className='verified-icon'/>
                    </div>:<div style={{display:"none"}}></div>}
                  <div className='employer-content' style={{display:appliedMsgDisplay}}>
                    <span className='employer-name'>{employer}</span>
                    <div>
                      <AiOutlinePhone className='phone-icon' />
                      <span className='emp-number'><strong>phone</strong>: {empNumber}</span>
                    </div>
                    <div>
                      <MdOutlineMailOutline className='email-icon' />
                      <span className='emp-email'><strong>email</strong>: {empEmail}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='invisible-div' ref={ref} >
          </div> */}
          </section>
        </div>
        <div className='srch-popup' style={{ display: srchBtnDisplay }} onClick={() => {
          setSrchBtnD('none')
          setHDisplay('flex')
        }}>
          <span className='srch-span'>Search</span>
        </div>
        <div className='srch-footer' style={{ display: srchDisplay }}>
          <div className='close-icon-div'>
            <IoCloseOutline className='srch-close-icon' style={redBgColor} onMouseEnter={() => {
              setRedBg({ backgroundColor: 'rgba(253, 95, 95, 0.379)', opacity: '1' })
            }} onMouseLeave={() => { setRedBg({ backgroundColor: 'transparent', opacity: '0.4' }) }} onClick={() => {
              setSrchBtnD('block')
              setHDisplay('none')
              setDisplayS('none')
              setSearchBorder('')
              setSearchName('')
            }} />
          </div>
          <div className='search-container'>
            <div className='srch-container-child1'>
              <span className='srch-header'>Search {srchMode}</span>
            </div>
            <div className='srch-container-child2'>
              <motion.input type="text" placeholder={placeholder1} className='srch-input' initial={initial} animate={animate} transition={transit} style={{border: searchBorder}} onChange={e=>setSearchName(e.target.value)} onClick={()=>setSearchBorder('')}/>
              <button className='selector' onClick={()=>{
                if(srchMode == 'User'){
                  setSrchMode('Offer')
                  setPlaceHolder1('Plumber')
                }else if(srchMode == 'Offer'){
                  setSrchMode('User')
                  setPlaceHolder1('username')
                }
              }}>{srchMode}</button>
              <input type="text" placeholder={placeholder2} className='srch-input' onChange={e=>setSearchCity(e.target.value)}/>
            </div>
          </div>
          <div className='frwd-icon-div'>
           {srchMode == 'User'? <IoChevronForward className='srch-frwd-icon'
             style={greenBgColor}
             onClick={searchUser}
             onMouseEnter={() => { setGreenBg({ backgroundColor: 'rgba(127, 255, 212, 0.378)', opacity: '1' }) }}
             onMouseLeave={() => { setGreenBg({ backgroundColor: 'transparent', opacity: '0.4' }) }} />
            :
            srchMode == 'Offer'? <IoChevronForward className='srch-frwd-icon'
            style={greenBgColor}
            onClick={searchOffer}
            onMouseEnter={() => { setGreenBg({ backgroundColor: 'rgba(127, 255, 212, 0.378)', opacity: '1' }) }}
            onMouseLeave={() => { setGreenBg({ backgroundColor: 'transparent', opacity: '0.4' }) }} />
            : 
            <IoChevronForward className='srch-frwd-icon'
            style={greenBgColor}
            onClick={()=>setSearchBorder('0.5px solid red')}
            onMouseEnter={() => { setGreenBg({ backgroundColor: 'rgba(127, 255, 212, 0.378)', opacity: '1' }) }}
            onMouseLeave={() => { setGreenBg({ backgroundColor: 'transparent', opacity: '0.4' }) }} />
            }
          </div>
        </div>
          <SearchWindow displayS={displayS} display={setDisplayS} data={searchResult}/>
      </div>
    </>
  )
}

export default Feed;