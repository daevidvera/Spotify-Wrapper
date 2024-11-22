import Logo from "../components/Logo";
import { AppBar, Stack } from "@mui/material";
import React, { useContext } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import axios from 'axios';
import theme from "../Theme";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function SignIn() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/login");
    };

    const validateCredentials = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // TODO: ADD VALIDATION CHECK
        return username && password; // TEST VALIDATION CHECK
    };

    // TODO: SWAP WITH ACCOUNT AUTHENTICATION
    const handleAccountAuth = () => {
        axios.get('/api/auth/url', { withCredentials: true })
            .then(res => res.data)
            .then(data => data.auth_url)
            .then(authUrl => window.location = authUrl)
            .catch(error => {
                console.error(error);
                window.alert('An error has occurred when reaching Spotify. See console for more details');
            });
    };

    const handleSignIn = () => {
        if (validateCredentials()) {
            // Simulate fetching user data from an API or form
            const userData = {
                name: 'John Doe',
                userID: 'spotify123',
                displayname: 'JohnD',
                username: document.getElementById("username").value,
            };

            setUser(userData); // Update user data in context
            navigate('/main'); // Navigate to the main page
        } else {
            console.log('Invalid credentials');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBack}
                sx={{
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
                direction='column'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    gap: 3,
                    mx: 'auto',
                }}
            >
                <Logo fontSize="100px" />
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    autoComplete="username"
                    sx={{ width: '500px' }}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    autoComplete="password"
                    sx={{ width: '500px' }}
                />
                <Button
                    sx={{
                        color: "#FFFF",
                        backgroundColor: "#486284",
                        width: '500px',
                        fontFamily: '"League Spartan", sans-serif',
                        fontWeight: 900
                    }}
                    variant='text'
                    onClick={handleSignIn}
                >
                    Sign In
                </Button>
            </Stack>
        </ThemeProvider>
    );
}

export default SignIn;
