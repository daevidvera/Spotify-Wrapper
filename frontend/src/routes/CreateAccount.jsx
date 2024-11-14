
import Logo from "../components/Logo";
import { AppBar, Stack } from "@mui/material";
import Fade from '@mui/material/Fade';
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import axios from 'axios'
import theme from "../Theme";
import { ThemeProvider } from "@mui/material/styles";
import Snackbar from '@mui/material/Snackbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom'
import SpotifyPreview from "../components/SpotifyProfile";


function CreateAccount() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/login")
    }
    const location = useLocation();
    
    // ONCE Davi gives me access to API so I can add myself, uncomment this!!!
    const searchParams = Object.fromEntries(new URLSearchParams(location.search));
    // const searchParams = {
    //     display_name: 'Ato',
    //     spotify_profile_url: 'https://open.spotify.com/user/epicguys2627',
    //     email: 'alberticoalvarez123@gmail.com',
    //     profile_img: 'https://i.scdn.co/image/ab6775700000ee859778ae6e04a23fcc5b7cbda1'
    // }

    const [formData, setFormData] = useState({
        username: searchParams['display_name'] || "",
        email: searchParams['email'] || "",
        password: "",
        password2: ""
    })

    const [serverError, setServerError] = useState(false)
    const dismissServerError = () => setServerError(false)

    const [formErrors, setFormErrors] = useState({})

    // Unmarks form errors for specified field
    const handleFormChange = (field, value) => {
        setFormData(fs => ({...fs, [field]: value}))
        if (field in formErrors)
            setFormErrors(fe => {
                const newfe = {...fe} 
                delete newfe[field]
                return newfe
            })
    }

    const handleFormSubmit = () => {
        setFormErrors({})
        axios.post('api/user/register/', formData)
        .then(res => {navigate('/profile')})
        .catch(ex => {
            const res = ex.response
            console.log(res)
            if(res && res.status === 400)
                setFormErrors(res.data)
            else {
                setServerError(`An error has occurred in the server (error code ${res.status})`)
                console.error(res)
            }
        })
    }
    return (
        <ThemeProvider theme = {theme}>

        <Snackbar 
            open={typeof serverError === 'string'}
            autoHideDuration={5000}
            onClose={dismissServerError}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            message={serverError || ""}
        />

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
        <SpotifyPreview {...searchParams} />
        {/* Username Field */}
        <TextField 
            id="username"
            label="Username" 
            variant="outlined" 
            autoComplete="username" 
            sx ={{
                width: '500px',
                }}
            value={formData.username}
            onChange={e => handleFormChange('username', e.target.value)}
            error={'username' in formErrors}
            helperText={'username' in formErrors ? formErrors.username : null}
        />

        {/* email id */}
        <TextField 
            id="email" 
            label="Email" 
            variant="outlined" 
            autoComplete="email" 
            sx ={{
                width: '500px',
            }} 
            value={formData.email}
            onChange={e => handleFormChange('email', e.target.value)}
            error={'email' in formErrors}
            helperText={'email' in formErrors ? formErrors.email : null}
        />

        {/* Password field  :D*/}
        <TextField 
            id = 'password' 
            label= "Password"  
            variant="outlined" 
            autoComplete="password" 
            sx={{
                width: '500px',
            }} 
            value={formData.password}
            onChange={e => handleFormChange('password', e.target.value)}
            error={'password' in formErrors}
            helperText={'password' in formErrors ? formErrors.password : null}
        />

        {/* Re-enter Password field */}
        <TextField 
            id = 'confirm-password' 
            label= "Confirm Password"  
            variant="outlined" 
            autoComplete="confirmed-password" 
            sx={{
                color: "#65558F",
                width: '500px', 
            }} 
            value={formData.password2}
            onChange={e => handleFormChange('password2', e.target.value)}
            error={'password2' in formErrors}
            helperText={'password2' in formErrors ? formErrors.password2 : null}
        />

        {/* Register */}
        <Button  sx =
         {{ color: "#FFFF",
            backgroundColor: "#486284",
            width: '500px',
            fontFamily: '"League Spartan", sans-serif',
            fontWeight: 900
          }}
         variant='text' onClick={handleFormSubmit}> Register </Button>
        </Stack>


        </ThemeProvider>

    )
    
}

export default CreateAccount;