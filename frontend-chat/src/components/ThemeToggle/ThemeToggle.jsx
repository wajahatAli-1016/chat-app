import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <button 
        className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        <div className="toggle-slider">
          {isDarkMode ? (
            <DarkModeIcon className="theme-icon" />
          ) : (
            <LightModeIcon className="theme-icon" />
          )}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle; 