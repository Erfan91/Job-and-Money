import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { IoIosNotifications } from "react-icons/io";
import { BiMessage, BiNotification, BiSearch } from "react-icons/bi";
import { AiOutlineDownSquare, AiOutlineCloseSquare } from "react-icons/ai"
import { MdOutlineDocumentScanner,  } from "react-icons/md";
import {GrDocumentUser } from "react-icons/gr";
import { GiShakingHands} from "react-icons/gi";
import { SiHandshake} from "react-icons/si";
import { RiSettingsLine } from "react-icons/ri";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import Notification from './Notification';
import PopupTwo from './popups/PopupTwo';
import Messages from './Messages';
import { BsCheckCircleFill, BsQuestionCircleFill, BsFillInfoCircleFill } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';
import {motion} from 'framer-motion'
import { OfferContext } from '../App';
import { useContext } from 'react';
const Profile = (props) => {
    const [userInfo, setInfo] = useState([])
    const [visible, setVisiblity] = useState('hidden')
    const [visibleB, setVisiblityB] = useState('hidden')
    const [proOption, setProO] = useState('Pro')
    const id = JSON.stringify(localStorage.getItem('_id'))
    const ids = JSON.parse(id)
    const [placeholder, setPlaceHolder] = useState('Per-Hour');
    const [payBoxDisplay, setPBDisplay] = useState('none')
    const [addInfo,setAddInfo] = useState('none')
    console.log(ids)
    // <Form Values> 
    const [title, setTitle] = useState('');
    const [pro, setPro] = useState(Boolean);
    const [workers, setWorkers] = useState('');
    const [date, setDate] = useState('');
    const [estimatedTime, setEstimated] = useState('');
    const [startFrom, setStart] = useState('');
    const [payment, setPayment] = useState(placeholder);
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('')
    const [codePostal, setPostalCode] = useState('')
    const [reply, setReply] = useState('');
    const startTime = JSON.stringify(startFrom)
    const startHour = JSON.parse(startTime)
    const values = {title, ids, pro, workers, date, estimatedTime, startHour, payment, amount, address, city, codePostal, reply}
    const [infoBox, setInfoBox] = useState('Hover on anything and see the info here!')
    const [infoDis, setInfoDis] = useState('flex')
    const [infoStyle, setInfoStyle] = useState('')
    const [topPosition, setTopPosition] = useState('69.5%')
    const [bGColor, setBgColor] = useState({})

    const background1 = {backgroundColor: "#0093E9",
    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"}
    const bg2 = {backgroundColor: "#85FFBD",
        backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)"
    }
    const bg3 = {backgroundColor: "#8EC5FC",
        backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"
    } 
    const bg4 = {backgroundColor: "#08AEEA",
        backgroundImage: "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)"
    }
    const bg5 = {backgroundColor: "#21D4FD",
        backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)"
    }
    const bg6 = {backgroundColor: "#3EECAC",
        backgroundImage: "linear-gradient(19deg, #3EECAC 0%, #EE74E1 100%)"
    }
    const bg7 = {backgroundColor: "#3EECAC",
        backgroundImage: "linear-gradient(19deg, #3EECAC 0%, #EE74E1 100%)"
    }
    const bg8 = {backgroundColor: "#FF9A8B",
    backgroundImage: "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)"
    }
    const bg9 = {backgroundColor: "#74EBD5",
        backgroundImage: "linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)"
    }
    const bg10 = {backgroundColor: "#FAACA8",
        backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)"
        }

    const {setDisplayN} = useContext(OfferContext)
    
    // </Form values>
    const [bgColor, setColor] = useState('');
    useEffect(() => {
        fetch(`http://localhost:3001/user/${ids}`)
            .then(result => result.json())
            .then(json => {
                // console.log(json)
                setInfo([json])
            })
            setDisplayN('flex')
    }, [])

    const [timePHolder, setTholder] = useState('');
    const [hourDis, setDisplay] = useState('hidden');
    const [isNotif, setIsNotif] = useState(Boolean)

    return (
        <div className='pro-main-div' style={bGColor}>
            <section className="pro-section">
                {/* <Notification isTrue={isNotification} display={openBool} />
                <Messages display={msgDisplay}/>    */}
                {
                    userInfo.map(data => {
                        return (
                            <div className='pro-section-div'>

                                <img src={data.image} alt="user's image" className='user-main-img' />
                                <div className='user-content'>
                                    <h4>
                                        {data.name} {data.surName}
                                    </h4>
                                    <p>{data.userName}</p>
                                </div>
                            </div>

                        )
                    })
                }
                <div className='pro-section-child3'>
                    <div className='pro-options'>
                        <div className='test-option offer-option'>
                            <IoDocumentsOutline className="ofr-icon opt-icon"/>
                            <span className='icn-span'>My offers</span>
                        </div>
                        <div className='test-option wrkd-option'>
                            <SiHandshake className="wrkd-icon opt-icon"/>
                            <span className='icn-span'>Worked with</span>
                        </div>
                        <div className='test-option docs-option'>
                            <IoIosDocument className="doc-icon opt-icon"/>
                            <span className='icn-span'>My documents</span>
                        </div>
                        <div className='test-option stng-option'>
                            <RiSettingsLine className="stng-icon opt-icon"/>
                            <span className='icn-span'>Setting</span>
                            <div className='bgChanger-container' style={{display: "none"}} >
                                    <div className='bgChanger background' onClick={()=>setBgColor(background1)}>
                                    </div>
                                    <div className='bgChanger bg1' onClick={()=>setBgColor(bg2)}>
                                    </div>
                                    <div className='bgChanger bg2' onClick={()=>setBgColor(bg3)}>
                                    </div>
                                    <div className='bgChanger bg3' onClick={()=>setBgColor(bg4)}>
                                    </div>
                                    <div className='bgChanger bg4' onClick={()=>setBgColor(bg5)}>
                                    </div>
                                    <div className='bgChanger bg5' onClick={()=>setBgColor(bg6)}>
                                    </div>
                                    <div className='bgChanger bg6' onClick={()=>setBgColor(bg7)}>
                                    </div>
                                    <div className='bgChanger bg7' onClick={()=>setBgColor(bg8)}>
                                    </div>
                                    <div className='bgChanger bg8' onClick={()=>setBgColor(bg9)}>
                                    </div>
                                    <div className='bgChanger bg9' onClick={()=>setBgColor(bg10)}>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className='btn-bar'>
                            <button className='create-btn' onClick={() => {
                                setVisiblity('visible')
                            }}>Create an offer</button>
                    </div>
                </div>
                <div className='offer-popUp1' style={{ visibility: visible }}>
                    <form>
                        <div className='form-main-div'>
                    <div className='close-window'>
                        <div></div>
                        <div className='offer-form-head'>
                            <span className='form-head-span'>Offer creation form</span>
                            <span className='fill-info-span'>fill the information below to create your offer</span>
                        </div>
                        <AiOutlineCloseSquare className='close-icon' onClick={() => {
                            setVisiblity('hidden')
                            setAddInfo('none')
                        }} />
                    </div>
                            <label htmlFor="">Title</label>
                            <div className='form-title-div'>
                                <input type="text" className='popUp-input' 
                                onMouseEnter={()=>{
                                    setInfoBox('Choose what type of worker you need, like Plumber...')
                                    setInfoDis('none')
                                    setInfoStyle('flex-start')
                                }}
                                onMouseLeave={()=>{
                                    setInfoBox('Hover on anything and see the info here!')
                                    setInfoDis('flex')
                                    setInfoStyle('')
                                }}
                                 onChange={(e) => {
                                    e.preventDefault()
                                    setTitle(e.target.value)
                                }} />
                                <div className="dropDown">
                                    <button className='pro-btn' style={{ background: bgColor }}
                                       onMouseEnter={()=>{
                                        setInfoBox('if You need a professional select pro,!remember hiring a pro worker could cost you more')
                                        setInfoDis('none')
                                        setInfoStyle('flex-start')
                                    }}
                                    onMouseLeave={()=>{
                                        setInfoBox('Hover on anything and see the info here!')
                                        setInfoDis('flex')
                                        setInfoStyle('')
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault()
                                    }}>{proOption} <AiOutlineDownSquare className='chev-down' /></button>
                                    <div className="dropDown-content">
                                        <span onClick={() => {
                                            setProO('Pro')
                                            setColor('aqua')
                                            setPro(true)
                                        }}>Pro</span>
                                        <span onClick={() => {
                                            setProO('Off')
                                            setColor('red')
                                            setPro(false)
                                        }}>Off</span>
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="">Workers</label>
                            <div>
                                <input type="text" 
                                   onMouseEnter={()=>{
                                    setInfoBox('How many Workers do you exactly need?')
                                    setInfoDis('none')
                                    setInfoStyle('flex-start')
                                }}
                                onMouseLeave={()=>{
                                    setInfoBox('Hover on anything and see the info here!')
                                    setInfoDis('flex')
                                    setInfoStyle('')
                                }}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setWorkers(e.target.value)
                                }} />
                            </div>
                            <div className='desperator-div'>
                                <div className='vertical-line'></div>
                                <span>Date</span>
                                <div className="vertical-line"></div>
                            </div>
                            <label htmlFor="">When</label>
                            <div className="popUp-date-div form-title-div">
                                <div className='info-box-div'>
                                <input type="date" className='popUp-input'
                                   onMouseEnter={()=>{
                                    setInfoBox('Specify the exact date and time to start the work')
                                    setInfoDis('none')
                                    setInfoStyle('flex-start')
                                }}
                                onMouseLeave={()=>{
                                    setInfoBox('Hover on anything and see the info here!')
                                    setInfoDis('flex')
                                    setInfoStyle('')
                                }}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setDate(e.target.value)
                                }} />
                                <div style={{justifyContent: infoStyle}} className="info-box">
                                <BsFillInfoCircleFill style={{display: infoDis}} className='info-icon'/>
                                <p>{infoBox}</p>
                                </div>
                                </div>
                                <div className='date-div-child '>
                                    <label htmlFor="">Estimated Time</label>
                                    <button className='pro-btn hours-btn' onClick={(e) => {
                                        e.preventDefault()
                                        setDisplay('visible')
                                        setEstimated(timePHolder + "-Hours")
                                    }}>{timePHolder}-Hours <AiOutlineDownSquare className='chev-down' /></button>
                                    <div className='hours-div' style={{ visibility: hourDis }} onClick={() => { setDisplay('hidden') }}>
                                        <span className='hour-span' onClick={() => setTholder('')}><IoIosClose  className='hours-close'/></span>
                                        <span className='hour-span' onClick={() => setTholder('3')}>3</span>
                                        <span className='hour-span' onClick={() => setTholder('4')}>4</span>
                                        <span className='hour-span' onClick={() => setTholder('5')}>5</span>
                                        <span className='hour-span' onClick={() => setTholder('6')}>6</span>
                                        <span className='hour-span' onClick={() => setTholder('7')}>7</span>
                                        <span className='hour-span' onClick={() => setTholder('8')}>8</span>
                                    </div>
                                    <label htmlFor="">Starting from</label>
                                    <input type="time" onChange={(e) => {
                                        e.preventDefault()
                                        setStart(e.target.value)
                                    }} />
                                </div>
                            </div>
                            <div className='desperator-div'>
                                <div className='vertical-line'></div>
                                <span>Payment</span>
                                <div className="vertical-line"></div>
                            </div>
                            <label htmlFor="">Payment*</label>
                            <div className='form-title-div popUp-payment-div'>
                                <input type="text"  placeholder={placeholder}
                                 onMouseEnter={()=>{
                                    setInfoBox('Select how would you like to pay')
                                    setInfoDis('none')
                                    setInfoStyle('center')
                                }}
                                onMouseLeave={()=>{
                                    setInfoBox('Hover on anything and see the info here!')
                                    setInfoDis('flex')
                                    setInfoStyle('')
                                }}
                                onChange={(e) => {
                                    e.preventDefault()
                                   
                                }} onClick={()=>{
                                    if(payBoxDisplay == 'none'){
                                        setPBDisplay('flex')
                                    }else{
                                        setPBDisplay('none')
                                    }
                                    }} />
                                <div className="payment-options" style={{ display: payBoxDisplay, top: topPosition }}>
                                    <div className='per-hour pay-box' onClick={() => {
                                        setPlaceHolder('Per-Hour')
                                        setPBDisplay('hidden')
                                    }}><span>Hour</span></div>
                                    <div className='per-mission pay-box' onClick={() => {
                                        setPlaceHolder('Per-Mission')
                                        setPBDisplay('hidden')
                                    }}><span>Mission</span></div>
                                    <div className='per-issue pay-box' onClick={() => {
                                        setPlaceHolder('Per-Issue')
                                        setPBDisplay('hidden')
                                    }}><span>Issue</span></div>
                                </div>
                                <div className='payment-child date-div-child'>
                                    <label htmlFor="">Amount*</label>
                                    <input type="text"
                                     onMouseEnter={()=>{
                                        setInfoBox('insert the exact amount you want to pay per-hour, mission, issue')
                                        setInfoDis('none')
                                        setInfoStyle('flex-start')
                                    }}
                                    onMouseLeave={()=>{
                                        setInfoBox('Hover on anything and see the info here!')
                                        setInfoDis('flex')
                                        setInfoStyle('')
                                    }}
                                    onChange={(e) => {
                                        e.preventDefault()
                                        setAmount(e.target.value)
                                    }} />
                                </div>
                            </div>
                            <div className='desperator-div'>
                                <div className='vertical-line'></div>
                                <span>Address</span>
                                <div className="vertical-line"></div>
                            </div>
                            <label htmlFor="">Address*</label>
                            <div className='popUp-address-div form-title-div'>
                                <input type="text" className='popUp-input' onChange={(e) => {
                                    e.preventDefault()
                                    setAddress(e.target.value)
                                }} onClick={()=>{
                                    setAddInfo('flex')
                                    setPBDisplay('none')
                                    setTopPosition('58.5%')
                                    }}/>
                                <div className='address-child date-div-child'>
                                    <label htmlFor="">Respond in...</label>
                                    <input type="text" placeholder='30-Minutes' onChange={(e) => {
                                        e.preventDefault()
                                        setReply(e.target.value)
                                    }} />
                                </div>
                            </div>
                            <div className="address-info" style={{display: addInfo}}>
                                <div className="city-country">
                                    <div>
                                    <label htmlFor="">City*</label>
                                    <input type="text" className="city-input" onChange={(e)=>{
                                        e.preventDefault()
                                        setCity(e.target.value)
                                    }}/>
                                    </div>
                                    <div>
                                    <label>Country*</label>
                                    <input type="text" placeholder="France" disabled className="country-input"/>
                                    </div>
                                </div>
                                    <label htmlFor="">Postal Code*</label>
                                    <input type="text" className="postal-code-input" onChange={(e)=>{
                                        e.preventDefault()
                                        setPostalCode(e.target.value)
                                    }} />
                            </div>
                            <button className='popUp-next-btn' onClick={(e) => {
                                e.preventDefault();
                                setVisiblity('hidden')
                                setVisiblityB('visible')
                            }}>Next</button>
                        </div>
                    </form>
                </div>
                <PopupTwo close={setVisiblity} visible={visibleB} visibleFunc={setVisiblityB} userInfo={userInfo} popOneVal={values} />
            </section>
        </div>
    )
}

export default Profile

