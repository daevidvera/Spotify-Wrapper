import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';

const TopGenres = () => {
    const theme = useTheme(); // Access the current theme
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen size
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
        margin: isMobile ? '20px 0' : '30px 0', // Adjust spacing for mobile
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.action.hover, // Dynamic hover background
            borderRadius: '8px', // Rounded corners on hover
        },
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
                bgcolor: theme.palette.background.default, // Use theme background
                padding: isMobile ? '10px' : '20px', // Adjust padding for mobile
            }}
        >
            {/* Title */}
            <Typography
                variant="h2" // Larger title
                sx={{
                    mb: isMobile ? 2 : 4, // Adjust margin for mobile
                    color: theme.palette.text.primary, // Use theme text color
                    fontWeight: 'bold',
                    fontSize: isMobile ? '1.5rem' : '2rem', // Adjust font size for mobile
                }}
            >
                Top Genres
            </Typography>

            {/* List */}
            <List
                sx={{
                    width: '100%',
                    maxWidth: isMobile ? 500 : 700, // Adjust max width for mobile
                    margin: '0 auto',
                    padding: 0,
                    bgcolor: 'transparent', // Prevent default List background
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

export default TopGenres;