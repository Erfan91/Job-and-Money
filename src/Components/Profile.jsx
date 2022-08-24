import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { IoIosNotifications } from "react-icons/io";
import { BiMessage, BiNotification, BiSearch } from "react-icons/bi";
import { AiOutlineDownSquare, AiOutlineCloseSquare } from "react-icons/ai";
import PopupTwo from './popups/PopupTwo';

const Profile = (props) => {
    const [userInfo, setInfo] = useState([])
    const [visible,setVisiblity] = useState('hidden')
    const [visibleB, setVisiblityB] = useState('hidden')
    const [image,setImage] = useState('')
    const [name,setName] = useState('')
    const [surName,setSurName] = useState('')
    const [userName,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [number,setNumber] = useState('')
    const id = JSON.stringify(localStorage.getItem('_id'))
    const ids = JSON.parse(id)
    const placeholder = 'Per-Hour'
    const icon = <AiOutlineDownSquare />
    console.log(ids)
    // <Form Values> 
    const [title, setTitle] = useState('');
    const [pro, setPro] = useState(Boolean);
    const [workers, setWorkers] = useState('');
    const [date, setDate] = useState('');
    const [estimatedTime, setEstimated] = useState('');
    const [startFrom, setStart] = useState('');
    const [payment, setPayment] = useState('');
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');
    const [reply, setReply] = useState('');
    const values = [title, pro, workers, date, estimatedTime, startFrom, payment, amount, address, reply]
    // </Form values>

    useEffect(() => {
        fetch(`http://localhost:3001/user/${ids}`)
            .then(result => result.json())
            .then(json => {
                console.log(json)
                setInfo([json])
            })
        console.log(userInfo)
    }, [])

   

    return (
        <div className='pro-main-div'>
            <nav className='pro-nav'>
                <div className='nav-child1'>
                    <span className='pro-nav-span'>Job&Money</span>
                </div>
                <div className='nav-child2'>
                    <BiNotification className='pro-icons' />
                    <BiMessage className='pro-icons' />
                    <button className='pro-nav-button'>Job Mode</button>
                    {/* <img src={} alt="profile image"/> */}
                    <div className='pro-pic-div'></div>
                </div>
            </nav>
            <section className="pro-section">
                <div className='pro-section-child1'>
                    < div className='search-div' >
                        <div>
                            <label>Search a user</label>
                            <input type="text" />
                            <BiSearch className='search-icon' />
                        </div>
                    </div >
                </div>

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
                    <div className='btn-bar'>
                        <div>
                            <button>My offers</button>
                            <button>Worked with</button>
                        </div>
                        <div>
                            <button className='create-btn' onClick={()=>{
                                setVisiblity('visible')
                            }}>Create an offer</button>
                        </div>
                    </div>
                </div>
                <div className='offer-popUp1' style={{visibility:visible}}>
                    <div className='close-window'>
                    <AiOutlineCloseSquare className='close-icon' onClick={()=>{
                        setVisiblity('hidden')
                    }}/>
                    </div>
                    <form>
                        <div className='form-main-div'>
                            <label htmlFor="">Title</label>
                            <div className='form-title-div'>
                                <input type="text" className='popUp-input' onChange={(e)=>{
                                    e.preventDefault()
                                    setTitle(e.target.value)
                                }}/>
                                <div className="dropDown">
                                    <button className='pro-btn'>Pro <AiOutlineDownSquare className='chev-down'/></button>
                                    <div className="dropDown-content">
                                        <span>Pro</span>
                                        <span>Off</span>
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="">Workers</label>
                            <div>
                                <input type="text" onChange={(e)=>{
                                    e.preventDefault()
                                    setWorkers(e.target.value)
                                }}/>
                            </div>
                            <div className='desperator-div'>
                                <div className='vertical-line'></div>
                                <span>Date</span>
                                <div className="vertical-line"></div>
                            </div>
                            <label htmlFor="">When</label>
                            <div className="popUp-date-div form-title-div">
                                <input type="text" className='popUp-input' onChange={(e)=>{
                                    e.preventDefault()
                                    setDate(e.target.value)
                                }}/>
                                <div className='date-div-child '>
                                    <label htmlFor="">Estimated Time</label>
                                    <input type="text" onChange={(e)=>{
                                    e.preventDefault()
                                    setEstimated(e.target.value)
                                }}/>
                                    <label htmlFor="">Starting from</label>
                                    <input type="text" onChange={(e)=>{
                                    e.preventDefault()
                                    setStart(e.target.value)
                                }}/>
                                </div>
                            </div>
                            <div className='desperator-div'>
                                <div className='vertical-line'></div>
                                <span>Payment</span>
                                <div className="vertical-line"></div>
                            </div>
                            <label htmlFor="">Payment</label>
                            <div className='form-title-div popUp-payment-div'>
                                <input type="text" placeholder={placeholder + "                        🔽"} onChange={(e)=>{
                                    e.preventDefault()
                                    setPayment(e.target.value)
                                }}/>
                                <div className='payment-child date-div-child'>
                                    <label htmlFor="">Amount</label>
                                    <input type="text" onChange={(e)=>{
                                    e.preventDefault()
                                    setAmount(e.target.value)
                                }}/>
                                </div>
                            </div>
                            <div className='desperator-div'>
                                <div className='vertical-line'></div>
                                <span>Address</span>
                                <div className="vertical-line"></div>
                            </div>
                            <label htmlFor="">Address</label>
                            <div className='popUp-address-div form-title-div'>
                                <input type="text" className='popUp-input' onChange={(e)=>{
                                    e.preventDefault()
                                    setAddress(e.target.value)
                                }}/>
                                <div className='address-child date-div-child'>
                                    <label htmlFor="">Respond in...</label>
                                    <input type="text" placeholder='30-Minutes' onChange={(e)=>{
                                    e.preventDefault()
                                    setReply(e.target.value)
                                }}/>
                                </div>
                            </div>
                            <button className='popUp-next-btn' onClick={(e)=>{
                                e.preventDefault(); 
                                setVisiblity('hidden')
                                setVisiblityB('visible')
                            }}>Next</button>
                        </div>
                    </form>
                </div>
                <PopupTwo close={setVisiblity} visible={visibleB} visibleFunc={setVisiblityB}  userInfo={userInfo} popOneVal={values}/>
            </section>
        </div>
    )
}

export default Profile

