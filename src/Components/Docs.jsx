import React from 'react'
import { useState, useEffect } from 'react';
import { BiMessage, BiNotification, BiErrorCircle } from "react-icons/bi";
import { BsCreditCard2BackFill, BsClock, BsReplyAllFill, BsFillCalendarDateFill, BsPlus } from "react-icons/bs";
import { FcSimCardChip } from "react-icons/fc";
// BsFillCreditCardFill
const Docs = () => {
  const [cvInfo, setCvInfo] = useState([]);
  const [info, setInfo] = useState([]);
  const [inputIndex, setInputIndex] = useState(null)
  const [display, setDisplay] = useState('none')
  const [errDisplay, setErrDisplay] = useState('none')
  const [errContainerDis, setContainerDis] = useState('flex')
  const [icon, setIcon] = useState('')
  const [isCard, setCard] = useState(Boolean)
  const [container, setConatiner] = useState([])
  const [pName, setPName] = useState('')

  const id = JSON.stringify(localStorage.getItem('_id'))
  const ids = JSON.parse(id)

  useEffect(() => {
    fetch(`http://localhost:3001/cv/${ids}`)
      .then(result => result.json())
      .then(json => {
        console.log(json)
        setCvInfo([json])
      })
  }, [])

  useEffect(() => {
    fetch(`http://localhost:3001/user/${ids}`)
      .then(result => result.json())
      .then(json => {
        console.log(json)
        setInfo([json])
      })
    // console.log(info[0].image)
  }, [])

  useEffect(() => {
    fetch(`http://localhost:3001/acc/${ids}`)
      .then(result => result.json())
      .then(json => {
        if (json) {
          // setDisplay('flex')
          setCard(true)
        } else {
          setCard(false)
        }
      })
  }, [])

  return (
    <div className='docs-main-div'>
      {info.map(user => {
        console.log(user, "USERUSER")
        return (
          <div>
            <nav className='pro-nav'>
              <div className='nav-child1'>
                <span className='pro-nav-span'>Job&Money</span>
              </div>
              <div className='nav-child2'>
                <BiNotification className='pro-icons' />
                <BiMessage className='pro-icons' />
                <img src={user.image} alt="profile image" className='profile-image' />
              </div>
            </nav>
          </div>
        )
      })
      }
      <div className='docs-main-child'>
        <h3 className='docs-h3'>Bank Account Info</h3>
        <section className='bank-acc-section docs-section'>
          <div className='bank-acc-main-div'>
          <BiErrorCircle className='err-sm-icon' style={{display:errDisplay}}/>
            {!isCard ?
              <div className='card-err-container' style={{errContainerDis}}>
                <div className='card-err-div'>
                  <BiErrorCircle className='err-icon' />
                  <span>Card not found ! :(</span>
                </div>
                <div className='add-card-div' onClick={()=>{
                  setDisplay('flex')
                  setErrDisplay('block')
                  setContainerDis('none')
                  setCard(true)
                }}>
                  <BsCreditCard2BackFill className='card-icon' />
                  <span>Add my Bank Card</span>
                </div>
                  <p className='att-p'><small><i>Attention! without registering a vaild Bank card you can't apply nor create an offer</i></small></p>
              </div>
              :
              <div className='bank-card-model' style={{display:errContainerDis}}>
                
              </div>
            }
            <div className="bank-card-create-model" style={{ display: display }}>
              <div className='card-chip'>
                <FcSimCardChip className='card-chip-icon'/>
              </div>
              <div className='card-num-div'>
                <input type="text" className='card-num-input'/>
              </div>
              <div className='card-date-div'>
                  <input type="date" className='card-date-input'/>
              </div>
              <div className='cardHolder-div'>
                <input type="text" className='card-fullName-div'/>
              </div>
            </div>
            <button>Add my card later</button>
          </div>
        </section>
        <h3 className='docs-h3'>Experience Docs</h3>
        <section className='exp-docs-section docs-section'>
          {
            cvInfo.map(content => {
              return (
                <div className='exp-docs-div '>
                  {
                    content.experienceDocs.map((doc, index) => {
                      return (
                        <div className='docs-container-parent'>
                          <p className='index-num-p'>{index + 1}</p>
                          <div className='docs-div-child'>
                            <img src={doc} alt="image not found" className="docs-image" />
                            <p onClick={() => {
                              // by clicking on p i assigne the inputIndex to the index of each element, 
                              // but if inputIndex already equals to for example to index 1 and user clicks on the same element again, 
                              // so it wil change its value to null to prevent dispalying the same input for all of them in one click.
                              setInputIndex(inputIndex => inputIndex === index ? null : index)
                            }}>give a name</p>
                          </div>
                          {inputIndex === index && <input type="text" onChange={(e) => {
                            setPName(e.target.value)
                          }} />
                          }
                          <button onClick={(e) => {
                            e.preventDefault()
                            setConatiner(container => [...container, pName])
                          }}>valid</button>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </section>
        <h3 className='docs-h3'>Achievements</h3>
        <section className='ach-docs-section docs-section'>
          {
            cvInfo.map(content => {
              return (
                <div className='exp-docs-div '>
                  {
                    content.achievement.map((doc, index) => {
                      return (
                        <div className='docs-container-parent'>
                          <p className='index-num-p'>{index + 1}</p>
                          <div className='docs-div-child'>
                            <img src={doc} alt="image not found" className="docs-image" />
                            <p onClick={() => {
                              // by clicking on p i assigne the inputIndex to the index of each element, 
                              // but if inputIndex already equals to for example to index 1 and user clicks on the same element again, 
                              // so it wil change its value to null to prevent dispalying the same input for all of them in one click.
                              setInputIndex(inputIndex => inputIndex === index ? null : index)
                            }}>give a name</p>
                          </div>
                          {inputIndex === index && <input type="text" onChange={(e) => {
                            setPName(e.target.value)
                          }} />
                          }
                          <button onClick={(e) => {
                            e.preventDefault()
                            setConatiner(container => [...container, pName])
                          }}>valid</button>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </section>
      </div>
    </div>
  )
}

export default Docs