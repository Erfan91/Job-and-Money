import React from 'react'
import { useState } from 'react'
import { AiOutlineEyeInvisible } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'
import SignUp from './SignUp';
import {Link, Routes, Route} from 'react-router-dom'
const Login = () => {
  const [showCode,setShowCode] = useState('password')
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [loginMsg,setLoginMsg] = useState('')
  const Navigate = useNavigate()
  const nameChanger = e =>{
    e.preventDefault()
    setUserName(e.target.value)
    setLoginMsg('')
  }

  const passChanger = e =>{
    e.preventDefault()
    setPassword(e.target.value)
    setLoginMsg('')
  }


  const sender = e  =>{
    e.preventDefault()
    fetch('http://localhost:3001/user/login',{
      method:'POST',
      headers: new Headers({"content-type":"application/json"}),
      // credentials:'include',
      body:JSON.stringify({
        username:userName,
        password:password
      })      
    }).then(result=>result.json())
    .then(json=>{
      console.log(json)
      setLoginMsg(json.userInfo)
      localStorage.setItem('_id', json.id)
      if(json.authenticated){
        Navigate('/profile')
      }else{
        Navigate('/')
      }
    })
  }



  return (
    <div className='login-main-div'>
      <div className='login-form-div'>
        <form>
          <div className='login-form-child'>
          <label className='username-label'>User Name</label>
          {loginMsg.includes('username')?<p className='login-msg'>{loginMsg}</p>:<p style={{display:'none'}}></p>}
          <input className='login-input' type="username" name='username' onClick={()=>{setLoginMsg('')}} onChange={nameChanger}/>
          <span className='username-message'>* Enter the exact username you chosed while creating your account</span>
          </div>
          <div className='login-form-child'>
            <label className='username-label'>Enter your password</label>
            {loginMsg.includes('password')?<p className='login-msg'>{loginMsg}</p>:<p style={{display:'none'}}></p>}
            <input className='login-input' type={showCode} name='password' onClick={()=>{setLoginMsg('')}} onChange={passChanger}/>
            <AiOutlineEyeInvisible className='see-icon' onClick={(e)=>{
              e.preventDefault()
              if(showCode === 'text'){
                setShowCode('password')
              }
              if(showCode === 'password'){
                setShowCode('text')
              }
            }}/>
            
          </div>
            <button className='login-btn' onClick={sender}>Login</button>
            <p>Don't have an account? <Link to="/signup"><a>create an account</a></Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login