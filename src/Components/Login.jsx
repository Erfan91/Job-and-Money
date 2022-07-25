import React from 'react'
import { useState } from 'react'
import { AiOutlineEyeInvisible } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [showCode,setShowCode] = useState('password')
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const Navigate = useNavigate()
  const nameChanger = e =>{
    e.preventDefault()
    setUserName(e.target.value)
  }

  const passChanger = e =>{
    e.preventDefault()
    setPassword(e.target.value)
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
          <label>User Name</label>
          <input type="username" name='username' placeholder='ali00' onChange={nameChanger}/>
          </div>
          <div className='login-form-child'>
            <label>Enter your password</label>
            <input type={showCode} name='password' onChange={passChanger}/>
            <AiOutlineEyeInvisible onClick={(e)=>{
              e.preventDefault()
              if(showCode === 'text'){
                setShowCode('password')
              }
              if(showCode === 'password'){
                setShowCode('text')
              }
            }}/>
            
          </div>
            <button onClick={sender}>submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login