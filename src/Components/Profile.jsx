import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { IoIosNotifications } from "react-icons/io";
import { BiMessage, BiNotification, BiSearch } from "react-icons/bi";
import { AiOutlineDownSquare } from "react-icons/ai";

const Profile = () => {
    const [userInfo, setInfo] = useState([])
    const id = JSON.stringify(localStorage.getItem('_id'))
    const ids = JSON.parse(id)
    const placeholder = 'Per-Hour'
    const icon = <AiOutlineDownSquare />
    console.log(ids)
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
                            <button className='create-btn'>Create an offer</button>
                        </div>
                    </div>
                </div>
                <div className='offer-popUp1'>
                    <form>
                        <div className='form-main-div'>
                            <label htmlFor="">Title</label>
                            <div className='form-title-div'>
                                <input type="text" />
                                <div className="dropDown">
                                    <button className='pro-btn'>Pro <AiOutlineDownSquare /></button>
                                    <div className="dropDown-content">
                                        <span>Pro</span>
                                        <span>Off</span>
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="">Workers</label>
                            <div>
                                <input type="text" />
                            </div>
                            <div className='desperator-div'>
                                <div className='vertical-line'></div>
                                <span>Date</span>
                                <div className="vertical-line"></div>
                            </div>
                            <label htmlFor="">When</label>
                            <div className="popUp-date-div form-title-div">
                                <input type="text" />
                                <div className='date-div-child '>
                                    <label htmlFor="">Estimated Time</label>
                                    <input type="text" />
                                    <label htmlFor="">Starting from</label>
                                    <input type="text" />
                                </div>
                            </div>
                            <div className='desperator-div'>
                                <div className='vertical-line'></div>
                                <span>Payment</span>
                                <div className="vertical-line"></div>
                            </div>
                            <label htmlFor="">Payment</label>
                            <div className='form-title-div popUp-payment-div'>
                                <input type="text" placeholder={placeholder + "                        🔽"} />
                                <div className='payment-child date-div-child'>
                                    <label htmlFor="">Amount</label>
                                    <input type="text" />
                                </div>
                            </div>
                            <div className='desperator-div'>
                                <div className='vertical-line'></div>
                                <span>Address</span>
                                <div className="vertical-line"></div>
                            </div>
                            <label htmlFor="">Address</label>
                            <div className='popUp-address-div form-title-div'>
                                <input type="text" />
                                <div className='address-child date-div-child'>
                                    <label htmlFor="">Respond in...</label>
                                    <input type="text" placeholder='30-Minutes'/>
                                </div>
                            </div>
                            <button className='popUp-next-btn'>Next</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Profile

