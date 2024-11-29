import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserProvider.jsx';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';

const TopArtists = () => {
    const { user } = useContext(UserContext);
    const [topArtists, setTopArtists] = useState([]);
    const [hoveredArtist, setHoveredArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme(); // Access the theme
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen size

    // Fetch top artists from the backend
    useEffect(() => {
        const fetchTopArtists = async () => {
            setLoading(true);
            try {
                if (!user?.id) {
                    throw new Error('User ID is missing');
                }

                const response = await axios.get(`/api/auth/top-artists`, {
                    params: { user_id: user.id },
                });

                setTopArtists(response.data || []);
            } catch (error) {
                console.error('Error fetching top artists:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopArtists();
    }, [user?.id]);

    if (loading) {
        return (
            <Box
                sx={{
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h3"
                    color={theme.palette.text.primary}
                    sx={{
                        fontSize: isMobile ? '1.5rem' : '3rem', // Adjust loading text size for mobile
                    }}
                >
                    Loading...
                </Typography>
            </Box>
        );
    }

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
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                padding: isMobile ? '10px' : '20px', // Adjust padding for mobile
            }}
        >
            {/* Title */}
            <Typography
                variant="h2"
                sx={{
                    mb: isMobile ? 2 : 4, // Adjust margin for mobile
                    color: theme.palette.text.primary,
                    fontWeight: 'bold',
                    fontSize: isMobile ? '1.8rem' : '3rem', // Adjust font size for mobile
                }}
            >
                Top Artists
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
                {topArtists.length > 0 ? (
                    topArtists.map((artist, index) => (
                        <ListItem
                            key={artist.id}
                            sx={{
                                transform: hoveredArtist === artist.id ? 'scale(1.1)' : 'scale(1)',
                                transition: 'transform 0.3s ease',
                                margin: isMobile ? '10px 0' : '20px 0', // Adjust spacing for mobile
                                cursor: 'pointer',
                                '&:hover': {
                                    bgcolor: theme.palette.action.hover,
                                    borderRadius: '8px', // Rounded corners on hover
                                },
                            }}
                            onMouseEnter={() => setHoveredArtist(artist.id)}
                            onMouseLeave={() => setHoveredArtist(null)}
                        >
                            <ListItemText
                                primary={`${index + 1}. ${artist.name}`}
                                primaryTypographyProps={{
                                    sx: {
                                        fontSize: isMobile ? '1.2rem' : '3rem', // Adjust font size for mobile
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        color: theme.palette.text.primary,
                                    },
                                }}
                            />
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText
                            primary="No top artists found."
                            primaryTypographyProps={{
                                sx: {
                                    fontSize: isMobile ? '1.2rem' : '2rem', // Adjust font size for mobile
                                    textAlign: 'center',
                                    color: theme.palette.text.primary,
                                },
                            }}
                        />
                    </ListItem>
                )}
            </List>
        </Box>
    );
};

export default TopArtists;