import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';

const TopSongs = () => {
    const theme = useTheme(); // Access the current theme
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile
    const topSongs = [
        { id: 1, title: 'Song Title 1', artist: 'Artist' },
        { id: 2, title: 'Song Title 2', artist: 'Artist' },
        { id: 3, title: 'Song Title 3', artist: 'Artist' },
        { id: 4, title: 'Song Title 4', artist: 'Artist' },
        { id: 5, title: 'Song Title 5', artist: 'Artist' },
    ];

    const [hoveredSong, setHoveredSong] = useState(null);

    const getSongStyle = (id) => ({
        transform: hoveredSong === id ? 'scale(1.05)' : 'scale(1)', // Slight hover effect
        transition: 'transform 0.3s ease',
        margin: isMobile ? '20px 0' : '30px 0', // Adjust spacing for mobile
        cursor: 'pointer',
    });

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                bgcolor: 'inherit', // Inherit background color
                color: theme.palette.text.primary, // Dynamically adapt text color
                padding: isMobile ? '10px' : '20px', // Adjust padding for mobile
            }}
        >
            {/* Title */}
            <Typography
                variant="h2"
                sx={{
                    mb: isMobile ? 2 : 4, // Adjust margin for mobile
                    color: theme.palette.text.primary, // Dynamic title color
                    fontWeight: 'bold',
                    fontSize: isMobile ? '1.5rem' : '3rem', // Adjust font size for mobile
                }}
            >
                Top Songs
            </Typography>

            {/* List */}
            <List
                sx={{
                    width: '100%',
                    maxWidth: isMobile ? 600 : 900, // Adjust max width for mobile
                    margin: '0 auto',
                    padding: 0,
                    bgcolor: 'transparent',
                }}
            >
                {topSongs.map((song) => (
                    <ListItem
                        key={song.id}
                        sx={{
                            ...getSongStyle(song.id),
                            '&:hover': {
                                bgcolor: theme.palette.action.hover, // Hover effect with theme color
                                borderRadius: '8px', // Optional rounded corners for hover
                            },
                        }}
                        onMouseEnter={() => setHoveredSong(song.id)}
                        onMouseLeave={() => setHoveredSong(null)}
                    >
                        <ListItemText
                            primary={`${song.id}. ${song.title} - ${song.artist}`}
                            primaryTypographyProps={{
                                sx: {
                                    fontSize: isMobile ? '1.2rem' : '2rem', // Adjust font size for mobile
                                    textAlign: 'center',
                                    fontWeight: 'bold', // Bold text for emphasis
                                    color: theme.palette.text.primary, // Dynamic text color
                                },
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TopSongs;