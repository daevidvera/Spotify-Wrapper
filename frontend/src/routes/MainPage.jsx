import React from "react";
import NavBar from '../components/NavBar'
import { Box, Stack } from "@mui/material";
import Button from '@mui/material/Button';
import { Typography }  from '@mui/material'

function MainPage() {
    return (
        <Box>
            {/* Navbar at the top */}
            <NavBar buttons={["Home", "Contact", "Profile", "Sign Out"]} />

            {/* Content area below Navbar */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', md: "center", lg: 'flex-end' },
                    alignItems: 'center',
                    p: { xs: 2, md: 5 } // Responsive padding
                }}
            >

                {/* Container for Welcome message and button stack */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column", // Stack the elements vertically
                        alignItems: "center", // Center-align items
                        width: "100%",
                        maxWidth: { xs: '300px', sm: '400px', md: '600px', lg: '800px' }, // Responsive width for the container
                        marginTop: { xs: 8, sm: 10, md: 12 }, // Space at the top for positioning
                    }}
                >
                    {/* Welcome message */}
                    <Typography
                        variant="h1" 
                        sx={{
                            fontFamily: '"League Spartan", sans-serif',
                            fontWeight: 900,
                            fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" }, // Responsive font size
                            textAlign: "center",
                            marginBottom: { xs: 4, sm: 5, md: 6 } // Space below the message
                        }}
                    >
                        Welcome @user!
                    </Typography>

                    {/* Button Stack */}
                    <Stack
                        spacing={4} 
                        sx={{
                            width: '100%',
                            alignItems: 'center', // Center-aligns buttons within the Stack
                            maxWidth: { xs: '300px', sm: '400px', md: '500px', lg: '600px' },
                        }}
                    >
                        {/* getmyWrap Button */}
                        <Button
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
