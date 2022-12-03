import React from 'react'
import { useEffect, useState } from 'react'
import { IoIosSend, IoIosArrowBack, IoIosMore, IoIosMic } from "react-icons/io";
import { BsImage } from 'react-icons/bs';
import moment from 'moment';
const Messages = (props) => {
    const [messages, setMessages] = useState([])
    const id = JSON.stringify(localStorage.getItem('_id'))
    const ids = JSON.parse(id)
    const [msgVal, setMsgVal] = useState('')
    const [msgBoolean, setBoolean] = useState(Boolean)
    const [msgId, setMsgId] = useState('')
    const [receivedMsg, setReceivedMsg] = useState([])
    const [display, setDisplay] = useState('none')
    const [displayB, setDisplayB] = useState('')
    const [senderId, setSenderId] = useState('')
    const [msgArray, setMsgArr] = useState([])
    const [receiverId, setReceiverId] = useState('')
    const sendMessage = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3001/msg`, {
            method: 'POST',
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                sender: ids,
                receiver: senderId,
                content: msgVal
            })
        }).then(result => result.json())
            .then(json => {
                console.log(json)
            })
        fetch(`http://localhost:3001/msg/${ids}/${senderId}`)
            .then(result => result.json())
            .then(json => {
                console.log(json)
                setMsgArr(json)
            })
            myMsg()
    }



    useEffect(() => {
        fetch(`http://localhost:3001/msg/${ids}`)
            .then(result => result.json())
            .then(json => {
                console.log(json)
                setMessages(json)
                myMsg()
            })
    }, [])


    const myMsg = () => {
        fetch(`http://localhost:3001/msg/${ids}/${senderId}`)
            .then(result => result.json())
            .then(json => {
                console.log(json)
                setMsgArr(json)
            })
        fetch(`http://localhost:3001/msg/${ids}`)
            .then(result => result.json())
            .then(json => {
                console.log(json)
                setMessages(json)
            })
    
    }

    useEffect(() => {
        fetch(`http://localhost:3001/msg/${ids}/${senderId}`)
            .then(result => result.json())
            .then(json => {
                console.log(json)
                setMsgArr(json)
                myMsg()
            })
    }, [])

    return (
        <div className='messages-main-div ntfn-main-div' style={{ display: props.display, position:props.position}}>
            <div className='msg-main-child'>
                {
                    messages.map(message => {
                       
                        return (
                            <div className='msg-container' style={{ display: displayB }} onMouseEnter={()=>{
                                fetch(`http://localhost:3001/msg/${ids}`)
                                .then(result => result.json())
                                .then(json => {
                                    console.log(json)
                                    setMessages(json)
                                    myMsg()
                                })
                            }} onClick={() => {
                                myMsg()
                                setReceivedMsg([message])
                                setDisplay('flex')
                                setDisplayB('none')
                                setSenderId(message.sender._id)
                            }} >
                                <img src={message.sender.image} className='msg-profile-img' alt="" />
                                <div>
                                    <span>{message.sender.name} {message.sender.surName}</span>
                                    <p><small>{message.content[0]}</small></p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='messenger-page' style={{ display: display }}>
                {
                    receivedMsg.map(content => {
                        return (
                            <>
                                <div className='msg-header'>
                                    <div className='hdr-child1'>
                                        <IoIosArrowBack className='msgr-back-icon' onClick={() => {
                                            setDisplay('none')
                                            setDisplayB('flex')
                                        }} />
                                        <img src={content.sender.image} className="msgr-profile-img" alt="" />
                                        <span>{content.sender.name} {content.sender.surName}</span>
                                    </div>
                                    <div className='hdr-child2'>
                                        <IoIosMore className='msgr-more-icon' />
                                    </div>
                                </div>
                                <div className='message-window'>
                                    {
                                        content.content.map(msg => {
                                            return <div className='msgr-text-div'>
                                                <img src={content.sender.image} className="msgr-pro-sm-img" alt="not found" />
                                                <li>{msg} <span style={{fontSize: "6px", color:"blue", fontWeight: "bold"}}>{msg?.createdAt}</span></li>
                                                {/* <p>{moment(content.updatedAt).format("h:mm a")}</p> */}
                                            </div>
                                        })
                                    }

                                    {
                                        msgArray.map(msg => {
                                            return (
                                                <>
                                                    {
                                                        msg.content.map(message => {
                                                            return <div className='msgr-text-div sent-txt-div'>
                                                                <li className='sent-li'>{message} <span style={{fontSize: "6px", color:"blue", fontWeight: "bold"}}>{message?.createdAt}</span></li>
                                                                <img src={msg.sender.image} className="msgr-pro-sm-img" alt="not found" />
                                                                {/* <p>{moment(msg.updatedAt).format("h:mm a")}</p> */}
                                                            </div>
                                                        })
                                                    }
                                                </>
                                            )
                                        })
                                    }

                                </div>
                                <div className='sendMsg-div'>
                                    <input type="text" className='msgr-send-npt' onChange={(e) => {
                                        e.preventDefault()
                                        setMsgVal(e.target.value)
                                    }} />
                                    <BsImage className='msgr-img-icon' />
                                    <IoIosMic className='msgr-mic-icon' />
                                    {msgVal !== "" ? <button className='msgr-send-btn' onClick={sendMessage}><IoIosSend className='send-icon' /></button>
                                        :
                                        <button className='msgr-send-btn'><IoIosSend className='send-icon' /></button>
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Messages