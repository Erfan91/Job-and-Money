import React from 'react';
import {Link, Routes, Route} from 'react-router-dom'
import { useState, useContext,useEffect } from 'react';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import './styles/signup.css';
import './styles/login.css'
function App() {

  return (
    <div className="App">
      <nav>
        <Link to='/signup'>
          <button>SignUp</button>         
        </Link>
      </nav>
     
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
