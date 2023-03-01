import React from 'react'
import { useState, useEffect} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import moment from 'moment'
import { BsTwitter, BsInstagram, BsLinkedin, BsGithub, BsTwitch, BsFacebook } from 'react-icons/bs';
import { BiMessageSquareError } from 'react-icons/bi';
const Cv = (props) => {
  const Navigate = useNavigate()
  const [cvInfo, setCvInfo] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [display, setDisplay] = useState('');
  const [msgDisplay, setMsgDis] = useState('');
  const [backMsg, setBackMsg] = useState('');
  const id = JSON.stringify(localStorage.getItem('_id'))
  const ids = JSON.parse(id)
  const params = useParams() 
  useEffect(()=>{
    if(params.id !== ids){
      fetch(`http://localhost:3001/cv/${params.id}`)
      .then(result=>result.json())
      .then(json=>{
        if(!json.cv){
         setErrMsg(json.message)
          setDisplay('none')
          setMsgDis('flex')
          setBackMsg(<Link to={`/pro-nvu/${params.id}`}>Back</Link>)
        }else{
          
          console.log(json)
          setCvInfo([json.result])
          setDisplay('flex')
          setMsgDis('none')
        }
      })
    }else{
      fetch(`http://localhost:3001/cv/${ids}`)
      .then(result=>result.json())
      .then(json=>{
        if(!json.cv){
          setErrMsg("you don't have a cv yet!")
           setDisplay('none')
           setMsgDis('flex')
           setBackMsg(<Link to={`/cvForm`}>Create a Cv</Link>)
         }else{
           console.log(json)
           setCvInfo([json.result])
           setDisplay('flex')
           setMsgDis('none')
         }
      })
    }
  },[])
  return (
    <div className='cv-main-div'>
      <div className="cv-section-continer">
        <section className='cv-exp-section' style={{display: display}}>
          <h3 className='exp-h3'>Experiences</h3>
          {
            cvInfo.map(content=>{
              return(
                <div className='exp-content-container'>
                 {
                  content?.experience?.map(exp=>{
                    return(
                      <>
                      <div className='exp-head-content'>
                      <span className='exp-company-span'>{exp?.company}</span>
                      <span className='cv-title-spn'>{exp?.title}</span>
                      <span>{moment(exp?.startDate).format("MMM Do YY")} - {moment(exp?.endDate).format("MMM Do YY")}</span>
                      <span className='cv-city-spn'><small>{exp?.city}</small></span>
                      </div>
                      <p>{exp?.description}</p>
                      </>
                    )
                  })
                 }
                </div>
              )
            })
          }
        </section>


        <section className='cv-personal-content'>
          <div className='cv-personal-content-main-div'  style={{display: display}}>
            {
              cvInfo.map(content=>{
                return(
                  <div >
                    <img src={content?.ownerId?.image} alt="image not found" className='user-cv-img' />
                    <div className='cv-personal-info' >
                      <div className='cv-name-title-container'>
                        <h2 className='cv-fName-lName' test>{content?.ownerId?.name} {content?.ownerId?.surName}</h2>
                        <p><i>Director</i></p>
                      </div>
                      <div>
                        <p className='personal-desc-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem error alias praesentium nesciunt consequatur ullam architecto, enim, quod culpa eveniet earum rem tempora facere cumque?</p>
                      </div>
                    </div>
                    <div className='cv-personal-data' >
                      <div className='cv-address-div cv-content-child'>
                          <h5 className='p-info-header'>ADDRESS</h5>
                          <p className='p-info-paragraph'>{content?.address}</p>
                      </div>
                      <div className='cv-number-div cv-content-child'>
                        <h5 className='p-info-header'>PHONE NUMBER</h5>
                        <p className='p-info-paragraph'>{content?.ownerId?.phoneNumber}</p>
                      </div>
                      <div className='cv-email-div cv-content-child'>
                        <h5 className='p-info-header'>EMAIL</h5>
                        <p className='p-info-paragraph'>{content?.ownerId?.email}</p>
                      </div>
                      <div className='cv-website-div cv-content-child'>
                        <h5 className='p-info-header'>WEBSITE</h5>
                        <p className='p-info-paragraph'>||</p>
                      </div>
                    </div>
                    <div className='social-media-pages'>
                      <h3 className='exp-h3'>Social Media platforms</h3>
                      <div className='media-icon-contianer'>
                          <BsTwitter className='twitter-icon media-icon'/>
                          <BsLinkedin className='linkedin-icon media-icon'/>
                      </div>
                      <div className='media-icon-contianer'>
                          <BsTwitch className='twitch-icon media-icon'/>
                          <BsGithub className='github-icon media-icon'/>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>
            <div className="cv-err-msg" style={{display:msgDisplay}}>
              <BiMessageSquareError className='cv-err-icon'/>
              <span>{errMsg}</span>
              {backMsg}
            </div>

        <section className='cv-edu-section' style={{display: display}}>
        <h3 className='exp-h3'>Education</h3>
          {
            cvInfo.map(content=>{
              return(
                <div className='exp-content-container edu-content-container'>
                 {
                  content?.education?.map(exp=>{
                    return(
                      <>
                      <div className='exp-head-content'>
                      <span className='exp-company-span'>{exp?.company}</span>
                      <span className='cv-title-spn'>{exp?.title}</span>
                      <span>{moment(exp?.startDate).format("MMM Do YY")} - {moment(exp?.endDate).format("MMM Do YY")}</span>
                      <span className='cv-city-spn'><small>{exp?.city}</small></span>
                      </div>
                      <p>{exp?.description}</p>
                      </>
                    )
                  })
                 }
                 <h3 className='exp-h3'>Skills</h3>
                 <div className='exp-skill-content'>
                  <div>
                    <p><small>Soft Skills</small></p>
                    {
                  content?.softSkills?.map(skill=>{
                    return(
                      <ul>
                        <li>{skill}</li>
                      </ul>
                    )
                  })
                }
                  </div>
                  <div>
                    <p><small>Hard Skills</small></p>
                     {
                  content?.hardSkills?.map(skill=>{
                    return(
                      <ul>
                        <li>{skill}</li>
                      </ul>
                    )
                  })
                }
                  </div>
                </div>
                </div>
              )
            })
          }
        </section>
      </div>
    </div>
  )
}

export default Cv