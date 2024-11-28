import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const TopGenres = () => {
    const topGenres = [
        { id: 1, name: 'Pop' },
        { id: 2, name: 'Rock' },
        { id: 3, name: 'Hip Hop' },
        { id: 4, name: 'Jazz' },
        { id: 5, name: 'Classical' },
    ];

    const [hoveredGenre, setHoveredGenre] = useState(null);

    const getGenreStyle = (id) => ({
        transform: hoveredGenre === id ? 'scale(1.1)' : 'scale(1)', // Subtle hover effect
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
                bgcolor: 'inherit', // Ensure it inherits from the parent Wrapper
                padding: '20px',
            }}
        >
            {/* Title */}
            <Typography
                variant="h2" // Larger title
                sx={{
                    mb: 4,
                    color: 'white',
                    fontWeight: 'bold',
                }}
            >
                Top Genres
            </Typography>

            {/* List */}
            <List
                sx={{
                    width: '100%',
                    maxWidth: 700, // Increase max width for larger list area
                    margin: '0 auto',
                    padding: 0,
                    bgcolor: 'transparent',
                }}
            >
                {topGenres.map((genre) => (
                    <ListItem
                        key={genre.id}
                        sx={getGenreStyle(genre.id)}
                        onMouseEnter={() => setHoveredGenre(genre.id)}
                        onMouseLeave={() => setHoveredGenre(null)}
                    >
                        <ListItemText
                            primary={`${genre.id}. ${genre.name}`}
                            primaryTypographyProps={{
                                sx: {
                                    fontSize: '2rem', 
                                    textAlign: 'center',
                                    fontWeight: 'bold', 
                                    color: 'white', 
                                },
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TopGenres;