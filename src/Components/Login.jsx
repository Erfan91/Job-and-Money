import React from 'react'
import { useState } from 'react'
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import SignUp from './SignUp';
import { Link, Routes, Route } from 'react-router-dom'
import { animate, motion } from 'framer-motion'
import { OfferContext } from '../App';
import { useContext } from 'react';
import { useEffect } from 'react';
const Login = () => {
  const [showCode, setShowCode] = useState('password')
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState('')
  const [transition, setTransition] = useState({})
  const [initial, setInitial] = useState({})
  const [animate, setAnimate] = useState({})
  const Navigate = useNavigate()
  const {setDisplayN} = useContext(OfferContext)
  const {setNDisplay} = useContext(OfferContext)
  const nameChanger = e => {
    e.preventDefault()
    setUserName(e.target.value)
    setLoginMsg('')
  }

  const passChanger = e => {
    e.preventDefault()
    setPassword(e.target.value)
    setLoginMsg('')
  }

  useEffect(()=>{
    setDisplayN('none')
    setNDisplay(false)
  },[])

  const sender = e => {
    e.preventDefault()
    fetch('http://localhost:3001/user/login', {
      method: 'POST',
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        username: userName,
        password: password
      })
    }).then(result => result.json())
      .then(json => {
        console.log(json)
        setLoginMsg(json.userInfo)
        localStorage.setItem('_id', json.id)
        if (json.authenticated && json.employer) {
          Navigate('/profile')
        } else if (json.authenticated == true && json.employer == false) {
          Navigate('/feed')
        } else if (!json.authenticated) {
          Navigate('/')
        }
      })
  }



  return (
    <div
      className='login-main-div'>
      <motion.div
      initial={{ x: '-5vw' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', duration: 1.5, bounce: 0.5 }}
      className='login-form-div'>
        <form>
          <div className='login-form-child'>
            <label className='username-label'>User Name</label>
            {loginMsg.includes('username') ? <p className='login-msg'>{loginMsg}</p> : <p style={{ display: 'none' }}></p>}
            <input className='login-input' type="username" name='username' onClick={() => { setLoginMsg('') }} onChange={nameChanger} />
            <span className='username-message'>* Enter the exact username you chosed while creating your account</span>
          </div>
          <div className='login-form-child'>
            <label className='username-label'>Enter your password</label>
            {loginMsg.includes('password') ? <p className='login-msg'>{loginMsg}</p> : <p style={{ display: 'none' }}></p>}
            <motion.input className='login-input' type={showCode} name='password' onClick={() => { setLoginMsg('') }} onChange={passChanger} />
            <AiOutlineEyeInvisible className='see-icon' onClick={(e) => {
              e.preventDefault()
              if (showCode === 'text') {
                setShowCode('password')
              }
              if (showCode === 'password') {
                setShowCode('text')
              }
            }} />

          </div>
          {password !== "" ? <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} className='login-btn' onClick={sender}>Login</motion.button>
            : <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} className='login-btn' onClick={(e) => {
              e.preventDefault()
            }}>Login</motion.button>
          }
          <p>Don't have an account? <Link to="/signup"><a>create an account</a></Link></p>
        </form>
      </motion.div>
    </div>
  )
}

export default Login