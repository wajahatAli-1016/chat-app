import React, { useEffect, useState } from 'react'
import './conversation.css'

const Conversation = (props) => {
  const [friendItem,setFriendItem] = useState([])
   useEffect(()=>{
    let ownId = JSON.parse(localStorage.getItem("userInfo"))._id;
    let friendItem = props.members.filter((item)=>item._id!==ownId);
    setFriendItem(friendItem);
    
   },[])
   const handleOnclick=()=>{
    props.handleSelectedUser(props.id,friendItem)
   }
   
  return (
    <div className={`conv ${props.active?`active-class `:''} ${props.selectedUser?`responsive-conv`:''} `} onClick={handleOnclick}>
    <div className='conv-profile-img'>
      <img className='profile-img-conv' src={friendItem[0]?.profilePic} alt='' />
    </div>
    <div className='conv-name'>
      <div className='conv-profile-name'>{friendItem[0]?.name}</div>
      <div className='conv-last-message'>{friendItem[0]?.mobileNumber}</div>
    </div>
  </div>
  )
}

export default Conversation
