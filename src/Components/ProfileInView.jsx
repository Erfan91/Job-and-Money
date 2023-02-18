import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiNotification, BiMessage, BiMessageSquareAdd } from 'react-icons/bi'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { MdOutlineDocumentScanner, MdOutlineAutoGraph } from "react-icons/md";
import { SiHandshake } from "react-icons/si";
import { IoIosSend } from "react-icons/io";

const ProfileInView = (props) => {
    const [info, setInfo] = useState([])
    const id = JSON.stringify(localStorage.getItem('_id'))
    const ids = JSON.parse(id)
    const Navigate = useNavigate()
    const params = useParams();
    useEffect(() => {
        fetch(`http://localhost:3001/user/${params.id}`)
            .then(result => result.json())
            .then(json => {
                console.log(json)
                setInfo([json])
            })

    }, [])

    const [msgContent, setMessageContent] = useState('')
    const [display, setDisplay] = useState('')
    const [styleBoolean, setStyleB] = useState(Boolean)
    const [msgArray, setMsgArr] = useState([])
    const [msgBoolean, setMsgBoolean] = useState(Boolean)
    const [messageId, setMessageId] = useState('')
    const [bgColor, setBgColor] = useState('#5b86e5');
    const [borderColor, setBorderColor] = useState('1px solid violet')
    const sendMessage  = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:3001/msg`,{
            method: 'POST',
            headers: new Headers({"content-type":"application/json"}),
            body: JSON.stringify({
                sender: ids,
                receiver: params.id,
                content: msgContent
            })
        }).then(result=>result.json())
        .then(json=>{
            console.log(json)
        })
    }
    

    return (
        <>
            <div className='proNVu-main-div'>
                <div className='pnvu-main-child'>
                    {
                        info.map(user => {
                            return (
                                <>
                                    <div className='circle-bg' >
                                        <div className='img-msg-div'>
                                            <div className='addUser-div'>
                                                <div>
                                                    <SiHandshake className='addUser-icon' />
                                                </div>
                                            </div>
                                            <div className='addMsg-div'>
                                                <div className='addMsg-icon-div'>
                                                    <Link to={`/cv/${params.id}`}><HiOutlineDocumentDuplicate className='addMsg-icon' /></Link>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={user.image} alt="not found" className='user-main-img pnvu-pro-img' />
                                                <div className='user-content'>
                                                    <h4>
                                                        {user.name} {user.surName}
                                                    </h4>
                                                    <p>@{user.userName}</p>
                                                </div>

                                            </div>
                                            <div className='addMsg-div' >
                                                <div className='addMsg-icon-div' onClick={() => {
                                                    if (styleBoolean) {
                                                        setStyleB(false)
                                                        setDisplay('')
                                                    } else {
                                                        setStyleB(true)
                                                        setDisplay('msg-npt-div')
                                                    }
                                                }}>
                                                    <BiMessageSquareAdd className='addMsg-icon' />
                                                </div>
                                                {
                                                    styleBoolean ?
                                                        <div className={display} onClick={() => {
                                                            setStyleB(true)
                                                        }}>
                                                            <div className='msg-head-info'>
                                                                <img src={user.image} className="msg-profile-img" alt="not found" />
                                                                <span>{user.name} {user.surName}</span>
                                                                <p>@{user.userName}</p>
                                                                {/* <p> bio </p> */}
                                                            </div>
                                                            
                                                            <div className='msg-section'>
                                                                {
                                                                    msgArray.map(content=>{
                                                                        return(
                                                                            <>
                                                                            {
                                                                                content.content.map(msg=>{
                                                                                    return <div className='sender-msgs'>
                                                                                        <span>{msg}</span>
                                                                                        <img src={content.sender.image} className="pro-sm-img" alt="not found" />
                                                                                    </div>
                                                                                })
                                                                            }
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            <div className='npt-container'>
                                                                <input type="text" className='message-npt' onChange={(e) => {
                                                                    e.preventDefault()
                                                                    setMessageContent(e.target.value)
                                                                }} />
                                                                <button className='send-msg-btn' onClick={sendMessage}><IoIosSend className='send-icon'/></button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div style={{ display: "none" }}>
                                                        </div>
                                                }

                                            </div>
                                            <div className='addUser-div'>
                                                <div>
                                                    <MdPersonAddAlt1 className='addUser-icon' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ProfileInView