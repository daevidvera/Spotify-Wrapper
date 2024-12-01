import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, IconButton, Box, Menu, MenuItem, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React, { useState } from 'react';
import getTheme from './Theme';
import Login from './routes/Login';
import MainPage from './routes/MainPage';
import CreateAccount from './routes/CreateAccount';
import ProfilePage from './routes/ProfilePage';
import SignIn from './routes/SignIn';
import ContactPage from './routes/ContactPage';
import { AuthProvider, RequireAuth, RequireNoAuth } from './contexts/AuthProvider';
import { UserProvider } from './contexts/UserProvider';
import Wrapper from './routes/Wrapper';

// Import i18n setup
import './i18n';
import { useTranslation } from 'react-i18next';

function App() {
  // State for theme mode
  const [mode, setMode] = useState('light');
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null); // State for language menu
  const { i18n } = useTranslation(); // Translation hook

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = getTheme(mode);

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleLanguageMenuClose();
  };

  const noAuthRoutes = [
    { path: '/login', Element: Login },
    { path: '/signin', Element: SignIn },
    { path: '/account', Element: CreateAccount },
  ];

  const authRoutes = [
    { path: '/contact', Element: ContactPage },
    { path: '/profile', Element: ProfilePage },
    { path: '/main', Element: MainPage },
    { path: '/wrapper', Element: Wrapper },
    
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        {/* Top-right corner buttons */}
        <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 9999, display: 'flex', gap: 1 }}>
          {/* Dark Mode Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.action.hover,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: theme.palette.action.selected,
              },
            }}
          >
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>

          {/* Language Dropdown Button */}
          <Button
            variant="outlined"
            sx={{
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              textTransform: 'none',
              fontSize: '0.875rem',
              padding: '6px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                borderColor: theme.palette.text.primary,
                backgroundColor: theme.palette.action.hover,
              },
            }}
            onClick={handleLanguageMenuOpen}
          >
            {i18n.language.toUpperCase()}
          </Button>
          <Menu
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={handleLanguageMenuClose}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: '8px',
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
            <MenuItem onClick={() => changeLanguage('es')}>Español</MenuItem>
            <MenuItem onClick={() => changeLanguage('fr')}>Français</MenuItem>
          </Menu>
        </Box>

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {noAuthRoutes.map(({ path, Element }) => (
            <Route
              path={path}
              key={path}
              element={
                <RequireNoAuth>
                  <Element />
                </RequireNoAuth>
              }
            />
          ))}

          {authRoutes.map(({ path, Element }) => (
            <Route
              path={path}
              key={path}
              element={
                <RequireAuth>
                  <UserProvider>
                    <Element />
                  </UserProvider>
                </RequireAuth>
              }
            />
          ))}
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;