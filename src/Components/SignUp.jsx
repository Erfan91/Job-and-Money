import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { BsCheckCircleFill, BsQuestionCircleFill } from 'react-icons/bs'
const SignUp = () => {

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
  const [pssErr, setPssErr] = useState("Your password doesn't match")
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
        }

      })
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

  const forms = (e) => {
    const target = e.target.value;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    if (reg.test(target) === false) {
      setEmailErr('incorrect email')
    } else {
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
        <span>Choose What you're looking for <BsQuestionCircleFill className='question-icon'/></span>
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
          </div>
          <span className='err-span'>{userNameErr}</span>
          <div className='form-names'>
            <div>
              <label className='global-label'>Enter your name</label>
              <input type="name" placeholder='Erfan' className='global-input' onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className='global-label'>Surname</label>
              <input type='text' placeholder='Sayed' className='global-input' onChange={(e) => setSurName(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='sup-birthDate'>
          <label className='global-label'>Date of birth</label>
          <input type="Date" placeholder='12/2/1999' className='global-input' onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <div className='form-names email-sup'>
          <div>
            <label className='global-label'>Enter your Email</label>
            <input type="email" placeholder='someone@example.com' className='global-input' onChange={forms} />
            <span className='err-span'>{emailErr}</span>
          </div>
          <div className=''>
            <label className='global-label'>Enter your phone numnber</label>
            <input type="text" placeholder='0101002222' className='global-input' onChange={(e) => setPhoneNum(e.target.value)} />
          </div>
        </div>
        <div className='pswd-container'>
          <div className="pswd-sup">
            <div className="pswd-sup">
              <label className='global-label'>Enter your Password</label>
              <input type="password" className='global-input' onChange={(e) => setTestCode(e.target.value)} />
            </div>
            <div className="pswd-sup">
              <label className='global-label'>Enter your Password</label>
              <input type="password" className='global-input' onChange={(e) => {
                setCode(e.target.value)
                setPssErr('')
              }} />
              {code !== testCode ? <span className='err-span' >{pssErr}</span> : <span className='err-span'>✔</span>}
            </div>
          </div>
          <div className='pswd-info'>
            <div>
              <BsCheckCircleFill className='check-icon' />
              <span>More than 8 characters</span>
            </div>
            <div>
              <BsCheckCircleFill className='check-icon' />
              <span>Must containe Uppercase</span>
            </div>
            <div>
              <BsCheckCircleFill className='check-icon' />
              <span>Must containe a Number</span>
            </div>
            <div>
              <BsCheckCircleFill className='check-icon' />
              <span>Must containe a Symbol</span>
            </div>
          </div>
        </div>

        <button type='submit' className='sup-submit-button' onClick={sender}>Submit</button>
      </div>
    </div>
  )
}

export default SignUp