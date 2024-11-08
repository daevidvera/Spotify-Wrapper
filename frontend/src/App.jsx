import './App.css'
import { Routes, Route } from 'react-router-dom'
import theme from './Theme'
import Login from './routes/Login'
import { CssBaseline, ThemeProvider } from '@mui/material'
import MainPage from './routes/MainPage'
import CreateAccount from './routes/CreateAccount'
import ProfilePage from './routes/ProfilePage'
import ContactPage from './routes/ContactPage';
import TopSongs from './routes/TopSongs';
import TopArtists from './routes/TopArtists'
import TopGenres from './routes/TopGenres'


// Initializes core app wrappers
// ThemeProvider: enables custom theme defined in ./Theme.jsx
// Routes: defines the website's paths & page renders

function App() {

  return (
    <ThemeProvider theme={theme}>
      {/* Use Css Baseline for importing your global variables styling themes into the app */}
      <CssBaseline />        
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/main' element={<MainPage/>}/>
        <Route path='/account' element = {<CreateAccount/>}/>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path='/topSongs' element={<TopSongs />} />
        <Route path='/topArtists' element={<TopArtists />} />
        <Route path='/topGenres' element={<TopGenres />} />


        
      </Routes>
    </ThemeProvider>
  )

}

export default App
