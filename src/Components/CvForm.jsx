import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { BiMessage, BiNotification, BiSearch, BiArrowBack } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
const CvForm = () => {
    const Navigate = useNavigate()
    const [display, setDisplay] = useState('none');
    const [displayB, setDisplayB] = useState('');
    const [displayC, setDisplayC] = useState('none');
    const [displayD, setDisplayD] = useState('none');
    const [displayE, setDisplayE] = useState('none');
    const [displayF, setDisplayF] = useState('none');
    const [softSkills, setSoftSkills] = useState([])
    const [skill, setSkill] = useState('')
    const [hardSkills, setHardSkills] = useState([]);
    const [hSkill, setHSkill] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [namePlaceholder, setNameHolder] = useState('First Name');
    const [lastNamePholder, setLastNameHolder] = useState('Last Name');
    const [emailPholder, setEmailHolder] = useState('name@example.com');
    const [numberPholder, setNumberHolder] = useState('0791234567');
    const [disable, setDisable] = useState(Boolean)
    const [info, setInfo] = useState([])
    const [listDisplay, setListDisplay] = useState('none')
    const [listDisplay1, setListDisplay1] = useState('none')
    const id = JSON.stringify(localStorage.getItem('_id'))
    const ids = JSON.parse(id)
    const fillInfo = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3001/user/${ids}`)
            .then(result => result.json())
            .then(json => {
                console.log(json)
                setInfo([json])
                setNameHolder(json.name);
                setCvName(json.name);
                setCvLastName(json.surName);
                setPhoneNumber(json.phoneNumber);
                setEmail(json.email);
                setLastNameHolder(json.surName);
                setEmailHolder(json.email);
                setNumberHolder(json.phoneNumber);
                setDisable(true)
            }
            )
    }
    // input vlaues below 🔽
    const [cvName, setCvName] = useState('');
    const [cvLastName, setCvLastName] = useState('')
    const [cvTitle, setCvTitle] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    // function which send data to back and registers to Cv model/collection in data base🔽
    const sendInfo = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/cv', {
            method: 'POST',
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                firstName: cvName,
                lastName: cvLastName,
                jobTitle: cvTitle,
                contactNumber: phoneNumber,
                address: address,
                email: email,
                softSkills: softSkills,
                hardSkills: hardSkills,
                achievement: file1,
                experienceDocs: file,
                ownerId: ids
            })
        }).then(result => result.json())
            .then(json => {
                console.log(json);
            })
        Navigate('/empe-profile')
        sendExp()
    }

    // documents upload functions🔽
    const [myImage, setImage] = useState('');
    const [file, setFile] = useState([]);
    const [file1, setFile1] = useState([])
    let [changer, setChanger] = useState(Boolean)

    const imageUploader = React.useRef(null);
    let uploadedImage = React.useRef(null);
    const imageChanger = e => {
        const [file] = e.target.files;
        if (file) {
            setChanger(changer = false)
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
    const imageUploader1 = React.useRef(null);
    let uploadedImage1 = React.useRef(null);
    const imageChanger1 = e => {
        const [file] = e.target.files;
        if (file) {
            setChanger(changer = true)
            const reader = new FileReader();
            const { current } = uploadedImage1;
            setImage(e.target.files[0])
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result
            }
            reader.readAsDataURL(file);
        }
    }
    // console.log(changer)
    const uploadImage = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('myImage', myImage)
        axios({
            method: "post",
            url: 'http://localhost:3001/cv/upload-image',
            data: formData

        })
            .then(result => {
                const { data } = result;
                if (!changer) {
                    setFile(file => [...file, data.url])
                    console.log(file, 'FIELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLSSSSSSSSSSSSESESE', file.length)
                } else {
                    setFile1(file1 => [...file1, data.url])
                    console.log(file1, '111', file1.length)

                }

            })
            .catch(err => {
                console.log(err)
            })
        setDisplay('none')
    }



    // exprience input values🔽
    const [expTitle, setExpTitle] = useState('');
    const [expStartDate, setExpStartDate] = useState('');
    const [expEndDate, setExpEndDate] = useState('');
    const [expCity, setExpCity] = useState('');
    const [expDescription, setExpDesc] = useState('');
    const [expCompany, setExpCompany] = useState('');

    const sendExp = () => {
        // e.preventDefault()
        fetch('http://localhost:3001/exp', {
            method: 'POST',
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                title: expTitle,
                startDate: expStartDate,
                endDate: expEndDate,
                city: expCity,
                description: expDescription,
                company: expCompany,
                ownerId: ids
            })
        }).then(result => result.json())
            .then(json => {
                console.log(json);
            })
        sendEdu()
    }

    // education input values🔽
    const [eduTitle, setEduTitle] = useState('');
    const [eduStartDate, setEduStartDate] = useState('');
    const [eduEndDate, setEduEndDate] = useState('');
    const [eduCity, setEduCity] = useState('');
    const [eduField, setField] = useState('');
    const [eduDegree, setDegree] = useState('');
    const [eduDescription, setEduDesc] = useState('');
    const [eduEstablishment, setEduEstablishment] = useState('');

    const sendEdu = () => {
        // e.preventDefault('');
        fetch('http://localhost:3001/edu', {
            method: 'POST',
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                title: eduTitle,
                startDate: eduStartDate,
                endDate: eduEndDate,
                city: eduCity,
                field: eduField,
                description: eduDescription,
                degree: eduDegree,
                establishment: eduEstablishment,
                ownerId: ids
            })
        }).then(result => result.json())
            .then(result => {
                console.log(result)
            })
    }
    return (
        <div className='cv-form-main-div'>
            <nav className='pro-nav'>
                <div className='nav-child1'>
                    <span className='pro-nav-span'>Job&Money</span>
                </div>
                <div className='nav-child2'>
                    <BiNotification className='pro-icons' />
                    <BiMessage className='pro-icons' />
                    <button className='pro-nav-button'>Job Mode</button>
                    {/* <img src={} alt="profile image"/> */}
                    <div className='pro-pic-div'></div>
                </div>
            </nav>
            <form>
                <div className='cv-form-container'>
                    <div className='cv-personal-info cvF-container-child' style={{ display: displayB }}>
                        <div className='back-close-window-div'>
                            <div></div>
                            <div className='cvF-close-icon-div cvF-icn-div' onClick={() => {
                                setDisplayB('none')
                            }}>
                                <AiOutlineClose className='cvF-close-icon' />
                            </div>
                        </div>
                        <span><strong>Job&Money CV</strong></span>
                        <span>To create your Job&Money cv please fill this form below, You're few steps away </span>
                        {disable ? <button className='autofill-btn' onClick={(e) => {
                            e.preventDefault()
                            setDisable(false)
                            setNameHolder('First Name')
                            setLastNameHolder('Last Name')
                            setEmailHolder('name@example.com')
                            setNumberHolder('0791234567');
                        }}>Fill Manually</button> : <button className='autofill-btn' onClick={fillInfo}>Autofill</button>}
                        <div className='cvF-name-div child-main-container'>
                            <div className='cvF-name-child '>
                                <label htmlFor="">Your Name*</label>
                                {disable ? <input type="text" className='cvF-name-input' placeholder={namePlaceholder} disabled onChange={(e) => {
                                    e.preventDefault()
                                    setBgColor('red')
                                }} /> : <input type="text" className='cvF-name-input' placeholder={namePlaceholder} onChange={(e) => {
                                    e.preventDefault()
                                    setBgColor('red')
                                    setCvName(e.target.value)
                                }} />}
                            </div>
                            <div className='cvF-name-child last-name-container'>
                                {/* <label htmlFor="">surname</label> */}
                                {disable ? <input type="text" className='cvF-surname-input' disabled placeholder={lastNamePholder} />
                                    : <input type="text" className='cvF-surname-input' placeholder={lastNamePholder} onChange={(e) => {
                                        e.preventDefault();
                                        setCvLastName(e.target.value);
                                    }} />
                                }
                            </div>
                        </div>
                        <div className='dark-purple-line' style={{ backgroundColor: bgColor }}>
                        </div>
                        <div className='cvF-info-child2'>
                            <div className='cvF-info-child3'>
                                <div className='cvF-info-child3-title-holder child-main-container'>
                                    <label htmlFor="">Title*</label>
                                    <input type="text" className='cvF-title-input' placeholder='Carpenter' onChange={(e) => {
                                        e.preventDefault();
                                        setCvTitle(e.target.value)
                                    }} />
                                </div>
                                <div className='dark-purple-line'></div>
                                <div className='cvF-contactInfo-container child-main-container'>
                                    <div>
                                        <label htmlFor="">Email*</label>
                                        {disable ? <input type="text" className='cvF-email-input' disabled placeholder={emailPholder} />
                                            : <input type="text" className='cvF-email-input' placeholder={emailPholder} onChange={(e) => {
                                                e.preventDefault();
                                                setEmail(e.target.value)
                                            }} />
                                        }
                                    </div>
                                    <div>
                                        <label htmlFor="">Phone Number*</label>
                                        {disable ? <input type="text" className='cvF-phone-input' disabled placeholder={numberPholder} />
                                            : <input type="text" className='cvF-phone-input' placeholder={numberPholder} onChange={(e) => {
                                                e.preventDefault()
                                                setPhoneNumber(e.target.value)
                                            }} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='dark-purple-line'></div>
                            <div className='cvF-info-child3-title-holder cvF-address-holder'>
                                <label htmlFor="">Address</label>
                                <input type="text" className='cvF-address-input' onChange={(e) => {
                                    e.preventDefault()
                                    setAddress(e.target.value)
                                }} />
                            </div>
                            <button className='next-btn' onClick={(e) => {
                                e.preventDefault()
                                setDisplay('flex')
                                setDisplayB('none')
                            }}>Next</button>
                        </div>
                    </div>
                    <div className='cvF-experience-div cvF-container-child' style={{ display: display }}>
                        <div className='back-close-window-div'>
                            <div className='cvF-back-icon-div cvF-icn-div' onClick={() => {
                                setDisplay('none')
                                setDisplayB('flex')
                            }}>
                                <BiArrowBack className='cvF-back-icon' />
                            </div>
                            <div className='cvF-close-icon-div cvF-icn-div' onClick={() => {
                                setDisplay('none')
                            }}>
                                <AiOutlineClose className='cvF-close-icon' />
                            </div>
                        </div>
                        <div className='exp-all-container'>
                            <span><strong>Experiences</strong></span>
                            <span>Add your professional experiences simply by filling the form below</span>
                            <p><small>Adding experiences attracts employers attention and helps you to get more offers</small></p>
                            <div className='cvF-exp-input-container'>
                                <div className='cvF-exp-title-holder'>
                                    <label htmlFor="">Title</label>
                                    <input type="text" className='cvF-exp-title-input glbl-input' onChange={(e) => {
                                        e.preventDefault()
                                        setExpTitle(e.target.value)
                                    }} />
                                    <div className='dark-purple-line'></div>
                                    <div className='cvF-name-div cvF-contactInfo-container cvF-exp-date-container'>
                                        <div>
                                            <label htmlFor="">From</label>
                                            <input type="date" className='cvF-exp-startDate-input glbl-input' onChange={(e) => {
                                                e.preventDefault()
                                                setExpStartDate(e.target.value)
                                            }} />
                                        </div>
                                        <div>
                                            <label htmlFor="">To</label>
                                            <input type="date" className='cvF-exp-endDate-input glbl-input' onChange={(e) => {
                                                e.preventDefault()
                                                setExpEndDate(e.target.value)
                                            }} />
                                        </div>
                                    </div>
                                </div>
                                <div className='dark-purple-line'></div>
                                <div className='cvF-exp-description-container'>
                                    <div className='cvF-exp-desc-child'>
                                        <div>
                                            <label htmlFor="">City</label>
                                            <input type="text" className='cvF-exp-city-input glbl-input' onChange={(e) => {
                                                e.preventDefault()
                                                setExpCity(e.target.value)
                                            }} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Company</label>
                                            <input type="text" className='cvF-exp-company-input glbl-input' onChange={(e) => {
                                                e.preventDefault()
                                                setExpCompany(e.target.value)
                                            }} />
                                        </div>
                                    </div>
                                    <div className='dark-purple-line dark2'></div>
                                    <label htmlFor="">Description</label>
                                    <textarea type="text" className='cvF-exp-description glbl-input' rows={5} onChange={(e) => {
                                        e.preventDefault()
                                        setExpDesc(e.target.value)
                                    }} />
                                </div>
                                <button className='next-btn' onClick={(e) => {
                                    e.preventDefault()
                                    setDisplay('none')
                                    setDisplayC('flex')
                                }}>Next</button>
                            </div>
                        </div>
                    </div>
                    <div className='cvF-education-div cvF-container-child' style={{ display: displayC }}>
                        <div className='back-close-window-div'>
                            <div className='cvF-back-icon-div cvF-icn-div' onClick={() => {
                                setDisplayC('none')
                                setDisplay('flex')
                            }}>
                                <BiArrowBack className='cvF-back-icon' />
                            </div>
                            <div className='cvF-close-icon-div cvF-icn-div' onClick={() => {
                                setDisplayC('none')
                            }}>
                                <AiOutlineClose className='cvF-close-icon' />
                            </div>
                        </div>
                        <span><strong>Education And Training</strong></span>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati eaque inventore voluptate ducimus?</span>
                        <div className="cvF-edu-head">
                            <label htmlFor="">Title</label>
                            <input type="text" className='cvF-edu-title-input glbl-input' onChange={(e) => {
                                e.preventDefault()
                                setEduTitle(e.target.value)
                            }} />
                            <div className='dark-purple-line'></div>
                            <div className='cvF-name-div cvF-contactInfo-container cvF-exp-date-container cvF-edu-date-div'>
                                <div>
                                    <label htmlFor="">From</label>
                                    <input type="date" className='cvF-edu-startDate-input glbl-input' onChange={(e) => {
                                        e.preventDefault()
                                        setEduStartDate(e.target.value)
                                    }} />
                                </div>
                                <div>
                                    <label htmlFor="">To</label>
                                    <input type="date" className='cvF-edu-endDate-input glbl-input' onChange={(e) => {
                                        e.preventDefault()
                                        setEduEndDate(e.target.value)
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div className='dark-purple-line'></div>
                        <div className='cvF-edu-description-div'>
                            <div className='cvF-desc-child'>
                                <div>
                                    <label htmlFor="">City</label>
                                    <input type="text" className='cvF-edu-city-input glbl-input' onChange={(e) => {
                                        e.preventDefault()
                                        setEduCity(e.target.value)
                                    }} />
                                </div>
                                <div>
                                    <label htmlFor="">Establishment</label>
                                    <input type="text" className='cvF-edu-establishment-input glbl-input' onChange={(e) => {
                                        e.preventDefault()
                                        setEduEstablishment(e.target.value);
                                    }} />
                                </div>
                            </div>
                            <div className='dark-purple-line dark2'></div>
                            <div className='cvF-desc-child'>
                                <div>
                                    <label htmlFor="">Field</label>
                                    <input type="text" className='cvF-edu-major-input glbl-input' onChange={(e) => {
                                        e.preventDefault()
                                        setField(e.target.value)
                                    }} />
                                </div>
                                <div>
                                    <label htmlFor="">Degree</label>
                                    <input type="text" className='cvF-edu-degree-input glbl-input' onChange={(e) => {
                                        e.preventDefault()
                                        setDegree(e.target.value)
                                    }} />
                                </div>
                            </div>
                            <div className='dark-purple-line dark2'></div>
                            <label htmlFor="">Description</label>
                            <textarea type="text" className='cvF-edu-description glbl-input' rows={5} onChange={(e) => {
                                e.preventDefault()
                                setEduDesc(e.target.value)
                            }} />
                        </div>
                        <button className='next-btn' onClick={(e) => {
                            e.preventDefault()
                            setDisplayC('none')
                            setDisplayD('flex')
                        }}>Next</button>
                    </div>
                    <div className="cvF-skills-div cvF-container-child" style={{ display: displayD }}>
                        <div className='back-close-window-div'>
                            <div className='cvF-back-icon-div cvF-icn-div' onClick={() => {
                                setDisplayD('none')
                                setDisplayC('flex')
                            }}>
                                <BiArrowBack className='cvF-back-icon' />
                            </div>
                            <div className='cvF-close-icon-div cvF-icn-div' onClick={() => {
                                setDisplayC('none')
                            }}>
                                <AiOutlineClose className='cvF-close-icon' />
                            </div>
                        </div>
                        <span><strong>Skills</strong></span>
                        <span><small><i>The skills on your resume can differentiate you from the competition so you can land the position you want.</i></small></span>
                        <div className='skill-parent-container'>
                            <div className='skill-container'>
                                <label htmlFor="">Soft-skills</label>
                                <input type="text" className='cvF-softskills-input glbl-input' onChange={(e) => {
                                    e.preventDefault()
                                    setSkill(e.target.value)
                                }} />
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setSoftSkills(softSkills => [...softSkills, skill])
                                    setListDisplay1('flex')
                                }}><small>Add</small></button>
                                <div className='skill-list' style={{display: listDisplay1}}>
                                    {
                                    softSkills.map(skill => {
                                        return (
                                            <ul>
                                                <li>{skill}</li>
                                            </ul>
                                        )
                                    })
                                }
                                </div>
                                
                            </div>
                            <div className='skill-container'>
                                <label htmlFor="">Hard-skills</label>
                                <input type="text" className='cvF-hardskills-input glbl-input' value={hSkill} onClick={()=>setHSkill('')} onChange={(e) => {
                                    e.preventDefault()
                                    setHSkill(e.target.value)
                                }} />
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setHardSkills(hardSkills => [...hardSkills, hSkill])
                                    setHSkill('')
                                    setListDisplay('flex')
                                }}><small>Add</small></button>
                                <div className='skill-list' style={{display: listDisplay}}>
                                {
                                    hardSkills.map(skill => {
                                        return (
                                            <ul>
                                                <li>{skill}</li>
                                            </ul>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                        <div className='dark-purple-line'></div>
                        <button className='next-btn' onClick={(e) => {
                            e.preventDefault()
                            setDisplayD('none')
                            setDisplayE('flex')
                        }}>Next</button>
                    </div>
                    <div className='cvF-exp-docs cvF-container-child' style={{ display: displayE }}>
                        <div className='back-close-window-div'>
                            <div className='cvF-back-icon-div cvF-icn-div' onClick={() => {
                                setDisplayE('none')
                                setDisplayD('flex')
                            }}>
                                <BiArrowBack className='cvF-back-icon' />
                            </div>
                            <div className='cvF-close-icon-div cvF-icn-div' onClick={() => {
                                setDisplayE('none')
                            }}>
                                <AiOutlineClose className='cvF-close-icon' />
                            </div>
                        </div>
                        <span><strong>Experience Documents</strong></span>
                        <label htmlFor="">Upload the documents that justifies your experience</label>
                        <p><small><i>by uploading experience documents you can earn the professional badge and get paid more than a regular worker</i></small></p>
                        <div className='issue-img1-div'>
                            <input type="file" accept='/image*' ref={imageUploader} onChange={imageChanger} style={{ display: 'none' }} />
                            <div className='issue-img1-div2' onClick={() => {
                                imageUploader.current.click()
                                setDisplay('none')
                            }}>
                                <img ref={uploadedImage} className='issue-image' />
                            </div>
                            <button onClick={uploadImage} className='upload-btn'>Upload</button>
                        </div>
                        <button className='next-btn' onClick={(e) => {
                            e.preventDefault()
                            setDisplayE('none')
                            setDisplayF('flex')
                            setChanger(changer = true)
                        }}>Next</button>
                    </div>
                    <div className='cvF-achievements-div cvF-container-child' style={{ display: displayF }}>
                        <div className='back-close-window-div'>
                            <div className='cvF-back-icon-div cvF-icn-div' onClick={() => {
                                setDisplayF('none')
                                setDisplayE('flex')
                                setChanger(changer = false)
                            }}>
                                <BiArrowBack className='cvF-back-icon' />
                            </div>
                            <div className='cvF-close-icon-div cvF-icn-div' onClick={() => {
                                setDisplayF('none')
                            }}>
                                <AiOutlineClose className='cvF-close-icon' />
                            </div>
                        </div>
                        <span><strong>Professional Achievements</strong></span>
                        <label htmlFor="">Upload what you achieved professionally in your career</label>
                        <div className='issue-img1-div doc-holder-div'>
                            <input type="file" accept='/image*' ref={imageUploader1} onChange={imageChanger1} style={{ display: 'none' }} />
                            <div className='issue-img1-div2' onClick={() => {
                                imageUploader1.current.click()
                                setDisplay('none')
                            }}>
                                <img ref={uploadedImage1} className='issue-image' />
                            </div>
                            <button onClick={uploadImage} className='upload-btn'>Upload</button>
                        </div>
                        <button type='submit' className='cvF-submit-btn' onClick={sendInfo}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CvForm