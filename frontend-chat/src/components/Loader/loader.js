import React from 'react'
import './loader.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const loader = () => {
  return (
    <div className='loader'>
    <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
  </div>
  )
}

export default loader
