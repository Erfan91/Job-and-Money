import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { IoIosNotifications } from "react-icons/io";
import { BiMessage, BiNotification, BiSearch } from "react-icons/bi";
const Profile = () => {
    const [userInfo, setInfo] = useState([])
    const id = JSON.stringify(localStorage.getItem('_id'))
    const ids = JSON.parse(id)
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
                        <BiSearch className='search-icon'/>
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
            </section>
        </div>
    )
}

export default Profile

