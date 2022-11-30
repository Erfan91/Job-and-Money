import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BsCheckCircleFill, BsQuestionCircleFill } from 'react-icons/bs'
import { MdError } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { OfferContext } from '../App';
import { useContext } from 'react';
import { useEffect } from 'react';
const SignUp = () => {
const Navigate = useNavigate()
  let [isEmployer, setEmployer] = useState('')
  const [name, setName] = useState('')
  const [surName, setSurName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [testCode, setTestCode] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [userName, setUserName] = useState('')
  const [userNameErr, setNameErr] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [pssErr, setPssErr] = useState("")
  const {setDisplayN} = useContext(OfferContext)
  const [check, setCheck] = useState(Boolean)
  const [pssClass, setPssClass] = useState('pss-check-span')
  const [upperClass, setUpperClass] = useState('upper-check-span');
  const [numClass, setNumClass] = useState('number-check-span');
  const [symClass, setSymClass] = useState('symbol-check-span')
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [color3, setColor3] = useState('');
  const [color4, setColor4] = useState('');
  const [color5, setColor5] = useState('');
  const sender = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        employer: isEmployer,
        userName: userName,
        name: name,
        surName: surName,
        dateOfBirth: birthDate,
        email: email,
        password: code,
        phoneNumber: phoneNum,
        image: file
      })
    }).then(res => res.json())
      .then(json => {
        console.log(json)
        if (json.issue === true) {
          setNameErr('UserName has been taken choose a different user name')
        }
        if (!json.issue) {
          setEmailErr('Email Already exists')
        }else{
          Navigate('/')
        }

      })

  }

  useEffect(()=>{
    setDisplayN('none')
  },[])

  const values = ()=>{
    const array = [userName, name, surName, birthDate, email, code, phoneNum]
    for(var i = 0; i <= array.length; i++){
      if(array[i] === ""){
        return console.log("Empty", array[i])
      }
    }
  }

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [myImage, setImage] = useState('');
  const [file, setFile] = useState('');
  const [display, setDisplay] = useState('block')
  const imageChanger = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      setImage(e.target.files[0])
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file);
    }
  }

  const uploadImage = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('myImage', myImage)
    axios({
      method: "post",
      url: 'http://localhost:3001/user/upload-image',
      data: formData
    })
      .then(result => {
        const { data } = result;
        setFile(data.url)

      })
      .catch(err => {
        console.log(err)
      })
    setDisplay('none')
  }

  const checkUpper = (str)=>{
    const reg =  /[A-Z]/.test(str)
    if(!reg){
     setColor2('red')
      setCheck(false)
    }else{
      setColor2('aquamarine')
      setCheck(true)
    }
  }
  const checkLower = (str)=>{
    const reg =  /[a-z]/.test(str)
    if(!reg){
      setColor5('red')
      setCheck(false)
    }else{
      setColor5('aquamarine')
      setCheck(true)
    }
  }
  const checkSpe = (str)=>{
    const reg =  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if(!reg.test(str)){
      setColor4('red')
      setCheck(check=>check = false)
    }else{
      setColor4('aquamarine')
      setCheck(check=>check = true)
    }
  }
  const checkNum = (str)=>{
    const reg = /[0-9]/
    if(!reg.test(str)){
      setColor3('red')
      setCheck(false)
    }else{
      setColor3('aquamarine')
      setCheck(true)
    }
  }

  const forms = (e) => {
    const target = e.target.value;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    if (reg.test(target) === false) {
      setEmailErr(<MdError className='mdError-icon'/>)
      setCheck(false)
    } else {
      setEmailErr(<GrStatusGood className='mdError-icon2'/>)
      setCheck(true)
    }
    if(target === ""){
      setEmailErr('')
    
    }
    setEmail(target)
  }


  return (
    <div className='main-div-sup'>
      <div className='form-div'>
        <div className='form-head'>
          <h5>New to the platform ?</h5>
          <span>We got your back, let's create an account to get started</span>
        </div>
        <div className='upload-first-div'>
          <input type="file" accept='/image*' ref={imageUploader} onChange={imageChanger} style={{ display: 'none' }} />
          <div className='upload-second-div' onClick={() => {
            imageUploader.current.click()
            setDisplay('none')
          }}>
            <img ref={uploadedImage} className='uploaded-image' />
            <span className='upload-span' style={{ display: display }}>+</span>
          </div>
          <button onClick={uploadImage} className='upload-btn'>Upload</button>
        </div>
        <span>Choose What you're looking for <BsQuestionCircleFill className='question-icon' /></span>
        <div className='empe-btn-div'>
          <div>
            {/* <p>If you're looking for someone to get your job done, click on the button below</p> */}
            <button className='emper-btn' onClick={() => setEmployer(true)}>Employer</button>
          </div>
          <div>
            {/* <p>If you're looking for daily missions and extra money, Employee mode is for you</p> */}
            <button className='empe-btn' onClick={() => setEmployer(false)}>Employee</button>
          </div>
        </div>
        <div className='form-child'>
          <div className='username-sup'>
            <label className='global-label'>Username*</label>
            <input type="text" placeholder='user name must be unique' className='global-input' onChange={(e) => {
              setNameErr('')
              setUserName(e.target.value)
            }
            } />
            <span className='err-span'>{userNameErr}</span>
          </div>
          <div className='form-names'>
            <div>
              <label className='global-label'>Enter your name*</label>
              <input type="name" placeholder='Erfan' className='global-input' onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className='global-label'>Surname*</label>
              <input type='text' placeholder='Sayed' className='global-input' onChange={(e) => setSurName(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='sup-birthDate'>
          <label className='global-label'>Date of birth*</label>
          <input type="Date" placeholder='12/2/1999' className='global-input' onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <div className='form-names email-sup'>
          <div>
            <label className='global-label'>Enter your Email*</label>
            <div className='email-input-div'>
              <input type="email" placeholder='someone@example.com' className='global-input' onClick={() => setEmailErr('')} onChange={forms} />
              <span className='err-span'>{emailErr}</span>
            </div>
          </div>
          <div className=''>
            <label className='global-label'>Enter your phone number*</label>
            <input type="text" placeholder='0101002222' className='global-input' onChange={(e) => setPhoneNum(e.target.value)} />
          </div>
        </div>
        <div className='pswd-container'>
          <div className="pswd-sup">
            <div className="pswd-sup">
              <label className='global-label'>Enter your Password*</label>
              <input type="password" className='global-input' onChange={(e) =>{
                 setTestCode(e.target.value)
                 if(e.target.value.length < 8){
                  setColor1('red')
                  setCheck(false)
                 }else{
                  setColor1('aquamarine')
                  setCheck(true)
                 }
                 checkUpper(e.target.value)
                 checkLower(e.target.value)
                 checkSpe(e.target.value)
                 checkNum(e.target.value)
                 }} />
            </div>
            <div className="pswd-sup">
              <label className='global-label'>Confirm your Password*</label>
              <input type="password" className='global-input' onChange={(e) => {
                setCode(e.target.value)

                if(e.target.value !== testCode){
                  setPssErr("Password didn't match")
                }else if(e.target.value == ""){
                  setPssErr('')
                }else if(e.target.value == testCode){
                  setPssErr('')
                }
              }} />
              <span>{pssErr}</span>
            </div>
          </div>
          <div className='pswd-info'>
            <div>
              <BsCheckCircleFill className='check-icon check-pss' style={{color: color1}}/>
              <span className={pssClass}>More than 8 characters</span>
            </div>
            <div>
              <BsCheckCircleFill className='check-icon' style={{color: color2}}/>
              <span className={upperClass}>Must containe Uppercase</span>
            </div>
            <div>
              <BsCheckCircleFill className='check-icon' style={{color: color5}}/>
              <span className={upperClass}>Must containe Lowercase</span>
            </div>
            <div>
              <BsCheckCircleFill className='check-icon' style={{color: color3}}/>
              <span className={numClass}>Must containe a Number</span>
            </div>
            <div>
              <BsCheckCircleFill className='check-icon' style={{color: color4}}/>
              <span className={symClass}>Must containe a Symbol</span>
            </div>
          </div>
        </div>

       {check? <button type='submit' className='sup-submit-button' onClick={sender}>Submit</button>:<button type='submit' disabled className='sup-submit-button' onClick={sender}>Submit</button>}
      </div>
    </div>
  )
}

export default SignUp