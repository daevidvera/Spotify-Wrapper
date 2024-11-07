import React from "react";
import { AppBar, Toolbar, Button, IconButton, Box, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import { ThemeProvider } from "@emotion/react";
import theme from "../Theme";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { useNavigate } from 'react-router-dom'

function Navbar({ buttons = ["Home", "Contact", "Profile", "Sign Out"] }) { // buttons prop with default value
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();

    const navigateProfile = () => {
        navigate('/profile');
    }

    const navigateHome = () => {
        navigate('/main');
    }

    const navigateSignOut = () => {
        navigate('/login');
    }

    const navigateContact = () => {
        navigate('/contact');
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" 
            sx=
            {{ 
                backgroundColor: "#FFFF", 
                color: "black", 
                padding: "8px 98px",
                boxShadow: "none",
                borderBottom: "1px solid #DEE5ED"
                

            
            }}>
                <Toolbar>
                    <Logo fontSize="30px" />

                    {isMobile ? (
                        <IconButton edge="end" color="#FFFF" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
                            {/* Render buttons conditionally based on the buttons prop */}
                            {buttons.includes("Home") && (
                                <Button onClick={navigateHome} sx={{ color: '#486284', fontWeight: 900 }}>Home</Button>
                            )}
                            {buttons.includes("Contact") && (
                                <Button onClick={navigateContact} sx={{ color: '#486284', fontWeight: 900 }}>Contact</Button>
                            )}
                            {buttons.includes("Profile") && (
                                <IconButton onClick={navigateProfile} sx={{ color: "#486284" }}>
                                    <AccountCircleTwoToneIcon />
                                </IconButton>
                            )}
                            {buttons.includes("Sign Out") && (
                                <Button onClick={navigateSignOut}
                                    sx={{
                                        color: "#FFFF",
                                        backgroundColor: "#486284",
                                        borderRadius: "90px",
                                        fontWeight: 900,
                                        paddingLeft: '20px',
                                        paddingRight: '20px'
                                    }}
                                >
                                    Sign Out
                                </Button>
                            )}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default Navbar;