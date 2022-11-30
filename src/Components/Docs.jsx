import React from 'react'
import { useState, useEffect } from 'react';
import { BiMessage, BiNotification, BiErrorCircle } from "react-icons/bi";
import { BsCreditCard2BackFill, BsClock, BsReplyAllFill, BsFillCalendarDateFill, BsPlus, BsFillCheckCircleFill } from "react-icons/bs";
import { FcSimCardChip } from "react-icons/fc";
import { HiOutlineSave } from "react-icons/hi";
import { AiOutlineFieldTime, AiOutlinePhone, AiOutlineSearch, AiOutlineRollback } from "react-icons/ai";
import moment from 'moment';
// BsFillCreditCardFill
const Docs = () => {
  const [cvInfo, setCvInfo] = useState([]);
  const [accInfo, setAccInfo] = useState([])
  const [info, setInfo] = useState([]);
  const [inputIndex, setInputIndex] = useState(null)
  const [inputIndexB, setInputIndexB] = useState(null)
  const [display, setDisplay] = useState('none')
  const [errDisplay, setErrDisplay] = useState('none')
  const [errContainerDis, setContainerDis] = useState('flex')
  const [cardFrontDis, setFrontDis] = useState('flex')
  const [cardCvvDis, setCvvDis] = useState('none')
  const [isCard, setCard] = useState(Boolean)
  const [container, setConatiner] = useState([])
  const [docName, setDocName] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cvvVal, setCvvVal] = useState('')
  const [cardNameVal, setNameVal] = useState('')
  const [cardSubmitMessage, setMessage] = useState('')
  const id = JSON.stringify(localStorage.getItem('_id'))
  const ids = JSON.parse(id)

  useEffect(() => {
    fetch(`http://localhost:3001/cv/${ids}`)
      .then(result => result.json())
      .then(json => {
        console.log(json)
        setCvInfo([json.result])
        if(!json.result){
          console.log("cv not found")
          setCvInfo(["cv not found"])
        }
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
          setAccInfo([json])
          setCard(true)
        } else {
          setCard(false)
        }
      })
  }, [])

  const sendCardInfo = (e) =>{
    e.preventDefault()
    fetch('http://localhost:3001/acc',{
      method:'POST',
      headers: new Headers({"content-type":"application/json"}),
      body: JSON.stringify({
        fullName: cardHolder,
        validityDate: cardDate,
        cardNumber: cardNum,
        cvv:cvvVal,
        cardName: cardNameVal,
        ownerId:ids
      })
    }).then(result=>result.json())
    .then(json=>{
      if(json){
        console.log(json)
      }else{
        setMessage(json.message)
      }
    })
  }

  return (
    <div className='docs-main-div'>
      <div className='docs-main-child'>
        <h3 className='docs-h3'>Bank Account Info</h3>
        <section className='bank-acc-section docs-section'>
          <div className='bank-acc-main-div'>
            <BiErrorCircle className='err-sm-icon' style={{ display: errDisplay }} />
            {!isCard ?
              <div className='card-err-container' style={{ errContainerDis }}>
                <div className='card-err-div'>
                  <BiErrorCircle className='err-icon' />
                  <span>Card not found ! :(</span>
                </div>
                <div className='add-card-div' onClick={() => {
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
              <div className='bank-card-create-model' style={{ display: errContainerDis }}>
                {
                  accInfo.map(card=>{
                    let spaced = card.cardNumber
                    for(var i = 0; i <= spaced.length; i++){
                      if(i > 4){
                         i=i+ " "
                        return spaced += spaced[i] 
                      }else{
                        console.log('faild')
                      }
                    }
                    return(
                      <>
                      <FcSimCardChip className='card-chip-icon'/>
                      <div className="card-num-div">
                        <span>{spaced}</span>
                      </div>
                      <div className='card-date-div'>
                        <span>{moment(card.validityDate).format('MMM YY')}</span>
                      </div>
                      <div className='cardHolder-div'>
                        <span>{card.fullName}</span>
                      </div>
                      </>
                    )
                  })
                }
              </div>
            }
            <div className="bank-card-create-model" style={{ display: display }}>
              <div className='card-num-div' style={{ display: cardFrontDis }}>
                <label htmlFor="" className='card-label'>Card number</label>
                <input type="text" maxLength={16} className='card-num-input' placeholder='#0000' onChange={(e) => {
                  e.preventDefault()
                  setCardNum(e.target.value)
                }} />
              </div>
              <div className='card-date-div' style={{ display: cardFrontDis }}>
                <label htmlFor="" className='card-label'>Date of validity</label>
                <input type="date" className='card-date-input card-num-input' onChange={(e) => {
                  e.preventDefault()
                  setCardDate(e.target.value)
                }} />
              </div>
              <div className='cardHolder-div' style={{ display: cardFrontDis }}>
                <label htmlFor="" className='card-label'>Card Holder</label>
                <input type="text" className='card-fullName-input card-num-input' placeholder='Card holder full Name' onChange={(e) => {
                  e.preventDefault()
                  setCardHolder(e.target.value)
                }} />
              </div>
              <div className='cardName-cvv-container' style={{ display: cardCvvDis }}>
                <div className='name-cvv-child'>
                  <div className='card-name-div'>
                    <label htmlFor="" className='card-label'>Card Name</label>
                    <input type="text" className='card-name-input' placeholder='example bank card' onChange={(e)=>{
                      e.preventDefault()
                      setNameVal(e.target.value)
                    }}/>
                  </div>
                  <div className='card-cvv-div'>
                    <label htmlFor="" className='card-label'>CVV</label>
                    <input type="text" maxLength={3} className='card-cvv-input' onChange={(e)=>{
                      e.preventDefault()
                      setCvvVal(e.target.value)
                    }}/>
                  </div>
                </div>
                <div className='cvv-child2'>
                  <div onClick={()=>{
                    setFrontDis('flex')
                    setCvvDis('none')
                  }}>
                    <AiOutlineRollback className='roll-back-icon cvv-side-icon' />
                    <span>Back</span>
                  </div>
                  <div>
                   {cardNameVal && cvvVal !== ""? <button onClick={sendCardInfo}><HiOutlineSave className='save-icon cvv-side-icon' /></button>: <HiOutlineSave className='save-icon save-red-icon cvv-side-icon' />}
                    <span>Save Card</span>
                  </div>
                </div>
                <p><small><i>{cardSubmitMessage}</i></small></p>
              </div>
              {
                cardNum && cardDate && cardHolder !== "" ? <BsFillCheckCircleFill className='checked-icon' style={{ display: cardFrontDis }} onClick={() => {
                  setFrontDis('none')
                  setCvvDis('flex')
                }} /> : <BsFillCheckCircleFill className='checked-red-icon' />
              }

            </div>
            <button>Add my card later</button>
          </div>
        </section>
        <h3 className='docs-h3'>Experience Docs</h3>
        <section className='exp-docs-section docs-section'>
          {
            cvInfo?.map(content => {
              console.log("content", content)
              return (
                <div className='exp-docs-div '>
                  {
                    content?.experienceDocs?.map((doc, index) => {
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
                            setDocName(e.target.value)
                          }} />
                          }
                          <button onClick={(e) => {
                            e.preventDefault()
                            setConatiner(container => [...container, docName])
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
            cvInfo?.map(content => {
              return (
                <div className='exp-docs-div '>
                  {
                    content?.achievement?.map((doc, index) => {
                      return (
                        <div className='docs-container-parent'>
                          <p className='index-num-p'>{index + 1}</p>
                          <div className='docs-div-child'>
                            <img src={doc} alt="image not found" className="docs-image" />
                            <p onClick={() => {
                              // by clicking on p i assigne the inputIndex to the index of each element, 
                              // but if inputIndex already equals to for example to index 1 and user clicks on the same element again, 
                              // so it wil change its value to null to prevent dispalying the same input for all of them in one click.
                              setInputIndexB(inputIndexB => inputIndexB === index ? null : index)
                            }}>give a name</p>
                          </div>
                          {inputIndexB === index && <input type="text" onChange={(e) => {
                            setDocName(e.target.value)
                          }} />
                          }
                          <button onClick={(e) => {
                            e.preventDefault()
                            setConatiner(container => [...container, docName])
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