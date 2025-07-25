import React, { useEffect, useRef, useState } from 'react'
import './chats.css'
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import axios from 'axios';
import socket from '../../socket'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EmojiPicker from 'emoji-picker-react';

const Chats = (props) => {
    const [content,setContent] = useState('');
    const [chats,setChats] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const ownId = JSON.parse(localStorage.getItem("userInfo"))._id;
    const ref = useRef();
    const emojiPickerRef = useRef();
    

    const  fetchMessages = async ()=>{
        await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/chat/get-message-chat/${props.selectedId}`,{withCredentials:true}).then((response)=>{
            setChats(response.data.message)
        }).catch(err=>{
            console.log(err);
        })
    }
    const handleSendMessage = async()=>{
        if(content.trim().length===0)return alert("Please Enter message")
        await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/chat/post-message-chat`,{
            conversation:props.selectedId,
            content:content
        },{withCredentials:true}).then(response=>{
            socket.emit("sendMessage",props.selectedId,response.data);
            setContent("");
            setShowEmojiPicker(false);
          console.log(response)
        }).catch(err=>{
            console.log(err);
        })
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(()=>{
        socket.on("recieveMessage",(response)=>{
            setChats([...chats,response])
        })
    },[chats])
    useEffect(()=>{
       fetchMessages();
       setContent('');
    },[props.selectedId])

    useEffect(()=>{
        ref?.current?.scrollIntoView({behavior:"smooth"});
    },[chats])
    console.log(props.selectedUser)
    
    const handleClose = () =>{
        props.handleCloseChat(false);
        const chat= document.getElementById('chat');
        chat.classList.remove('responsive-chat')
    }

    const handleEmojiClick = (emojiObject) => {
        setContent(prevContent => prevContent + emojiObject.emoji);
        // Keep emoji picker open for multiple emoji selection
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    // Close emoji picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div id='chat' className={`dashboard-chats ${props.selectedUser?`responsive-chat`:''}${props.selectedUser!==true?`remove-responsive-chat`:''}`}>
         
            <div className={`chatNameBlock ${props.selectedUser?`responsive-chatName`:''}`} >
                <div className='back-btn' onClick={handleClose}>
                    <ArrowBackRoundedIcon sx={{fontSize:'24px', cursor:'pointer'}}/>
                </div>
                <div className='chat-profile-img'>
                    <img className='profile-img-conv' src={props?.selectedUserDetails[0]?.profilePic} alt='' />
                </div>
                <div className='chat-name'>
                    {props?.selectedUserDetails[0]?.name}
                </div>
            </div>
            <div className='chats-block'>
                   {
                    chats.map((item,index)=>{
                        return(
                            <div ref={ref}className={`chat ${ownId===item?.sender?._id ? 'message-me':null}`}>
                            <div className='chat-send-rev_image'>
                                <img className='profile-img-conv' src={item?.sender?.profilePic} alt='' />
                            </div>
                            <div className={`message ${ownId===item?.sender?._id ? 'my-message':null}`}>
                                {item?.message}
                            </div>
                        </div>
                        )
                    })
                   }
               </div>
            <div className='message-box'>
               <div className='message-input-box'>
                <input 
                    value={content} 
                    onChange={(event)=>{setContent(event.target.value)}} 
                    onKeyPress={handleKeyPress}
                    type='text' 
                    placeholder='Type Your Message' 
                    className='searchBox messageBox'
                />
                <div className='emoji-button' onClick={toggleEmojiPicker}>
                    <EmojiEmotionsIcon sx={{fontSize:"24px", cursor:"pointer", color: "#54656f"}}/>
                </div>
                {showEmojiPicker && (
                    <div className='emoji-picker-container' ref={emojiPickerRef}>
                        <EmojiPicker 
                            onEmojiClick={handleEmojiClick}
                            searchPlaceholder="Search emoji..."
                            width={350}
                            height={400}
                            previewConfig={{
                                showPreview: false
                            }}
                        />
                    </div>
                )}
               </div>
               <div onClick={handleSendMessage}><SendIcon sx={{fontSize:"32px", margin:"10px", cursor:"pointer"}}/></div>
            </div>
             
        </div>
    )
}
export default Chats
