import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate for redirection
import { CssBaseline, ThemeProvider, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React, { useState } from 'react';
import getTheme from './Theme'; // Updated Theme file for light/dark mode
import Login from './routes/Login';
import MainPage from './routes/MainPage';
import CreateAccount from './routes/CreateAccount';
import ProfilePage from './routes/ProfilePage';
import SignIn from './routes/SignIn';
import ContactPage from './routes/ContactPage';
import DuoWrapped from './routes/duoWrapped';
import DuoWrappedMainPage from './routes/DuoWrappedMainPage';
import { AuthProvider, RequireAuth, RequireNoAuth } from './contexts/AuthProvider';
import { UserProvider } from './contexts/UserProvider';
import TopArtists from './routes/TopArtists';
import TopGenres from './routes/TopGenres';
import TopSongs from './routes/TopSongs';
import Wrapper from './routes/Wrapper';

function App() {
  // State for theme mode
  const [mode, setMode] = useState('light'); // Default to light mode

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = getTheme(mode); // Dynamically get theme based on mode

  // These routes require the user to not be logged in (redirects to their profile if logged in)
  const noAuthRoutes = [
    { path: '/login', Element: Login },
    { path: '/signin', Element: SignIn },
    { path: '/account', Element: CreateAccount },
  ];

  // These routes require user login (redirects to login page if not logged in)
  const authRoutes = [
    { path: '/contact', Element: ContactPage },
    { path: '/profile', Element: ProfilePage },
    { path: '/duo', Element: DuoWrapped },
    { path: '/duofriend', Element: DuoWrappedMainPage },
    { path: '/main', Element: MainPage },
    { path: '/topartists', Element: TopArtists },
    { path: '/topgenres', Element: TopGenres },
    { path: '/topsongs', Element: TopSongs },
    { path: '/wrapper', Element: Wrapper },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        {/* Light/Dark Mode Toggle Button */}
        <IconButton
          sx={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}
          onClick={toggleTheme}
          color="inherit"
        >
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>

        <Routes>
          {/* Default route to redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* No Auth Routes */}
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

          {/* Auth Routes */}
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