import React from "react";
import NavBar from '../components/NavBar';
import { Box, Stack } from "@mui/material";
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import DuoWrappedRightBox from "../components/DuoWrappedRightBox";

const DuoWrapped = () => {
    return (
        <Box>
            {/* Navbar at the top */}
            <NavBar buttons={["Contact", "Profile", "Sign Out"]} />

            {/* Left-aligned content with border and background color */}
            <Box 
                sx={{
                    mt: 30,
                    ml: 4,
                    p: 3,
                    border: '1px solid #ccc',  // Light border
                    backgroundColor: '#E6D8D8', // Background color
                    borderRadius: 2,            // Rounded corners
                    maxWidth: '500px'           // Max width for better alignment
                }}
            >
                <Typography 
                    variant="h4" 
                    sx={{
                        fontSize: '2rem',  
                        fontFamily: '"League Spartan", sans-serif',
                        fontWeight: 200,   
                    }}
                >
                    <span style={{ color: 'black' }}>Welcome to </span>
                    <span style={{ color: '#000033', textDecoration: 'underline' }}>DuoWrapped</span>
                </Typography>
                
                {/* Description below the heading */}
                <Typography 
                    variant="body1" 
                    sx={{
                        fontSize: '1rem',  
                        fontFamily: '"League Spartan", sans-serif',
                        fontWeight: 300,
                        color: 'grey.700', 
                        mt: 1 // Small margin-top for spacing
                    }}
                >
                    It allows you to compare, blend, and contrast your top songs with your friends to see how similar your taste in music is.
                </Typography>
            </Box>
            <DuoWrappedRightBox />
        </Box>
    );
}

export default DuoWrapped;