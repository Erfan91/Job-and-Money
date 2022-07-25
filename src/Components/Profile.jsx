import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
const Profile = () => {
    const [userInfo, setInfo] = useState([]) 
    const id = JSON.stringify(localStorage.getItem('_id'))
    const ids = JSON.parse(id)
    console.log(ids)
    useEffect(()=>{
        fetch(`http://localhost:3001/user/${ids}`)
        .then(result=> result.json())
        .then(json=>{
            console.log(json)
            setInfo([json])    
        })
        console.log(userInfo)
    },[])


  return (
    <div className='pro-main-div' style={{width:"100%", height:'100vh'}}>
        <div className='main-child' style={{width:'100rem',display:'flex', justifyContent:'center'}}>
           {
            userInfo.map(data=>{
               return(
                <div >
                    <div>
                    <img src={data.image} alt="user's image" style={{width:'50%',height:"22vh", borderRadius:'70%'}} />
                    </div>
                    <h4>
                        {data.name} {data.surName}
                    </h4>
                    <p>{data.userName}</p>
                    <div>
                        <span>{data.email}</span>
                    </div>
                    <div>
                        <span>{data.phoneNumber}</span>
                    </div>
                </div>
                
               )
            })
           }           
        </div>
    </div>
  )
}

export default Profile