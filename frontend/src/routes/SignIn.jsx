import Logo from "../components/Logo";
import { AppBar, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import axios from 'axios'
import theme from "../Theme";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function handleAccountAuth() {
    
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


const handleSignIn = () => {
    if (validateCredentials()) {
        navigate('/main'); // Replace '/main' with the route of your main page
    } else {
        // Optionally display an error message for invalid credentials
        console.log('Invalid credentials');
    }
};

function SignIn() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/login")
    }
    return (
        <ThemeProvider theme = {theme}>

        <Button 
        startIcon = {<ArrowBackIcon />} 
        onClick={handleGoBack}
        sx = {{
            position: "absolute",
            top: 16,
            left: 16,
            color: "#486284",
            fontWeight: 900
        }}
        
    
        >
        Back
        </Button>
        
    
        <Stack 
        direction= 'column'
        
        sx = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                height: '100vh',
                gap: 3,
                mx: 'auto',
               
                
        }}
        >
        <Logo fontSize="100px"  />
        {/* Username Field */}
        <TextField id="username" label="Username" variant="outlined" autoComplete="username" sx ={{
            width: '500px',
        }} />
        {/* Password field  :D*/}
        <TextField id = 'password' label= "Password"  variant="outlined" autoComplete="password" sx={{
            width: '500px',
        }} />

        {/* Spotify Auth  */}
        <Button  sx =
         {{ color: "#FFFF",
            backgroundColor: "#486284",
            width: '500px',
            fontFamily: '"League Spartan", sans-serif',
            fontWeight: 900
          }}
         variant='text' onClick={handleSignIn}> Sign In </Button>
        </Stack>


        </ThemeProvider>

    )
    
}

export default SignIn;