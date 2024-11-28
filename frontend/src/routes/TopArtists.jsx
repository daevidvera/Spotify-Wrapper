import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserProvider.jsx';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const TopArtists = () => {
    const { user } = useContext(UserContext);
    const [topArtists, setTopArtists] = useState([]);
    const [hoveredArtist, setHoveredArtist] = useState(null);
    const [loading, setLoading] = useState(true);

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
                <Typography variant="h3" color="white">
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
                bgcolor: 'inherit', // Ensure it uses the inherited background color
                color: 'white', // White text for readability
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
                Top Artists
            </Typography>

            {/* List */}
            <List
                sx={{
                    width: '100%',
                    maxWidth: 700, // Increased max width for larger list area
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
                                margin: '20px 0',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={() => setHoveredArtist(artist.id)}
                            onMouseLeave={() => setHoveredArtist(null)}
                        >
                            <ListItemText
                                primary={`${index + 1}. ${artist.name}`}
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
                    ))
                ) : (
                    <ListItem>
                        <ListItemText
                            primary="No top artists found."
                            primaryTypographyProps={{
                                sx: {
                                    fontSize: '2rem',
                                    textAlign: 'center',
                                    color: 'white',
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