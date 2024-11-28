import './App.css'
import { Routes, Route } from 'react-router-dom'
import theme from './Theme'
import Login from './routes/Login'
import { CssBaseline, ThemeProvider } from '@mui/material'
import MainPage from './routes/MainPage'
import CreateAccount from './routes/CreateAccount'
import ProfilePage from './routes/ProfilePage'
import SignIn from './routes/SignIn'
import ContactPage from './routes/ContactPage';
import DuoWrapped from './routes/duoWrapped'
import DuoWrappedMainPage from './routes/DuoWrappedMainPage'
import { AuthProvider, RequireAuth, RequireNoAuth } from './contexts/AuthProvider'
import { UserProvider } from './contexts/UserProvider'
import TopArtists from "./routes/TopArtists";

// Initializes core app wrappers
// ThemeProvider: enables custom theme defined in ./Theme.jsx
// Routes: defines the website's paths & page renders

function App() {

  // These routes require the user to not be logged in (redirects to their profile if logged in)
  const noAuthRoutes = [
    {path: '/login', Element: Login},
    {path: '/signin', Element: SignIn},
    {path: '/account', Element: CreateAccount},
  ]

  // These routes require user login (redirects to login page if not logged in)
  const authRoutes = [
    {path: '/contact', Element: ContactPage},
    {path: '/profile', Element: ProfilePage},
    {path: '/duo', Element: DuoWrapped},
    {path: '/duofriend', Element: DuoWrappedMainPage},
    {path: '/main', Element: MainPage},
    {path: '/topartists', Element: TopArtists},
  ]

  return (
    <ThemeProvider theme={theme}>
      {/* Use Css Baseline for importing your global variables styling themes into the app */}
      <CssBaseline /> 
      <AuthProvider>
        <Routes>
          {noAuthRoutes.map(({path, Element}) => (
            <Route path={path} key={path} element={
              <RequireNoAuth>
                <Element />
              </RequireNoAuth>
            } />
          ))}
          {authRoutes.map(({path, Element}) => (
            <Route path={path} key={path} element={
              <RequireAuth>
                <UserProvider>
                  <Element />
                </UserProvider>
              </RequireAuth>
            } />
          ))}
        </Routes>
      </AuthProvider>       
      
    </ThemeProvider>
  )

}

export default App
