import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppBar, Stack } from "@mui/material";
import TextField from '@mui/material/TextField';
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Logo from "../components/Logo";
import { ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from "../Theme";
import getCookie from "../../csrf/csrf";


function SignIn() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/login")
    }

    const [formErrors, setFormErrors] = useState('');
    const [serverError, setServerError] = useState('');
    const dismissServerErrors = () => setServerError('')

    const [username, setUsername] = useState('');
    const handleUsernameChange = e => {
        setUsername(e.target.value)
        if(formErrors.length !== 0)
            setFormErrors('')
    }
    const [password, setPassword] = useState('');
    const handlePasswordChange = e => {
        setPassword(e.target.value);
        if(formErrors.length !== 0)
            setFormErrors('')
    }

    const handleSignIn = () => {
        setFormErrors('')
        axios.post('api/user/login/', {username, password}, {
            headers: {'X-CSRFToken': getCookie('csrftoken')}
        })
        .then(res => navigate('/profile'))
        .catch(ex => {
            const res = ex.response
            if(res && res.status === 400)
                setFormErrors(res.data.error)
            else {
                setServerError(`An error has occurred in the server (error code ${res.status})`)
                console.error(res)
            }
        })
    };

    return (
        <ThemeProvider theme = {theme}>

        <Snackbar 
            open={serverError.length !== 0}
            autoHideDuration={5000}
            onClose={dismissServerErrors}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            message={serverError}
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
        {/* Username Field */}
        <TextField id="username" label="Username" variant="outlined" autoComplete="username" sx ={{
            width: '500px',
        }}
        value={username}
        onChange={handleUsernameChange}
        error={formErrors.length !== 0}
        />
        {/* Password field  :D*/}
        <TextField id = 'password' label= "Password"  variant="outlined" autoComplete="password" sx={{
            width: '500px',
        }}
        value={password}
        onChange={handlePasswordChange}
        error={formErrors.length !== 0}
        helperText={formErrors}
        />

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
    );
}

export default SignIn;
