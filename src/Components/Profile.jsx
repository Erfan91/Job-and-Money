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
import Offers from './Offers';
import { OfferContext } from '../App';
import { useContext } from 'react';
const Profile = (props) => {
    const [userInfo, setInfo] = useState([])
    const [visible, setVisiblity] = useState('hidden')
    const [visibleB, setVisiblityB] = useState('hidden')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [surName, setSurName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [proOption, setProO] = useState('Pro')
    const id = JSON.stringify(localStorage.getItem('_id'))
    const ids = JSON.parse(id)
    const [placeholder, setPlaceHolder] = useState('Per-Hour');
    const [payBoxDisplay, setPBDisplay] = useState('hidden')
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
    // </Form values>
    const [bgColor, setColor] = useState('');
    useEffect(() => {
        fetch(`http://localhost:3001/user/${ids}`)
            .then(result => result.json())
            .then(json => {
                // console.log(json)
                setInfo([json])
            })
        // console.log(userInfo)
    }, [])

    const [timePHolder, setTholder] = useState('');
    const [hourDis, setDisplay] = useState('hidden');
    const [isNotif, setIsNotif] = useState(Boolean)

    const isNotification = (notif) =>{
        return setIsNotif(notif)
    }

    const [ntfnDisplay, setNtfnDisplay] = useState('none')
    let [openBool, setOpenBool] = useState(null)
 
    return (
        <div className='pro-main-div'>
            <nav className='pro-nav'>
                <div className='nav-child1'>
                    <span className='pro-nav-span'>Job&Money</span>
                </div>
                <div className='nav-child2'>
                    {isNotif ? <BiNotification className='pro-icons notif-red-icon' onClick={()=>{
                       if(!openBool){
                        setOpenBool(openBool = true)
                       }else{
                        setOpenBool(openBool = false)
                       }
                        setNtfnDisplay('flex')
                    }}/>:<BiNotification className='pro-icons' onClick={()=>{
                        if(!openBool){
                            setOpenBool(openBool = true)
                           }else{
                            setOpenBool(openBool = false)
                           }
                        setNtfnDisplay('flex')
                    }}/>}
                    <BiMessage className='pro-icons' />
                    <button className='pro-nav-button'>Job Mode</button>
                    {/* <img src={} alt="profile image"/> */}
                    <div className='pro-pic-div'></div>
                </div>
            </nav>
            <section className="pro-section">
                <Notification isTrue={isNotification} display={openBool} />   
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
                        </div>
                    </div>
                    <div className='btn-bar'>
                            <button className='create-btn' onClick={() => {
                                setVisiblity('visible')
                            }}>Create an offer</button>
                    </div>
                </div>
                <div className='offer-popUp1' style={{ visibility: visible }}>
                    <div className='close-window'>
                        <AiOutlineCloseSquare className='close-icon' onClick={() => {
                            setVisiblity('hidden')
                            setAddInfo('none')
                        }} />
                    </div>
                    <form>
                        <div className='form-main-div'>
                            <label htmlFor="">Title</label>
                            <div className='form-title-div'>
                                <input type="text" className='popUp-input' onChange={(e) => {
                                    e.preventDefault()
                                    setTitle(e.target.value)
                                }} />
                                <div className="dropDown">
                                    <button className='pro-btn' style={{ background: bgColor }} onClick={(e) => {
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
                                <input type="text" onChange={(e) => {
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
                                <input type="date" className='popUp-input' onChange={(e) => {
                                    e.preventDefault()
                                    setDate(e.target.value)
                                }} />
                                <div className='date-div-child '>
                                    <label htmlFor="">Estimated Time</label>
                                    <button className='pro-btn hours-btn' onClick={(e) => {
                                        e.preventDefault()
                                        setDisplay('visible')
                                        setEstimated(timePHolder + "-Hours")
                                    }}>{timePHolder}-Hours <AiOutlineDownSquare className='chev-down' /></button>
                                    <div className='hours-div' style={{ visibility: hourDis }} onClick={() => { setDisplay('hidden') }}>
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
                            <label htmlFor="">Payment</label>
                            <div className='form-title-div popUp-payment-div'>
                                <input type="text" placeholder={placeholder} onChange={(e) => {
                                    e.preventDefault()
                                   
                                }} onClick={()=>setPBDisplay('visible')} />
                                <div className="payment-options" style={{ visibility: payBoxDisplay }}>
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
                                    <label htmlFor="">Amount</label>
                                    <input type="text" onChange={(e) => {
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
                            <label htmlFor="">Address</label>
                            <div className='popUp-address-div form-title-div'>
                                <input type="text" className='popUp-input' onChange={(e) => {
                                    e.preventDefault()
                                    setAddress(e.target.value)
                                }} onClick={()=>setAddInfo('flex')}/>
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
                                    <label htmlFor="">City</label>
                                    <input type="text" className="city-input" onChange={(e)=>{
                                        e.preventDefault()
                                        setCity(e.target.value)
                                    }}/>
                                    </div>
                                    <div>
                                    <label>Country</label>
                                    <input type="text" placeholder="France" disabled className="country-input"/>
                                    </div>
                                </div>
                                    <label htmlFor="">Postal Code</label>
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

