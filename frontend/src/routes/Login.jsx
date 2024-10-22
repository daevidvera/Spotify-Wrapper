import '../styles/Login.css'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button';
import axios from 'axios'

// Login page

// Computer compatible: ✅
// Mobile compatible: ✅


// On login, redirects users to Spotify's authorization page
function handleLogin() {
    
    axios.get('/api/auth/url', { withCredentials: true })
    
    // Redirect to authorization url
    .then(res => res.data)
    .then(data => data.auth_url)
    .then(authUrl => window.location = authUrl)

    // Print any errors
    .catch(error => {
        console.error(error)
        window.alert('An error has occurred when reaching Spotify. See console for more details')
    })

}


function Login() {

    // We use Stack to center our login components

    return (
        <Stack 
            sx={{
                justifyContent: 'center', 
                alignItems: 'center',
                height: '100%'
            }}
        >
            <h1> @wrapper.</h1>
            <Button variant='text' onClick={handleLogin}> Sign in with Spotify </Button>
        </Stack>
    )
}

export default Login;