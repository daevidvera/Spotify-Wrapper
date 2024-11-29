import React, { useRef, useState } from 'react';
import { Fab, Box, Button, useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TopGenres from './TopGenres';
import TopSongs from './TopSongs';
import TopArtists from './TopArtists';
import Summary from './Summary';
import { useNavigate } from 'react-router-dom';

const Wrapper = () => {
    const theme = useTheme();
    const wrapperRef = useRef();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens
    const [currentSection, setCurrentSection] = useState(0);

    const mockGenres = [
        { id: 1, name: 'Pop' },
        { id: 2, name: 'Rock' },
        { id: 3, name: 'Hip Hop' },
        { id: 4, name: 'Jazz' },
        { id: 5, name: 'Classical' },
    ];

    const mockSongs = [
        { id: 1, title: 'Song Title 1', artist: 'Artist Name 1' },
        { id: 2, title: 'Song Title 2', artist: 'Artist Name 2' },
        { id: 3, title: 'Song Title 3', artist: 'Artist Name 3' },
        { id: 4, title: 'Song Title 4', artist: 'Artist Name 4' },
        { id: 5, title: 'Song Title 5', artist: 'Artist Name 5' },
    ];

    const mockArtists = [
        { id: 1, name: 'Artist 1' },
        { id: 2, name: 'Artist 2' },
        { id: 3, name: 'Artist 3' },
        { id: 4, name: 'Artist 4' },
        { id: 5, name: 'Artist 5' },
    ];

    const sections = [
        { id: 0, component: <TopGenres /> },
        { id: 1, component: <TopArtists /> },
        { id: 2, component: <TopSongs /> },
        {
            id: 3,
            component: <Summary genres={mockGenres} songs={mockSongs} artists={mockArtists} />,
        },
    ];

    const scrollToSection = (direction) => {
        if (!wrapperRef.current) return;

        const nextSection = currentSection + (direction === 'down' ? 1 : -1);

        if (nextSection >= 0 && nextSection < sections.length) {
            const section = wrapperRef.current.children[nextSection];
            section.scrollIntoView({ behavior: 'smooth' });
            setCurrentSection(nextSection);
        }
    };

    const handleScroll = () => {
        if (!wrapperRef.current) return;

        const scrollPosition = wrapperRef.current.scrollTop;
        const viewportHeight = window.innerHeight;

        const sectionIndex = Math.round(scrollPosition / viewportHeight);
        setCurrentSection(sectionIndex);
    };

    const saveWrapper = () => {
        const wrapperData = { genres: mockGenres, songs: mockSongs, artists: mockArtists };
        localStorage.setItem('savedWrapper', JSON.stringify(wrapperData));
        alert('Wrapper saved successfully!');
        navigate('/main');
    };

    return (
        <Box
            ref={wrapperRef}
            onScroll={handleScroll}
            sx={{
                width: '100vw',
                height: '100vh',
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                position: 'relative',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}
        >
            {sections.map((section, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '100vw',
                        height: isMobile ? '80vh' : '100vh', // Adjust height for mobile screens
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        scrollSnapAlign: 'start',
                        bgcolor: index % 2 === 0 ? theme.palette.background.paper : theme.palette.background.default,
                        color: theme.palette.text.primary,
                        padding: isMobile ? 2 : 0, // Add padding for mobile screens
                    }}
                >
                    {section.component}
                </Box>
            ))}

            {/* Save Wrapper Button */}
            <Button
                onClick={saveWrapper}
                variant="contained"
                sx={{
                    position: 'fixed',
                    top: isMobile ? '10px' : '20px', // Adjust position for mobile
                    left: isMobile ? '10px' : '20px', // Adjust position for mobile
                    zIndex: 999,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: 600,
                    padding: isMobile ? '6px 10px' : '8px 16px', // Adjust padding for mobile
                    borderRadius: '8px',
                    fontSize: isMobile ? '0.7rem' : '1rem', // Adjust font size for mobile
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }}
            >
                Save Wrapper
            </Button>

            {/* Navigation Buttons */}
            {currentSection > 0 && (
                <Fab
                    sx={{
                        position: 'fixed',
                        bottom: isMobile ? '80px' : '100px', // Adjust position for mobile
                        right: isMobile ? '15px' : '20px', // Adjust position for mobile
                        zIndex: 999,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        width: isMobile ? '40px' : '56px', // Adjust size for mobile
                        height: isMobile ? '40px' : '56px', // Adjust size for mobile
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                    onClick={() => scrollToSection('up')}
                >
                    <ArrowUpwardIcon fontSize={isMobile ? 'small' : 'medium'} />
                </Fab>
            )}
            {currentSection < sections.length - 1 && (
                <Fab
                    sx={{
                        position: 'fixed',
                        bottom: isMobile ? '20px' : '40px', // Adjust position for mobile
                        right: isMobile ? '15px' : '20px', // Adjust position for mobile
                        zIndex: 999,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        width: isMobile ? '40px' : '56px', // Adjust size for mobile
                        height: isMobile ? '40px' : '56px', // Adjust size for mobile
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                    onClick={() => scrollToSection('down')}
                >
                    <ArrowDownwardIcon fontSize={isMobile ? 'small' : 'medium'} />
                </Fab>
            )}
        </Box>
    );
};

export default Wrapper;