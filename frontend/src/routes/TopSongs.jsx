import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const TopSongs = () => {
    const topSongs = [
        { id: 1, title: 'Song Title 1', artist: 'Artist' },
        { id: 2, title: 'Song Title 2', artist: 'Artist' },
        { id: 3, title: 'Song Title 3', artist: 'Artist' },
        { id: 4, title: 'Song Title 4', artist: 'Artist' },
        { id: 5, title: 'Song Title 5', artist: 'Artist' },
    ];

    const [hoveredSong, setHoveredSong] = useState(null);

    const getSongStyle = (id) => ({
        transform: hoveredSong === id ? 'scale(1.1)' : 'scale(1)', // Slight hover effect
        transition: 'transform 0.3s ease',
        margin: '30px 0', // Spacing between items
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
                color: 'white',
                padding: '20px',
            }}
        >
            {/* Title */}
            <Typography
                variant="h2"
                sx={{
                    mb: 4,
                    color: 'white',
                    fontWeight: 'bold',
                }}
            >
                Top Songs
            </Typography>

            {/* List */}
            <List
                sx={{
                    width: '100%',
                    maxWidth: 900, // Increase max width for a larger list area
                    margin: '0 auto',
                    padding: 0,
                    bgcolor: 'transparent',
                }}
            >
                {topSongs.map((song) => (
                    <ListItem
                        key={song.id}
                        sx={getSongStyle(song.id)}
                        onMouseEnter={() => setHoveredSong(song.id)}
                        onMouseLeave={() => setHoveredSong(null)}
                    >
                        <ListItemText
                            primary={`${song.id}. ${song.title} - ${song.artist}`}
                            primaryTypographyProps={{
                                sx: {
                                    fontSize: '3rem', // Explicitly set the font size
                                    textAlign: 'center',
                                    fontWeight: 'bold', // Bold text for emphasis
                                    color: 'white', // White color for visibility
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