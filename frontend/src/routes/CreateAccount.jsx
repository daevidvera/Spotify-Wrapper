import React, { useContext, useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton, Button, Stack, Snackbar } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider';
import Logo from "../components/Logo";
import SpotifyPreview from "../components/SpotifyPreview";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";

function CreateAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const { checkUserAuth } = useContext(AuthContext);

    const searchParams = Object.fromEntries(new URLSearchParams(location.search));
    const [formData, setFormData] = useState({
        username: searchParams['display_name'],
        email: searchParams['email'],
        password: "",
        password2: ""
    });

    const [serverError, setServerError] = useState('');
    const dismissServerErrors = () => setServerError('');
    const [formErrors, setFormErrors] = useState({});

    const handleFormChange = (field, value) => {
        setFormData(fs => ({ ...fs, [field]: value }));
        if (field in formErrors)
            setFormErrors(fe => {
                const newfe = { ...fe };
                delete newfe[field];
                return newfe;
            });
    };

    const handleFormSubmit = () => {
        setFormErrors({});
        axios.post('api/user/register/', formData)
            .then(res => {
                console.log(res);
                navigate('/profile');
            })
            .catch(ex => {
                const res = ex.response;
                if (res && res.status === 400) {
                    console.log("ERROR TRIGGERED HERE");
                    setFormErrors(res.data);
                } else {
                    setServerError(`An error has occurred in the server (error code ${res.status})`);
                    console.error(res);
                }
            });
    };

    const [showPassword, setShowPassword] = useState(false); // Password visibility state
    const handleTogglePasswordVisibility = () => {setShowPassword(!showPassword)};

    const handleGoBack = () => {
        navigate("/login");
    };

    return (
        <ThemeProvider theme={theme}>
            <>
                <Snackbar
                    open={serverError.length !== 0}
                    autoHideDuration={5000}
                    onClose={dismissServerErrors}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    message={serverError}
                />

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
                    <SpotifyPreview {...searchParams} />

                    {/* Username Field */}
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        autoComplete="username"
                        sx={{
                            width: '500px',
                        }}
                        value={formData.username}
                        onChange={e => handleFormChange('username', e.target.value)}
                        error={'username' in formErrors}
                        helperText={'username' in formErrors ? formErrors.username : null}
                    />

                    {/* Email Field */}
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        autoComplete="email"
                        sx={{
                            width: '500px',
                        }}
                        value={formData.email}
                        onChange={e => handleFormChange('email', e.target.value)}
                        error={'email' in formErrors}
                        helperText={'email' in formErrors ? formErrors.email : null}
                    />

                    {/* Password Field */}
                    <TextField
                        id='password'
                        label="Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"} // Toggles visibility
                        autoComplete="password"
                        sx={{
                            width: '500px',
                        }}
                        value={formData.password}
                        onChange={e => handleFormChange('password', e.target.value)}
                        error={'password' in formErrors}
                        helperText={'password' in formErrors ? formErrors.password : null}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Confirm Password Field */}
                    <TextField
                        id='confirm-password'
                        label="Confirm Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"} // Toggles visibility
                        autoComplete="confirmed-password"
                        sx={{
                            color: "#65558F",
                            width: '500px',
                        }}
                        value={formData.password2}
                        onChange={e => handleFormChange('password2', e.target.value)}
                        error={'password2' in formErrors}
                        helperText={'password2' in formErrors ? formErrors.password2 : null}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Register Button */}
                    <Button
                        sx={{
                            color: "#FFFF",
                            backgroundColor: "#486284",
                            width: '500px',
                            fontFamily: '"League Spartan", sans-serif',
                            fontWeight: 900
                        }}
                        variant='text'
                        onClick={handleFormSubmit}
                    >
                        Register
                    </Button>
                </Stack>
            </>
        </ThemeProvider>
    );
}

export default CreateAccount;
