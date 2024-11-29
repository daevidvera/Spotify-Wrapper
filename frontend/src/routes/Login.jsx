import '../styles/Login.css';
import { Stack, Button, Fade } from '@mui/material';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

function Login() {
    const [showLogo, setShowLogo] = useState(false);
    const theme = useTheme(); // Access the current theme

    useEffect(() => {
        setShowLogo(true);
    }, []);

    const navigate = useNavigate();

    const handleSignIn = () => navigate('/signin');

    const handleCreateAccount = async () => {
        try {
            const res = await axios.get('/api/auth/url', { withCredentials: true });
            if (res.data && res.data.auth_url) {
                window.location = res.data.auth_url;
            } else {
                throw new Error('No auth URL returned');
            }
        } catch (ex) {
            console.error(ex);
            window.alert('An error has occurred when reaching Spotify. See console for more details');
        }
    };

    return (
        <Stack
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                gap: { xs: 2, sm: 3 }, // Adjust gap for different screen sizes
                bgcolor: theme.palette.background.default, // Dynamic background
                color: theme.palette.text.primary, // Dynamic text color
                padding: { xs: 2, sm: 4 }, // Add padding for small screens
            }}
        >
            {/* Logo with responsive size */}
            <Fade in={showLogo} timeout={4400}>
                <div>
                    <Logo fontSize={{ xs: '70px', sm: '90px', md: '100px' }} />
                </div>
            </Fade>

            {/* Sign In Button */}
            <Fade in={showLogo} timeout={3000}>
                <Button
                    sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        width: { xs: '250px', sm: '350px', md: '450px' }, // Responsive width
                        borderRadius: '90px',
                        fontWeight: 900,
                        textTransform: 'none',
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' }, // Responsive font size
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            backgroundColor: theme.palette.action.hover,
                        },
                        padding: { xs: '8px 16px', sm: '10px 20px' }, // Responsive padding
                    }}
                    variant="outlined"
                    onClick={handleSignIn}
                >
                    Sign In
                </Button>
            </Fade>

            {/* Create Account Button */}
            <Fade in={showLogo} timeout={3000}>
                <Button
                    sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        width: { xs: '250px', sm: '350px', md: '450px' }, // Responsive width
                        borderRadius: '90px',
                        fontWeight: 900,
                        textTransform: 'none',
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' }, // Responsive font size
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            backgroundColor: theme.palette.action.hover,
                        },
                        padding: { xs: '8px 16px', sm: '10px 20px' }, // Responsive padding
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