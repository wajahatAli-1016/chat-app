import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import Loader from './Loader/loader'
import {useNavigate} from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify'
const Login = ({funcSetLogin,setLoginFunc}) => {
  const [inputField,setInputField] = useState({mobileNumber:"", password:""})
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate()
    const handleClickNotRegistered = () =>{
        funcSetLogin(false)
    }
    const handleOnChange = (event,key) =>{
      setInputField({
        ...inputField,[key]:event.target.value
      })
    }
    const handleLogin = async () =>{
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/auth/login`, inputField, { withCredentials: true }).then(response => {
       console.log(response)
       let userInfo = response.data.user;
       localStorage.setItem("userInfo",JSON.stringify(userInfo));
       localStorage.setItem("isLogin",true);
       setLoginFunc(true)
       navigate('/dashboard')
      }).catch(err=>{
        let errorMsg= err.response.data.error;
        toast.error(errorMsg);
       console.log(err)
      }).finally(()=>{
       setLoading(false);
      })
    }
  return (
   
      <div className='login'>
        {loading && <Loader/>}
        <ToastContainer/>
          <div className='login-card'>
             <div className='card-name'>
               Login
             </div>
             <div className='login-form'>
                <input className='inputbox' value={inputField.mobileNumber} onChange={(event)=>handleOnChange(event,'mobileNumber')} type='text' placeholder='Enter mobile number'/>
                <input className='inputbox' value={inputField.password} onChange={(event)=>handleOnChange(event,'password')} type='password' placeholder='Enter Password'/>
                <div className='button' onClick={handleLogin}>Login</div>
                <div className='linkedlinks' onClick={handleClickNotRegistered}>Not Registered Yet</div>
             </div>
          </div>
        </div>
  )
}

export default Login
