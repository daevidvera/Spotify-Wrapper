import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import NavBar from '../components/NavBar';
import developerImage1 from '../assets/developer1.jpeg';
import developerImage2 from '../assets/developer2.jpeg';
import developerImage3 from '../assets/developer3.jpeg';
import developerImage4 from '../assets/developer4.jpeg';
import developerImage5 from '../assets/developer5.jpeg';

const ContactPage = () => {
    const theme = useTheme(); // Access the current theme
    const { t } = useTranslation(); // Access translations
    const [selectedEmail, setSelectedEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    const developerEmails = [
        { name: "@alberto.", role: t("backendDeveloper"), email: "alberticoalvarez123@gmail.com", linkedIn: "https://www.linkedin.com/in/albertoalvarez0926", img: developerImage1 },
        { name: "@boris.", role: t("frontendDeveloper"), email: "boriskodappully@gmail.com", linkedIn: "https://www.linkedin.com/in/boris-kodappully-78687a164", img: developerImage2 },
        { name: "@david.", role: t("frontendDeveloper"), email: "carlosrescoto04@gmail.com", linkedIn: "https://www.linkedin.com/in/daevidvera", img: developerImage3 },
        { name: "@devanshi.", role: t("frontendDeveloper"), email: "sooddevanshi@gmail.com", linkedIn: "https://www.linkedin.com/in/devanshi-sood/", img: developerImage4 },
        { name: "@saketh.", role: t("backendDeveloper"), email: "saketh.budideti@gmail.com", linkedIn: "https://www.linkedin.com/in/sbudideti", img: developerImage5 }
    ];

    const handleEmailSelect = (event) => {
        setSelectedEmail(event.target.value);
        window.open(`mailto:${event.target.value}`, '_blank');
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSubmitFeedback = () => {
        alert(t("feedbackSubmitted", { feedback }));
        setFeedback('');
    };

    return (
        <Box
            sx={{
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Navbar */}
            <NavBar buttons={[t("home"), t("profile"), t("signOut")]} />

            {/* Main content area */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: { xs: 2, md: 4 },
                    gap: { xs: 3, md: 5 }
                }}
            >
                {/* Meet the Team Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '1000px',
                        textAlign: 'center',
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                            fontFamily: '"League Spartan", sans-serif',
                            fontWeight: 800,
                        }}
                    >
                        {t("meetTheTeam")}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={4}
                        sx={{
                            alignItems: "center",
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: { xs: 3, md: 5 },
                        }}
                    >
                        {developerEmails.map(dev => (
                            <Box
                                key={dev.email}
                                onClick={() => dev.linkedIn && window.open(dev.linkedIn, '_blank')}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            >
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
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                                        fontWeight: 600,
                                        color: theme.palette.text.secondary,
                                    }}
                                >
                                    {dev.role}
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
                        backgroundColor: theme.palette.primary.main,
                        padding: { xs: 3, md: 5 },
                        borderRadius: 8,
                        textAlign: 'center',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: theme.palette.primary.contrastText,
                            marginBottom: 3,
                            fontFamily: '"League Spartan", sans-serif',
                            fontWeight: 800,
                            fontSize: { xs: '1.5rem', md: '2rem' },
                        }}
                    >
                        {t("contactDevelopers")}
                    </Typography>

                    {/* Dropdown for developer emails */}
                    <Select
                        value={selectedEmail}
                        onChange={handleEmailSelect}
                        displayEmpty
                        sx={{
                            width: '100%',
                            maxWidth: '300px',
                            textAlign: 'left',
                            marginBottom: 3,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.contrastText,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.contrastText,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.contrastText,
                            },
                            '& .MuiSelect-select': {
                                color: theme.palette.primary.contrastText,
                            },
                            '& .MuiInputBase-input': {
                                color: theme.palette.primary.contrastText,
                            },
                            '& .MuiSelect-icon': {
                                color: theme.palette.primary.contrastText,
                            },
                        }}
                        renderValue={(selected) =>
                            selected ? selected : t("selectDeveloperEmail")
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
                        placeholder={t("typeFeedback")}
                        value={feedback}
                        onChange={handleFeedbackChange}
                        multiline
                        rows={4}
                        sx={{
                            width: '100%',
                            maxWidth: '300px',
                            marginBottom: 3,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.contrastText,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.primary.contrastText,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.contrastText,
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: theme.palette.primary.contrastText,
                            },
                        }}
                    />

                    {/* Submit button */}
                    <Button
                        onClick={handleSubmitFeedback}
                        sx={{
                            color: theme.palette.primary.main,
                            backgroundColor: theme.palette.primary.contrastText,
                            width: '100%',
                            maxWidth: '300px',
                            borderRadius: "99px",
                            fontFamily: '"League Spartan", sans-serif',
                            fontWeight: 800,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.contrastText,
                                opacity: 0.9,
                            },
                        }}
                    >
                        {t("submitFeedback")}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ContactPage;