import React, { useRef, useState, useEffect, useContext } from 'react';
import { Fab, Box, Button, Typography, List, ListItem, ListItemText, Grid, useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/UserProvider.jsx";

const Wrapper = () => {
    const theme = useTheme();
    const wrapperRef = useRef();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentSection, setCurrentSection] = useState(0);
    const [genres, setGenres] = useState([]);
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useContext(UserContext);

    // Fetch data from APIs
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Indicate that data fetching is in progress
            try {
                // Make parallel API requests for top songs, artists, and genres
                const [songsRes, artistsRes, genresRes] = await Promise.all([
                    axios.get('api/wrap/top-songs', {
                        withCredentials: true,
                        params: { spotify_id: user.user.spotify_id },
                    }),
                    axios.get('api/wrap/top-artists', {
                        withCredentials: true,
                        params: { spotify_id: user.user.spotify_id },
                    }),
                    axios.get('api/wrap/top-genres', {
                        withCredentials: true,
                        params: { spotify_id: user.user.spotify_id },
                    }),
                ]);

                // Update state with the fetched data
                setSongs(songsRes.data || []);
                setArtists(artistsRes.data || []);
                setGenres(genresRes.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user.user.spotify_id]);

    // Scroll to the specified section
    // Scroll to the specified section
    const scrollToSection = (direction) => {
        if (!wrapperRef.current) return;

        const nextSection = Math.max(0, Math.min(currentSection + (direction === 'down' ? 1 : -1), 3));

        const sections = wrapperRef.current.querySelectorAll('div');
        const section = sections[nextSection];

        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setCurrentSection(nextSection);
        }
    };


    // Handle IntersectionObserver to track visible section
    useEffect(() => {
        const sections = wrapperRef.current?.children;
        if (!sections) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const visibleIndex = Array.from(sections).indexOf(entry.target);
                        setCurrentSection(visibleIndex); // Sync `currentSection` with the visible section
                    }
                });
            },
            { root: wrapperRef.current, threshold: 0.5 } // Trigger when 50% of a section is visible
        );

        Array.from(sections).forEach((section) => observer.observe(section));

        return () => observer.disconnect(); // Cleanup observer on unmount
    }, []);

    const saveWrapper = () => {
        const wrapperData = { genres, songs, artists };
        localStorage.setItem('savedWrapper', JSON.stringify(wrapperData));
        alert('Wrapper saved successfully!');
        navigate('/main');
    };

    const goToProfile = () => {
        navigate('/profile');
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                }}
            >
                Loading...
            </Box>
        );
    }

    return (
        <Box
            ref={wrapperRef}
            sx={{
                width: '100vw',
                height: '100vh',
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}
        >
            {/* Back to Profile Button */}
            <Fab
                sx={{
                    position: 'fixed',
                    top: isMobile ? '20px' : '30px',
                    left: isMobile ? '10px' : '20px',
                    zIndex: 999,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    width: isMobile ? '40px' : '56px',
                    height: isMobile ? '40px' : '56px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }}
                onClick={goToProfile}
            >
                <ArrowBackIcon />
            </Fab>

            {/* Top Genres */}
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    scrollSnapAlign: 'start',
                }}
            >
                <Typography variant="h2" sx={{ mb: 4 }}>Top Genres</Typography>
                <List>
                    {genres.length > 0 ? (
                        genres.map((genre, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`${index + 1}. ${genre}`}
                                    primaryTypographyProps={{ sx: { fontSize: '1.5rem', textAlign: 'center' } }}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No genres available.</Typography>
                    )}
                </List>
            </Box>

            {/*Top Artists */}
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    scrollSnapAlign: 'start',
                }}
            >
                <Typography variant="h2" sx={{ mb: 4 }}>Top Artists</Typography>
                <List>
                    {artists.length > 0 ? (
                        artists.map((artist, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`${index + 1}. ${artist}`}
                                    primaryTypographyProps={{ sx: { fontSize: '1.5rem', textAlign: 'center' } }}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No artists available.</Typography>
                    )}
                </List>
            </Box>

            {/* Top Songs */}
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    scrollSnapAlign: 'start',
                }}
            >
                <Typography variant="h2" sx={{ mb: 4 }}>Top Songs</Typography>
                <List>
                    {songs.length > 0 ? (
                        songs.map((song, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`${index + 1}. ${song.title}`}
                                    secondary={`Artist: ${song.artist}`}
                                    primaryTypographyProps={{ sx: { fontSize: '1.5rem', textAlign: 'center' } }}
                                    secondaryTypographyProps={{ sx: { fontSize: '1rem', textAlign: 'center' } }}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No songs available.</Typography>
                    )}
                </List>
            </Box>

            {/*Summary*/}
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    scrollSnapAlign: 'start',
                }}
            >
                <Typography variant="h2" sx={{ mb: 4 }}>Summary</Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Top Genres</Typography>
                        <List>
                            {genres.slice(0, 5).map((genre, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={`${index + 1}. ${genre}`}
                                        primaryTypographyProps={{ sx: { fontSize: '1rem' } }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Top Artists</Typography>
                        <List>
                            {artists.slice(0, 5).map((artist, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={`${index + 1}. ${artist}`}
                                        primaryTypographyProps={{ sx: { fontSize: '1rem' } }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Top Songs</Typography>
                        <List>
                            {songs.slice(0, 5).map((song, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={`${index + 1}. ${song.title}`}
                                        secondary={`Artist: ${song.artist}`}
                                        primaryTypographyProps={{ sx: { fontSize: '1rem' } }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Box>

            {/* Navigation Buttons */}
            <Fab
                sx={{
                    position: 'fixed',
                    bottom: '100px',
                    right: '20px',
                    backgroundColor: currentSection > 0 ? theme.palette.primary.main : theme.palette.grey[400],
                    color: theme.palette.primary.contrastText,
                    width: '56px',
                    height: '56px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                        backgroundColor: currentSection > 0 ? theme.palette.primary.dark : theme.palette.grey[400],
                    },
                }}
                onClick={() => scrollToSection('up')}
                disabled={currentSection === 0}
            >
                <ArrowUpwardIcon />
            </Fab>

            <Fab
                sx={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '20px',
                    backgroundColor: currentSection < 3 ? theme.palette.primary.main : theme.palette.grey[400],
                    color: theme.palette.primary.contrastText,
                    width: '56px',
                    height: '56px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                        backgroundColor: currentSection < 3 ? theme.palette.primary.dark : theme.palette.grey[400],
                    },
                }}
                onClick={() => scrollToSection('down')}
                disabled={currentSection === 3}
            >
                <ArrowDownwardIcon />
            </Fab>
        </Box>
    );
};

export default Wrapper;
