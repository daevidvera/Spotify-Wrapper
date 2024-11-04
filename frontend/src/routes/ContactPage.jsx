import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import NavBar from '../components/NavBar';
import developerImage1 from '../assets/developer1.jpeg'; // Import your JPEG images
import developerImage2 from '../assets/developer2.jpeg'; 
import developerImage3 from '../assets/developer3.jpeg'; 
import developerImage4 from '../assets/developer4.jpeg'; 
import developerImage5 from '../assets/developer5.jpeg'; 

const ContactPage = () => {
    const [selectedEmail, setSelectedEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    const developerEmails = [
        { name: "@alberto.", role: "backend developer", email: "alberticoalvarez123@gmail.com", linkedIn: "https://www.linkedin.com/in/albertoalvarez0926" , img: developerImage1 },
        { name: "@boris.",  role: "frontend developer", email: "boriskodappully@gmail.com", linkedIn: "https://www.linkedin.com/in/boris-kodappully-78687a164", img: developerImage2 },
        { name: "@david.", role: "frontend developer", email: "carlosrescoto04@gmail.com",  linkedIn: "https://www.linkedin.com/in/daevidvera", img: developerImage3 },
        { name: "@devanshi.", role: "frontend developer",  email: "sooddevanshi@gmail.com", img: developerImage4 },
        { name: "@saketh.",  role: "backend developer", email: "saketh.budideti@gmail.com",linkedIn:"https://www.linkedin.com/in/sbudideti" , img: developerImage5 }
    ];


    // Handle dropdown selection
    const handleEmailSelect = (event) => {
        setSelectedEmail(event.target.value);
        window.open(`mailto:${event.target.value}`, '_blank');
    };

    // Handle feedback input change
    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    // Handle feedback submission
    const handleSubmitFeedback = () => {
        alert(`Feedback submitted: ${feedback}`);
        setFeedback('');
    };

    return (
        <Box>
        {/* Navbar */}
        <NavBar buttons={["Home", "Profile", "Sign Out"]} />
    
        {/* Main content area */}
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
                padding: 4,
                gap: 4 
            }}
        >
            {/* Meet the Team Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '1000px' // Limit the width of content
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        marginBottom: 2,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        fontFamily: '"League Spartan", sans-serif',
                        fontWeight: 800
                    }}
                >
                    Meet The Team!
                </Typography>
                <Stack direction="row" spacing={5} sx={{  alignItems: "center", justifyContent: 'center', flexWrap: 'wrap', gap: { xs: 5, md: 5 }} }>
                    {developerEmails.map(dev => (
                        <Box key={dev.email} 
                        onClick = { () => window.open(dev.linkedIn, '_blank')}
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            flexDirection: 'column' ,
                            transition: 'transform 0.3s ease', 
                            '&:hover': {
                            transform: 'scale(1.1)', 
                            },
                            

                            
                        }}>
                           <Box
                                component="img"
                                src={dev.img}
                                alt={dev.name}
                                sx={{
                                    width: { xs: 60, sm: 80, md: 100 }, 
                                    height: { xs: 60, sm: 80, md: 100 }, 
                                    borderRadius: '50%',
                                    marginBottom: 1,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
                                    textAlign: 'center',
                                    fontFamily: '"League Spartan", sans-serif',
                                    fontWeight: 800,
                            
                                }}
                            >
                                {dev.name}
                                <Typography sx = {{
                                    fontWeight: 700
                                }}>
                                {dev.role}

                                </Typography>
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
    
            {/* Feedback Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '600px', 
                    backgroundColor: '#486284', 
                    padding: 4,
                    borderRadius: 8,
                    transition: 'transform 0.3s ease', 
                    '&:hover': {
                    transform: 'scale(1.1)', 
                     },
                }}
            >
                <Typography variant="h4" sx={{ 
                    
                    color: '#FFFF',
                    marginBottom: 3,
                    fontFamily: '"League Spartan", sans-serif',
                    fontWeight: 800
                    
                 }}>
                    Contact the Developers
                </Typography>
    
                {/* Dropdown for developer emails */}
                <Select
                    value={selectedEmail}
                    onChange={handleEmailSelect}
                    displayEmpty
                    sx={{ 
                        
                        width: '100%', maxWidth: '300px', textAlign: 'left', marginBottom: 3,
                        '& .MuiOutlinedInput-notchedOutline': { 
                            borderColor: 'white',
                         },
                        '&:hover .MuiOutlinedInput-notchedOutline': { 
                            borderColor: 'white',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                            borderColor: 'white',
                        }, 
                        '& .MuiSelect-select': { 
                            color: 'white',
                        },
                        '& .MuiInputBase-input': { 
                            color: 'white',
                        },
                        '& .MuiSelect-icon': { 
                            color: 'white',
                        },
                    
                        }}
                    renderValue={(selected) =>
                        selected ? selected : "Select a developer's email"
                    }
                >
                    {developerEmails.map((dev) => (
                        <MenuItem key={dev.email} value={dev.email}>
                            {dev.name} - {dev.email}
                        </MenuItem>
                    ))}
                </Select>
    
                {/* Feedback text box */}
                <TextField
                    placeholder="Type here..."
                    value={feedback}
                    onChange={handleFeedbackChange}
                    multiline
                    rows={4}
                    sx={{ width: '100%', maxWidth: '300px', marginBottom: 2,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', 
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', 
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', 
                        },
                     },
                     '& .MuiInputBase-input': { 
                        color: 'white',
                    },
                    '& .MuiInputLabel-root': { 
                        color: 'white',
                    },
                    '& .MuiInputLabel-root.Mui-focused': { 
                        color: 'white',
                    },
                 
                     }}
                />
    
                {/* Submit button */}
                <Button
                    onClick={handleSubmitFeedback}
                    sx={{
                        color: "#48628",
                        backgroundColor: "#FFFF",
                        width: '100%',
                        maxWidth: '300px',
                        borderRadius: "99px",
                        fontFamily: '"League Spartan", sans-serif',
                        fontWeight: 800
                    }}
                >
                    Submit Feedback
                </Button>
            </Box>
        </Box>
    </Box>
    );
};

export default ContactPage;
