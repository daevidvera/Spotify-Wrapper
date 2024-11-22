import React from "react";
import { AppBar, Toolbar, Button, IconButton, Box, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import { ThemeProvider } from "@emotion/react";
import theme from "../Theme";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { getCookie } from "../csrf/csrf";
import { UserContext } from '../contexts/UserProvider'

function Navbar({ buttons = ["Home", "Contact", "Profile", "Sign Out"] }) { // buttons prop with default value
    const { user, userDataLoading } = useContext(UserContext)
    // const { user } = useContext(UserContext)
    // const userDataLoading = true
    const profileImg = user['profile_img']
    
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigateProfile = () => {
        navigate('/profile');
        setDrawerOpen(false);
    }

    const navigateHome = () => {
        navigate('/main');
        setDrawerOpen(false);
    }

    const navigateSignOut = () => {
        navigate('/login');
    }

    const navigateContact = () => {
        navigate('/contact');
        setDrawerOpen(false);
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
                        <>
                            {/* Hamburger Menu Icon */}
                            <IconButton edge="end" onClick={() => setDrawerOpen(true)} aria-label="menu">
                                <MenuIcon />
                            </IconButton>

                            {/* Drawer for Mobile Navigation */}
                            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                                <Box sx={{ width: 250 }} role="presentation">
                                    <List>
                                        {buttons.includes("Home") && (
                                            <ListItem button sx={{ color: '#486284', fontWeight: 900 }} onClick={navigateHome}>
                                                <ListItemText primary="Home" />
                                            </ListItem>
                                        )}
                                        {buttons.includes("Contact") && (
                                            <ListItem button  sx={{ color: '#486284', fontWeight: 900 }} onClick={navigateContact}>
                                                <ListItemText primary="Contact" />
                                            </ListItem>
                                        )}
                                        {buttons.includes("Profile") && (
                                            <ListItem button sx={{ color: '#486284', fontWeight: 900 }} onClick={navigateProfile}>
                                                <ListItemText primary="Profile" />
                                            </ListItem>
                                        )}
                                        {buttons.includes("Sign Out") && (
                                            <ListItem button 
                                            sx={{
                                                    color: "#FFFF",
                                                    backgroundColor: "#486284",
                                                  
                                                }}
                                            
                                            
                                            onClick={navigateSignOut}>
                                                <ListItemText primary="Sign Out" />
                                            </ListItem>
                                        )}
                                    </List>
                                </Box>
                            </Drawer>
                        </>
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
                                userDataLoading ? (
                                    <CircularProgress />
                                ) : (
                                    <Button onClick={navigateProfile} sx={{ color: "#486284", width: '10px', borderRadius: '50%' }}>
                                        <img src={profileImg} style={{height: 'auto', maxWidth: '100%', borderRadius: '50%' }}/>
                                    </Button>
                                )
                            )}
                            {buttons.includes("Sign Out") && !userDataLoading && (
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