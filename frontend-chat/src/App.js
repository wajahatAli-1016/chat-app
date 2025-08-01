import './App.css';
import Home from './components/home';
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard/dashboard'
import { useState } from 'react';
import socket from'./socket'
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

  const setLoginFunc = (value) => {
    setIsLogin(value)
  }
  return (
    <ThemeProvider>
      <div className="App">
        <Routes>
          <Route path='/' element={isLogin ? <Navigate to={"/dashboard"} /> : <Home setLoginFunc={setLoginFunc} />} />
          <Route path='/dashboard' element={isLogin ? <Dashboard setLoginFunc={setLoginFunc}/> : <Navigate to={'/'} />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
