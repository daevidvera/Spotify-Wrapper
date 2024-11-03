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
        { name: "Alberto", email: "alberticoalvarez123@gmail.com", img: developerImage1 },
        { name: "Boris", email: "boriskodappully@gmail.com", img: developerImage2 },
        { name: "David", email: "carlosrescoto04@gmail.com", img: developerImage3 },
        { name: "Devanshi", email: "sooddevanshi@gmail.com", img: developerImage4 },
        { name: "Saketh", email: "saketh.budideti@gmail.com", img: developerImage5 }
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 4 }}>
                {/* Meet the Team Section */}
                <Box sx={{ width: '40%' }}>
                  <Typography 
                    variant="h5" 
                      sx={{ 
                          marginBottom: 2, 
                          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Responsive font size
                          fontWeight: 'bold' // Optional: makes the font bold
                      }}
                  >
                      Meet the Team
                  </Typography>
                    <Stack spacing={5}>
                        {developerEmails.map(dev => (
                            <Box key={dev.email} sx={{ display: 'flex', alignItems: 'center' }}>
                                <img 
                                    src={dev.img} 
                                    alt={dev.name} 
                                    style={{ width: 100, height: 100, borderRadius: '50%', marginRight: 50 }} 
                                />
                                <Typography 
                                    sx={{ 
                                        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, // Responsive font sizes
                                    }}
                                >
                                    {dev.name}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                {/* Feedback Section */}
                <Box sx={{ width: '55%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                        Contact the Developers
                    </Typography>

                    {/* Dropdown for developer emails */}
                    <Select
                        value={selectedEmail}
                        onChange={handleEmailSelect}
                        displayEmpty
                        sx={{ width: '300px', textAlign: 'left', marginBottom: 3 }}
                        renderValue={(selected) => selected ? selected : "Select a developer's email"}
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
                        sx={{ width: '300px', marginBottom: 2 }}
                    />

                    {/* Submit button */}
                    <Button
                        onClick={handleSubmitFeedback}
                        variant="contained"
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                    >
                        Submit Feedback
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ContactPage;
