import './App.css'
import { Routes, Route } from 'react-router-dom'
import theme from './Theme'
import Login from './routes/Login'
import { ThemeProvider } from '@mui/material'
import DarkMode from './DarkMode'

// Initializes core app wrappers
// ThemeProvider: enables custom theme defined in ./Theme.jsx
// Routes: defines the website's paths & page renders

function App() {

  return (
      <DarkMode>
      <Routes>
        <Route path='/login' element={<Login />}/>
        
      </Routes>
      </DarkMode>
  )

}

export default App
