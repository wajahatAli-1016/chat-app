import React, { useEffect, useState } from 'react'
import './conversation.css'
import { formatConversationTime } from '../../utils/timeUtils';
import CloseIcon from '@mui/icons-material/Close';

const Conversation = (props) => {
  const [friendItem,setFriendItem] = useState([])
  const [lastMessage, setLastMessage] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  
   useEffect(()=>{
    let ownId = JSON.parse(localStorage.getItem("userInfo"))._id;
    let friendItem = props.members.filter((item)=>item._id!==ownId);
    setFriendItem(friendItem);
    
    // Get the last message time if available
    if (props.item.lastMessage) {
      setLastMessage(props.item.lastMessage);
    }
    
   },[props.item])
   
   const handleOnclick=()=>{
    props.handleSelectedUser(props.id,friendItem)
   }
   
   const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering the conversation selection
    props.handleDeleteConversation(props.id);
   }
   
   const handleMouseEnter = () => {
    setShowDelete(true);
   }
   
   const handleMouseLeave = () => {
    setShowDelete(false);
   }
   
  return (
    <div 
      className={`conv ${props.active?`active-class `:''} ${props.selectedUser?`responsive-conv`:''} `} 
      onClick={handleOnclick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='conv-profile-img'>
        <img className='profile-img-conv' src={friendItem[0]?.profilePic} alt='' />
      </div>
      <div className='conv-name'>
        <div className='conv-header'>
          <div className='conv-profile-name'>{friendItem[0]?.name}</div>
          <div className='conv-time'>{lastMessage ? formatConversationTime(lastMessage.createdAt) : '12:30 PM'}</div>
        </div>
        <div className='conv-last-message'>{lastMessage ? lastMessage.message : 'Tap to start chatting'}</div>
      </div>
      {showDelete && (
        <div className='conv-delete-btn' onClick={handleDelete}>
          <CloseIcon sx={{ fontSize: "18px", color: "var(--text-secondary)" }} />
        </div>
      )}
    </div>
  )
}

export default Conversation
