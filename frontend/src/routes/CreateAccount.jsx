
import Logo from "../components/Logo";
import { AppBar, Stack } from "@mui/material";
import Fade from '@mui/material/Fade';
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import axios from 'axios'
import theme from "../Theme";
import { ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'

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

function CreateAccount() {
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

        {/* email id */}
        <TextField id="email" label="Email ID" variant="outlined" autoComplete="email" sx ={{
            width: '500px',
        }} />

        {/* Password field  :D*/}
        <TextField id = 'password' label= "Password"  variant="outlined" autoComplete="password" sx={{
            width: '500px',
        }} />

        {/* Re-enter Password field */}
        <TextField id = 'confirm-password' label= "Confirm Password"  variant="outlined" autoComplete="confirmed-password" sx={{
            color: "#65558F",
            width: '500px', }} />

        {/* Spotify Auth  */}
        <Button  sx =
         {{ color: "#FFFF",
            backgroundColor: "#486284",
            width: '500px',
            fontFamily: '"League Spartan", sans-serif',
            fontWeight: 900
          }}
         variant='text' onClick={handleAccountAuth}> Spotify Account </Button>
        </Stack>


        </ThemeProvider>

    )
    
}

export default CreateAccount;