import React, { useEffect, useRef, useState } from 'react'
import './dashboard.css'
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Conversation from '../Conversation/conversation';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import Chats from '../Chats/chats';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import socket from '../../socket';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = ({setLoginFunc}) => {


  const[selectedUser,setSelectedUser] = useState(false);
  const [selectedUserDetails, setselectedUserDetails] = useState(false);
  const [selectedId,setSelectedId] = useState(null);
  const [queryParam, setQueryParam] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [conversation,setConversation] = useState([]);
  const ref = useRef();

  const navigate = useNavigate();

  const handleSelectedUser = (id,userDetails)=>{
    setselectedUserDetails(userDetails);
    setSelectedId(id);
    setSelectedUser(true)
    socket.emit('joinConversation',id)
  }
  const handleCloseChat=(value)=>{
    setSelectedUser(value);
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSearchData([]);
      setQueryParam('')

    }
  };


  let fetchConversation = async () =>{
            await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/conversation/get-conversation`,{withCredentials:true}).then((response)=>{
      console.log(response)
      setConversation(response.data.conversations);
    }).catch(err=>{
      console.log(err);
    })
  }


  useEffect(()=>{
    if(queryParam.length!==0){
      fetchUserBySearch()
    }
  },[queryParam])

const  fetchUserBySearch = async ()=>{
          await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/auth/searchedMember?queryParam=${queryParam}`, {withCredentials:true}).then((response)=>{
    console.log(response)
    setSearchData(response.data);
  }).catch(err=>{
    console.log(err)
  })
}
  useEffect(()=>{
    fetchConversation();
  },[]);

  useEffect(() => {
    if (searchData.length) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  },[searchData])


  const handleLogout = async () => {
    // Add confirmation dialog
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) return;
    
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/auth/logout`, {}, {withCredentials:true});
        console.log('Logout response:', response);
        
        // Clear local storage
        localStorage.clear();
        
        // Disconnect socket
        socket.disconnect();
        
        // Update login state
        setLoginFunc(false);
        
        // Show success message
        toast.success('Logged out successfully!');
        
        // Navigate to home
        navigate('/');
    } catch (err) {
        console.log('Logout error:', err);
        
        // Even if backend logout fails, clear local data
        localStorage.clear();
        socket.disconnect();
        setLoginFunc(false);
        navigate('/');
        
        toast.error('Logout failed, but you have been logged out locally.');
    }
}
const handleCreateConv = async(id)=>{
          await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/conversation/add-conversation`,{recieverId:id},{withCredentials:true}).then((response)=>{
    fetchConversation();
    setSearchData([]);
  }).catch(err=>{
    console.log(err);
  })
}




  return (
    <div className='dashboard'>
      <ToastContainer />
      <div className='dashboard-card'>
       
        <div className={`dashboard-conversation ${selectedUser?`responsive-dashboard-conversation`:''}`} >
          <div className='dashboard-conv-block'>
            <div className={`dashboard-title-block ${selectedUser?`responsive-dashboard-title-block`:''}`}>
              <div className="whatsapp-title">
                <div className="whatsapp-logo">💬</div>
                <span>NexTalk</span>
              </div>
              <div className="header-actions">
                <div className="header-icon">
                  <MoreVertIcon sx={{ fontSize: "20px", cursor: "pointer", color: "#54656f" }} />
                </div>
                <div className="header-icon" onClick={() => {
                  console.log('Logout button clicked');
                  handleLogout();
                }}>
                  <LogoutIcon sx={{ fontSize: "20px", cursor: "pointer", color: "#54656f" }} />
                </div>
              </div>


            </div>
            <div className={`searchaBoxDiv ${selectedUser?`responsive-searchaBoxDiv`:''}`}>
              <div className="search-container">
                <SearchIcon className="search-icon" />
                <input value={queryParam} onChange={(event) => { setQueryParam(event.target.value) }} type='text' placeholder='Search or start new chat' className='searchBox' />
              </div>
              {
                searchData.length ? <div ref={ref} className='searched-box'>
                  {
                    searchData.map((item, index) => {
                      return (
                        <div className='search-item' key={index} onClick={()=>handleCreateConv(item._id)}>
                          <img className='search-item-profile' alt='' src={item.profilePic} />
                          <div>{item.name}</div>
                          <div className='search-item-mobile'>{item.mobileNumber}</div>
                        </div>
                      )
                    })
                  }
                </div> :
                  queryParam.length !== 0 && searchData.length === 0 ?
                    <div ref={ref} className='searched-box'>
                      <div className='search-item'>
                        <img className='search-item-profile' alt='' src='https://img.freepik.com/free-vector/happy-cartoon-character-smiling_1308-171029.jpg?ga=GA1.1.1408379961.1714224392&semt=ais_hybrid' />
                        <div>No Data Found</div>
                      </div>
                    </div> : null
              }

            </div>
            <div className='conv-block'>
              {
            conversation.map((item,index)=>{
              return(
                <Conversation selectedUser={selectedUser}  selectedUserDetails={selectedUserDetails} active={item._id===selectedId} handleSelectedUser={handleSelectedUser} item={item} id={item._id} members={item.members}/>
              )
            })
          }
             
            </div>
          </div>
        </div>
        {
          
        selectedUserDetails ? <Chats handleCloseChat={handleCloseChat} selectedUser={selectedUser} selectedId={selectedId} selectedUserDetails={selectedUserDetails} /> : <div className='noChatSelected'>
          <div className="no-chat-icon">
            <ForumRoundedIcon sx={{ fontSize: "120px", color: "#54656f" }} />
          </div>
          <div className="no-chat-title">Your WhatsApp</div>
          <div className="no-chat-subtitle">Send and receive messages without keeping your phone online.</div>
          <div className="no-chat-subtitle">Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</div>
        </div>}
      </div>
    </div>
  )
}

export default Dashboard
