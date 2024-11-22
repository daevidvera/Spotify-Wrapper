import '../styles/Login.css';
import { LinearProgress, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';

// Login page

// Computer compatible: ✅
// Mobile compatible: ✅


function Login() {
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {setShowLogo(true)}, [])

    const navigate = useNavigate();

    const handleSignIn = () => navigate('/signin')

    const handleCreateAccount = () => axios.get('/api/auth/url', {withCredentials: true})
    .then(res => res.data)
    .then(data => data.auth_url)
    .then(authUrl => { window.location = authUrl })
    .catch(ex => {
        console.error(ex)
        window.alert('An error has occurred when reaching Spotify. See console for more details')
    })

    return (
        <Stack
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                gap: 3,
            }}
        >
            <Fade in={showLogo} timeout={4400}>
                <div>
                    <Logo fontSize="100px" />
                </div>
            </Fade>

            <Fade in={showLogo} timeout={3000}>
                <Button
                    sx={{
                        borderColor: '#65558F',
                        color: '#65558F',
                        width: '500px',
                        borderRadius: '90px',
                    }}
                    variant="outlined"
                    onClick={handleSignIn}
                >
                    Sign In
                </Button>
            </Fade>

            <Fade in={showLogo} timeout={3000}>
                <Button
                    sx={{
                        borderColor: '#65558F',
                        color: '#65558F',
                        width: '500px',
                        borderRadius: '90px',
                    }}
                    variant="outlined"
                    onClick={handleCreateAccount}
                >
                    Create Account
                </Button>
            </Fade>
        </Stack>
    );
}

export default Login;
