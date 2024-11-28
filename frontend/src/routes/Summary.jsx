import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import Logo from '../components/Logo';

const Summary = ({ genres, songs, artists }) => {
    const sectionStyle = {
        flex: 1, // Make each section equally wide
        padding: '20px',
        textAlign: 'center',
    };

    const listStyle = {
        margin: '0 auto',
        padding: 0,
        maxWidth: 400,
        bgcolor: 'transparent',
    };

    const listItemTextProps = {
        sx: {
            fontSize: '1.5rem', // Slightly smaller font for summary
            textAlign: 'center',
            fontWeight: 900,
            color: 'white',
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', // Stack title on top and lists below
                alignItems: 'center',
                bgcolor: 'inherit',
                color: 'white',
                height: '100%',
                padding: '20px',
            }}
        >
            {/* Logo as Title */}
            <Logo fontSize="80px" />

            {/* Horizontal Stack of Lists */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    width: '100%',
                    mt: 4, // Add margin-top for spacing below the title
                }}
            >
                {/* Top Genres */}
                <Box sx={sectionStyle}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
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
                    <Typography variant="h4" sx={{ mb: 2 }}>
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
                    <Typography variant="h4" sx={{ mb: 2 }}>
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