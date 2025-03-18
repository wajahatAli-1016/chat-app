import React, { useState } from 'react'
import './register.css'
import ProfileSelector from './ProfileSelector/profileSelector'
import axios from 'axios'
import Loader from './Loader/loader'
// import { response } from 'express'
const Register = ({ funcSetLogin }) => {
    const [profileModal, setProfileModal] = useState(false)
    const [inputField,setInputField] = useState({"mobileNumber":"","password":"","name":"",profilePic:"https://img.freepik.com/premium-vector/young-man-face-avater-vector-illustration-design_968209-13.jpg?ga=GA1.1.1408379961.1714224392&semt=ais_hybrid"})
    const [loading,setLoading] = useState(false);
    const gotoLogin = () => {
        funcSetLogin(true)
    }
    const handleProfileModalClose = () =>{
        setProfileModal(prev=>!prev)
    }
    const handleSetImage = (link)=>{
        setInputField({
            ...inputField,["profilePic"]:link
        })
    }
    const handleRegister = async ()=>{
        setLoading(true);
       await axios.post("http://localhost:8000/api/auth/register",inputField).then(response=>{
        funcSetLogin(true)
       }).catch(err=>{
        console.log(err)
       }).finally(()=>{
        setLoading(false);
       })
    }
    const handleOnChange = (event,key) =>{
        setInputField({
            ...inputField,[key]:event.target.value
          })
    }
    return (
        <div className='login'>
            
            {loading && <Loader/>}
                <div className='register-card'>
                    <div className='card-name'>
                        Register
                    </div>
                    <div className='login-form'>
                        <input className='inputbox' value={inputField.mobileNumber} onChange={(event)=>handleOnChange(event,'mobileNumber')}  type='text' placeholder='Enter 10 digit Mobile No' />
                        <input className='inputbox' value={inputField.password} onChange={(event)=>handleOnChange(event,'password')}  type='password' placeholder='Enter Password' />
                        <input className='inputbox'value={inputField.name} onChange={(event)=>handleOnChange(event,'name')}  type='text' placeholder='Enter Username' />
                        <div className='imageFile'>
                             <div className='select-profile-btn' onClick={handleProfileModalClose}>Select Profile Image</div>
                             <img className='avatar' src={inputField.profilePic} alt='profileimage'/>
                        </div>
                        <div className='button' onClick={handleRegister}>Register</div>
                        <div className='linkedlinks' onClick={gotoLogin}>Already have an account? Login</div>
                    </div>
                </div>
                {profileModal &&  <ProfileSelector handleSetImage={handleSetImage} handleProfileModalClose = {handleProfileModalClose}/>}
        </div>

    )
}

export default Register
