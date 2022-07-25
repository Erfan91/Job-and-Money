import React from 'react'
import { useState } from 'react'
import axios  from 'axios'
const SignUp = () => {

  let [isEmployer, setEmployer] = useState('')
  const [name, setName] = useState('')
  const [surName, setSurName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [userName, setUserName] = useState('')
  const [userNameErr,setNameErr] = useState('')
  const [emailErr,setEmailErr] = useState('')
  const sender = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        employer: isEmployer,
        userName:userName,
        name: name,
        surName: surName,
        dateOfBirth: birthDate,
        email: email,
        password: code,
        phoneNumber: phoneNum,
        image:file
      })
    }).then(res => res.json())
      .then(json => {
        console.log(json)
        if(json.issue === true){
          setNameErr('UserName has been taken choose a different user name')
        }
        if(!json.issue){
          setEmailErr('Email Already exists')
        }
        
      })
  }

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const [myImage,setImage] = useState('');
    const [file, setFile] = useState('');
    const [display, setDisplay] = useState('block')
    const imageChanger = e =>{
      const [file] = e.target.files;
      if(file) {
        const reader = new FileReader();
        const {current} = uploadedImage;
        setImage(e.target.files[0])
        current.file = file;
        reader.onload = e =>{
          current.src = e.target.result
        }
        reader.readAsDataURL(file);
      }
    }

    const uploadImage = e =>{
      e.preventDefault()
      const formData = new FormData()
      formData.append('myImage', myImage)
      axios({
        method:"post",
        url:'http://localhost:3001/user/upload-image',
        data:formData
      })
      .then(result=>{
        const {data} = result;
        setFile(data.url)

      })
      .catch(err=>{
        console.log(err)
      })
      setDisplay('none')
    }



  return (
    <div className='main-div-sup'>
      <div className='form-div'>
        <h5>New to the platform ?</h5>
        <span>We got your back, let's create an acount to get started</span>

      </div>
      <div className='form-div'>
        <div className='upload-first-div'>
          <input type="file" accept='/image*' ref={imageUploader} onChange={imageChanger} style={{display:'none'}}/>
          <div className='upload-second-div' onClick={()=>{
            imageUploader.current.click()
            setDisplay('none')
          }}> 
            <img ref={uploadedImage} className='uploaded-image' />
            <span className='upload-span' style={{display:display}}>+</span>
          </div>
          <button onClick={uploadImage} className='upload-btn'>Upload</button>
        </div>
        <div>
          <button onClick={() => setEmployer(true)}>Employer</button><button onClick={() => setEmployer(false)}>Employee</button>
        </div>
        <div className='form-child'>
          <label >User Name</label>
          <input type="text" placeholder='user name must be unique' onChange={(e)=>{
            setNameErr('')
            setUserName(e.target.value)}
            }/>
          <span className='err-span'>{userNameErr}</span>
          <label>Enter your name</label>
          <input type="name" placeholder='Erfan' onChange={(e) => setName(e.target.value)} />
          <label>Surname</label>
          <input type='text' placeholder='Sayed' onChange={(e) => setSurName(e.target.value)} />
        </div>
        <div className='form-child'>
          <label >Date of birth</label>
          <input type="string" placeholder='12/2/1999' onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <div className='form-child'>
          <label>Enter your Email</label>
          <input type="email" placeholder='someone@example.com' onChange={(e) => {
            setEmail(e.target.value)
            setEmailErr('')
            }} />
          <span className='err-span'>{emailErr}</span>
          <label>Enter your Password</label>
          <input type="password" onChange={(e) => setCode(e.target.value)} />
        </div>
        <div className='form-child'>
          <label>Enter your phone numnber</label>
          <input type="text" placeholder='0101002222' onChange={(e) => setPhoneNum(e.target.value)} />
        </div>
        <button type='submit' onClick={sender}>Submit</button>
      </div>
          <div className='design-div'>
              
          </div>
    </div>
  )
}

export default SignUp