import React from 'react';
import {Link, Routes, Route} from 'react-router-dom'
import { useState, useContext,useEffect} from 'react';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import Offers from './Components/Offers';
import Feed from './Components/Feed';
import EmployeeProfile from './Components/EmployeeProfile';
import Cv from './Components/Cv';
import CvForm from './Components/CvForm';
import NtfnOffer from './Components/NtfnOffer';
import ProfileInView from './Components/ProfileInView';
import Messages from './Components/Messages';
import './styles/signup.css';
import './styles/login.css'
import './styles/profile.css'
import './styles/popupTwo.css'
import './styles/popupThree.css'
import './styles/offers.css';
import './styles/feed.css';
import './styles/srchPopup.css';
import './styles/employeePro.css';
import './styles/cv.css';
import './styles/cvForm.css';
import Docs from './Components/Docs';
import './styles/docs.css';
import './styles/notification.css';
import './styles/ntfnOffer.css';
import './styles/proNVu.css';
import './styles/messages.css'
import { createContext } from 'react';
export const OfferContext = createContext('default value')
function App() {
  return (
    <div className="App">     
    <OfferContext.Provider>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/feed' element={<Feed/>}/>
        <Route path='/empe-profile' element={<EmployeeProfile/>}/>
        <Route path='/cv/:id' element={<Cv/>}/>
        <Route path='/cvForm' element={<CvForm/>}/>
        <Route path='/docs' element={<Docs/>}/>
        <Route path='/emp-offers' element={<Offers/>}/> 
        <Route path='/ntfn-offer/:id' element={<NtfnOffer/>}/>
        <Route path='/pro-nvu/:id' element={<ProfileInView/>}/>
      </Routes>
    </OfferContext.Provider>
    </div>
  );
}

export default App;
