import React, { useState } from 'react'
import './home.css'
import Login from './login'
import Register from './register'
const Home = (props) => {
    const [loginPage, setLoginPage] = useState(true)
    const funcSetLogin = (val) => {
        setLoginPage(val)
    }

    return (
        <div className='home'>
            {

                loginPage ? <Login setLoginFunc={props.setLoginFunc} funcSetLogin={funcSetLogin} /> : <Register funcSetLogin={funcSetLogin} />
            }
        </div>
    )
}

export default Home
