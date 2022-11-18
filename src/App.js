import React from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom'
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
import Notification from './Components/Notification';
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
import './styles/searchWindow.css';
import { createContext } from 'react';
import { BiMessage, BiNotification, BiSearch } from "react-icons/bi";
import { TbHome2 } from "react-icons/tb";
export const OfferContext = createContext('default value')
function App() {
  const Navigate = useNavigate()
  const id = JSON.stringify(localStorage.getItem('_id'))
  const ids = JSON.parse(id)
  const [ntfnDisplay, setNtfnDisplay] = useState('none')
  let [openBool, setOpenBool] = useState(null)
  const [msgDisplay, setMsgDis] = useState('none')
  const [isNotif, setIsNotif] = useState(Boolean)
  const [info, setInfo] = useState([])
  const [display, setDisplay] = useState('flex')

  const displayContext = {
    display: display,
    setDisplayN: setDisplay,
    setNDisplay: setOpenBool
  }
  const isNotification = (notif) =>{
    return setIsNotif(notif)
}

useEffect(() => {
  fetch(`http://localhost:3001/user/${ids}`)
    .then(result => result.json())
    .then(json => {
      console.log(json)
      setInfo([json])
    })
}, [])
  return (
    <div className="App">     
     <nav className='pro-nav' style={{display:display}}>
                <div className='nav-child1'>
                    <span className='pro-nav-span'>Job&Money</span>
                </div>
                <div className='nav-child2'>
                  {
                    info.map(user=>{
                      return(
                        user.employer?<TbHome2 className='pro-icons' style={{display:'none'}}/>: <TbHome2 className='pro-icons' onClick={()=>{
                          Navigate('/feed')
                        }}/>
                      )
                    })
                  }
                    
                    {isNotif ? <BiNotification className='pro-icons notif-red-icon' onClick={()=>{
                       if(!openBool){
                        setOpenBool(openBool = true)
                       }else{
                        setOpenBool(openBool = false)
                       }
                        setNtfnDisplay('flex')
                        setMsgDis('none')
                    }}/>:<BiNotification className='pro-icons' onClick={()=>{
                        if(!openBool){
                            setOpenBool(openBool = true)
                           }else{
                            setOpenBool(openBool = false)
                           }
                        setNtfnDisplay('flex')
                        setMsgDis('none')
                    }}/>}
                    <BiMessage className='pro-icons' onClick={()=>{
                        if(msgDisplay == "none"){
                            setMsgDis("flex")
                        }else{
                            setMsgDis('none')
                        }
                        setOpenBool(openBool = false)
                    }}/>
                    {
                      info.map(user=>{
                        return(
                          <Link to={"/empe-profile"}>
                          <img src={user.image} alt="profile image" className='profile-image'/>
                          </Link> 
                        )
                      })

                    }
                </div>
            </nav>
            <Notification isTrue={isNotification} display={openBool} />
            <Messages display={msgDisplay}/>  
    <OfferContext.Provider value={displayContext}>
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
