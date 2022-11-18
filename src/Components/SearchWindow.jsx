import React from 'react'
import { useState } from 'react'
import { MdOutlineDocumentScanner, MdOutlineAutoGraph, MdOutlineConnectWithoutContact} from "react-icons/md";
import { SiHandshake} from "react-icons/si";
const SearchWindow = (props) => {
    const [display, setDisplay] = useState('');
    const [headTitle, setHeadTitle] = useState('');
    const [content, setContent] = useState('');
    const [contentIndex, setCIndex] = useState(null)    
    const [firstDisplay, setFirstDisplay] = useState('none')
    const [secondDisplay, setSecDisplay] = useState('none')
  return (
    <div className='main-search-window' style={{display: props.displayS}}>
        {
            props.data.map((content, index)=>{
                return(
                    <div className='result-content-container'>
                        <img src={content.image} className="search-image"/>
                        <div className='result-content-details'>
                            <span className='result-name'>{content.name} {content.surName}</span>
                            <p className='result-username'>@{content.userName}</p>
                        </div>
                        <div className='result-content-icons'>
                            <div className='result-wrkd-icon-div result-icons'>
                               <SiHandshake className='result-handshake'/> 
                            </div>
                            <div className='result-contact-div result-icons'>
                                <MdOutlineConnectWithoutContact className='result-contact'/>
                            </div>
                            <div className='result-rating-div result-icons'>
                                <MdOutlineAutoGraph className='result-rating'/>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default SearchWindow