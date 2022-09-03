import React from 'react';
import {Link, Routes, Route} from 'react-router-dom'
import { useState, useContext,useEffect } from 'react';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import Offers from './Components/Offers';
import Feed from './Components/Feed';
import './styles/signup.css';
import './styles/login.css'
import './styles/profile.css'
import './styles/popupTwo.css'
import './styles/popupThree.css'
import './styles/offers.css';
import './styles/feed.css';
function App() {

  return (
    <div className="App">     
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/feed' element={<Feed/>}/>
      </Routes>
    </div>
  );
}

export default App;
