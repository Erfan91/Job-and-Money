import React from 'react';
import {Link, Routes, Route} from 'react-router-dom'
import { useState, useContext,useEffect } from 'react';

function App() {

  const [name,setName] = useState('');
  const [pass,setPass] = useState('');
  const [logName,setLogName] = useState('');
  const [logCode, setCode] = useState('');
  
  const nameChanger = (e)=>{
    setName(e.target.value)
  }
  const passChanger = (e)=>{
    setPass(e.target.value)
  }

  const logNameChanger = (e)=>{
    setLogName(e.target.value)
  }

  const codeChanger = (e)=>{
    setCode(e.target.value)
  }

  const sender = (e)=>{
    e.preventDefault()
    fetch('http://localhost:3001/user', {
      method:'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body:JSON.stringify({
        name:name,
        password:pass
      })
    }).then(json=>{
      console.log(json)
    })
  }

  const logging = (e)=>{
    e.preventDefault()
    fetch()
  }
  return (
    <div className="App">
      <div>
        <h1>Sign Up</h1>
        <input type='name' placeholder='name' onChange={nameChanger}/>
        <input type='password' placeholder='password' onChange={passChanger}/> 
        <button onClick={sender}>Submit</button>       
      </div>
      <div>
        <h1>Login</h1>
        <input type='name' placeholder='user name' onChange={logNameChanger}/>
        <input type='password' placeholder='password' onChange={codeChanger}/>
        <button onClick={logging }>Login</button>
      </div>
    </div>
  );
}

export default App;
