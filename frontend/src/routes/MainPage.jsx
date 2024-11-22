import React from "react";
import NavBar from '../components/NavBar'
import { Box, Stack } from "@mui/material";
import Button from '@mui/material/Button';
import { Typography }  from '@mui/material'
import { useNavigate } from 'react-router-dom'

function MainPage() {
    const navigate = useNavigate();
    const navigatemyWrap = () => {
        navigate('/topgenres');

    }
    return (
        <Box>
            {/* Navbar at the top */}
            <NavBar buttons={["Contact", "Profile", "Sign Out"]} />

            {/* Content area below Navbar */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', md: "center", lg: 'center' },
                    alignItems: 'center',
                    p: { xs: 2, md: 5 } // Responsive padding
                }}
            >

                {/* Container lol  */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column", 
                        alignItems: "center", 
                        width: "100%",
                        maxWidth: { xs: '300px', sm: '400px', md: '600px', lg: '800px' }, 
                        marginTop: { xs: 8, sm: 10, md: 12 }, 
                        
                    }}
                >
                    {/* Welcome message */}
                    <Typography
                        variant="h1" 
                        sx={{
                            fontFamily: '"League Spartan", sans-serif',
                            fontWeight: 900,
                            fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" }, 
                            textAlign: { xs: "center", sm: "center", md: "left", lg: "left"},
                            marginBottom: { xs: 4, sm: 5, md: 6 } ,
                            transition: 'transform 0.3s ease', 
                            '&:hover': {
                            transform: 'scale(1.1)', 
                            },
                        }}
                    >
                        Welcome @user!
                    </Typography>

                    {/* Stack */}
                    <Stack
                        spacing={4} 
                        sx={{
                            width: '100%',
                            alignItems: 'center', 
                            maxWidth: { xs: '300px', sm: '400px', md: '500px', lg: '600px' },
                        }}
                    >
                        {/* getmyWrap Button */}
                        <Button onClick={navigatemyWrap}
                            sx={{
                                width: "100%",
                                maxWidth: { xs: '200px', sm: '400px', md: '500px', lg: '600px' }, // Responsive width
                                background: "#486284",
                                color: "#FFFF",
                                fontWeight: 900,
                                borderRadius: "90px",
                                textTransform: "none",
                                padding: { xs: 1, sm: 1.5, md: 2 },
                                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
                                transition: 'transform 0.3s ease', 
                                '&:hover': {
                                transform: 'scale(1.1)', 
                                },
                            }}
                        >
                            getmyWrap
                        </Button>

                        {/* duoWrap Button */}
                        <Button
                            sx={{
                                width: "100%",
                                maxWidth: { xs: '200px', sm: '400px', md: '500px', lg: '600px' },
                                background: "#486284",
                                color: "#FFFF",
                                fontWeight: 900,
                                borderRadius: "90px",
                                textTransform: "none",
                                padding: { xs: 1, sm: 1.5, md: 2 },
                                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
                                transition: 'transform 0.3s ease', 
                                '&:hover': {
                                transform: 'scale(1.1)', 
                                },
                            }}
                        >
                            duoWrap
                        </Button>

                        {/* game Button */}
                        <Button
                            sx={{
                                width: "100%",
                                maxWidth: { xs: '200px', sm: '400px', md: '500px', lg: '600px' },
                                background: "#486284",
                                color: "#FFFF",
                                fontWeight: 900,
                                borderRadius: "90px",
                                textTransform: "none",
                                padding: { xs: 1, sm: 1.5, md: 2 },
                                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
                                transition: 'transform 0.3s ease', 
                                '&:hover': {
                                transform: 'scale(1.1)', 
                            },
                            }}
                        >
                            game
                        </Button>
                    </Stack>
                </Box>
                
            </Box>
        </Box>
    )
}
export default MainPage;
