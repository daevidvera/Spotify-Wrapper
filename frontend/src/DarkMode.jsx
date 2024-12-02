import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

const DarkMode = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ff5252',

      },
    },
  });

  useEffect(() => {
    const initialMode = darkMode ? 'var(--dark-gradient)' : 'var(--light-gradient)';
    document.documentElement.style.setProperty('--background', initialMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode'); // Ensure light-mode class is removed
    } else {
      document.body.classList.add('light-mode'); // Add light-mode class for light theme
      document.body.classList.remove('dark-mode'); // Ensure dark-mode class is removed
    }
  
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      document.documentElement.style.setProperty('--background', newMode ? 'var(--dark-gradient)' : 'var(--light-gradient)');
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div style={{ padding: '20px' }}>
        <Button variant="contained" onClick={toggleTheme} aria-pressed={darkMode}>
          Toggle Dark Mode
        </Button>
        {children}
      </div>
    </ThemeProvider>
  );
};

export default DarkMode;
