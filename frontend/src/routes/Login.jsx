import '../styles/Login.css';
import {Stack} from '@mui/material';
import Button from '@mui/material/Button';
import Logo from '../components/Logo';
import {useNavigate} from 'react-router-dom';
import Fade from '@mui/material/Fade';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

// Login page

// Computer compatible: ✅
// Mobile compatible: ✅

function Login() {
    const [showLogo, setShowLogo] = useState(false);
    const theme = useTheme(); // Access the current theme
    const { t } = useTranslation(); // Hook to access translations

    useEffect(() => {setShowLogo(true)}, [])

    const navigate = useNavigate();

    const handleSignIn = () => navigate('/signin')

    const handleCreateAccount = async () => {
        try {
            const res = await axios.get('/api/auth/url', {withCredentials: true});
            if (res.data && res.data.auth_url) {
                window.location = res.data.auth_url;
            } else {
                throw new Error(t('noAuthUrlError'));
            }
        } catch (ex) {
            console.error(ex);
            window.alert(t('spotifyError'));
        }
    }

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
                    {t('signIn')} {/* Translated "Sign In" */}
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
                    {t('createAccount')} {/* Translated "Create Account" */}
                </Button>
            </Fade>
        </Stack>
    );
}

export default Login;