import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import Logo from '../components/Logo';

const Summary = ({ genres, songs, artists }) => {
    const theme = useTheme(); // Access the current theme
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens

    const sectionStyle = {
        flex: 1, // Make each section equally wide
        padding: isMobile ? '10px' : '20px', // Adjust padding for mobile
        textAlign: 'center',
    };

    const listStyle = {
        margin: '0 auto',
        padding: 0,
        maxWidth: isMobile ? 300 : 400, // Adjust list width for mobile
        bgcolor: 'transparent',
    };

    const listItemTextProps = {
        sx: {
            fontSize: isMobile ? '1rem' : '1.5rem', // Adjust font size for mobile
            textAlign: 'center',
            fontWeight: 900,
            color: theme.palette.text.primary, // Dynamically adapt text color
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', // Stack title on top and lists below
                alignItems: 'center',
                bgcolor: 'inherit', // Ensure it inherits the background color
                color: theme.palette.text.primary, // Dynamically adapt text color
                height: '100%', // Full height container
                padding: isMobile ? '10px' : '20px',
                overflow: 'auto', // Allow scrolling for the entire container
            }}
        >
            {/* Logo as Title */}
            <Logo fontSize={isMobile ? '50px' : '80px'} /> {/* Adjust logo size for mobile */}

            {/* Horizontal Stack of Lists */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row', // Stack vertically on mobile
                    justifyContent: 'space-around',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    width: '100%',
                    mt: isMobile ? 2 : 4, // Adjust margin-top for mobile
                    overflowY: isMobile ? 'auto' : 'unset', // Allow scrolling on mobile
                    height: isMobile ? 'auto' : '100%', // Dynamic height for mobile
                }}
            >
                {/* Top Genres */}
                <Box sx={sectionStyle}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: isMobile ? 1 : 2, // Adjust margin for mobile
                            color: theme.palette.text.primary, // Dynamic title color
                            fontSize: isMobile ? '1.2rem' : '1.5rem', // Adjust font size for mobile
                        }}
                    >
                        Top Genres
                    </Typography>
                    <List sx={listStyle}>
                        {genres.map((genre) => (
                            <ListItem key={genre.id}>
                                <ListItemText
                                    primary={`${genre.id}. ${genre.name}`}
                                    primaryTypographyProps={listItemTextProps}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Top Artists */}
                <Box sx={sectionStyle}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: isMobile ? 1 : 2, // Adjust margin for mobile
                            color: theme.palette.text.primary, // Dynamic title color
                            fontSize: isMobile ? '1.2rem' : '1.5rem', // Adjust font size for mobile
                        }}
                    >
                        Top Artists
                    </Typography>
                    <List sx={listStyle}>
                        {artists.map((artist, index) => (
                            <ListItem key={artist.id}>
                                <ListItemText
                                    primary={`${index + 1}. ${artist.name}`}
                                    primaryTypographyProps={listItemTextProps}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Top Songs */}
                <Box sx={sectionStyle}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: isMobile ? 1 : 2, // Adjust margin for mobile
                            color: theme.palette.text.primary, // Dynamic title color
                            fontSize: isMobile ? '1.2rem' : '1.5rem', // Adjust font size for mobile
                        }}
                    >
                        Top Songs
                    </Typography>
                    <List sx={listStyle}>
                        {songs.map((song) => (
                            <ListItem key={song.id}>
                                <ListItemText
                                    primary={`${song.id}. ${song.title} - ${song.artist}`}
                                    primaryTypographyProps={listItemTextProps}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default Summary;