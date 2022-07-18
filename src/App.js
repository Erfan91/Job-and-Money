import React from 'react';
import {Link, Routes, Route} from 'react-router-dom'
import { useState, useContext,useEffect } from 'react';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import './styles/signup.css'
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
      </Routes>
    </div>
  );
}

export default App;
