import React from 'react'
import { useState, useEffect} from 'react';
const Cv = () => {
  const [cvInfo, setCvInfo] = useState([]);
  const id = JSON.stringify(localStorage.getItem('_id'))
  const ids = JSON.parse(id)

  useEffect(()=>{
    fetch(`http://localhost:3001/cv/${ids}`)
    .then(result=>result.json())
    .then(json=>{
      console.log(json)
      setCvInfo([json])
    })
  },[])
  return (
    <div className='cv-main-div'>
      <div className="cv-section-continer">
        <section className='cv-exp-section'>
          <h3 className='exp-h3'>Experiences</h3>
          {
            cvInfo.map(content=>{
              return(
                <div className='exp-content-container'>
                 {
                  content.experience.map(exp=>{
                    return(
                      <>
                      <div className='exp-head-content'>
                      <span className='exp-company-span'>{exp.company}</span>
                      <span>{exp.title}</span>
                      <span>{exp.startDate} - {exp.endDate}</span>
                      <span><small>{exp.city}</small></span>
                      </div>
                      <p>{exp.description}</p>
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
          <div className='cv-personal-content-main-div'>
            {
              cvInfo.map(content=>{
                return(
                  <div>
                    <img src={content.ownerId.image} alt="image not found" style={{width:'100px', height:'100px'}}/>
                    <div className='cv-personal-info'>
                      <div className='cv-name-title-container'>
                        <h4>{content.ownerId.name} {content.ownerId.surName}</h4>
                        <p>Director</p>
                      </div>
                      <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem error alias praesentium nesciunt consequatur ullam architecto, enim, quod culpa eveniet earum rem tempora facere cumque?</p>
                      </div>
                    </div>
                    <div className='cv-personal-data'>
                      <div className='cv-address-div'>
                          <h5>Address</h5>
                          <p>{content.address}</p>
                      </div>
                      <div className='cv-number-div'>
                        <h5>Phone Number</h5>
                        <p>{content.ownerId.phoneNumber}</p>
                      </div>
                      <div className='cv-email-div'>
                        <h5>Email</h5>
                        <p>{content.ownerId.email}</p>
                      </div>
                      <div className='cv-website-div'>
                        <h5>Website</h5>
                        <p>||</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>


        <section className='cv-edu-section'>
        <h3 className='exp-h3'>Education</h3>
          {
            cvInfo.map(content=>{
              return(
                <div className='exp-content-container edu-content-container'>
                 {
                  content.education.map(exp=>{
                    return(
                      <>
                      <div className='exp-head-content'>
                      <span className='exp-company-span'>{exp.company}</span>
                      <span>{exp.title}</span>
                      <span>{exp.startDate} - {exp.endDate}</span>
                      <span><small>{exp.city}</small></span>
                      </div>
                      <p>{exp.description}</p>
                      </>
                    )
                  })
                 }
                 <h3 className='exp-h3'>Skills</h3>
                 <div className='exp-skill-content'>
                  <div>
                    <p><small>Soft Skills</small></p>
                    {
                  content.softSkills.map(skill=>{
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
                  content.hardSkills.map(skill=>{
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