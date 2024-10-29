import '../styles/Login.css'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom'
import Fade from '@mui/material/Fade';
import React, { useEffect, useState } from "react";

// Login page

// Computer compatible: ✅
// Mobile compatible: ✅



function Login() {

    // Transition Part 
    const [showLogo, setShowLogo] = useState(false); // State to control fade
    useEffect(() => {
        setShowLogo(true);
    }, []); 

    // On click Part
    const navigate = useNavigate();

    const navigateAccount = () => {
        navigate('/account');
    }

    // We use Stack to center our login components

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
            <Logo fontSize='100px' />
            </div>  
            </Fade>

            <Fade in={showLogo} timeout={3000}>
            <Button  sx = {{ 
                borderColor: '#65558F',
                color: "#65558F", 
                width: '500px',
                borderRadius: "90px"


             }}
             variant='outlined'> Log in </Button>
             </Fade>


            <Fade in={showLogo} timeout={3000}>
            <Button  sx = 
            {{ 
                borderColor: '#65558F',
                color: "#65558F", 
                width: '500px',
                borderRadius: "90px"
        
            }}
            variant='outlined' onClick={navigateAccount}> Create Account </Button>
            </Fade>
        </Stack>
    )
}

export default Login;