import React, { useRef, useState, useEffect } from 'react';
import { Fab, Box, Button, Typography, List, ListItem, ListItemText, Grid, useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    // Fetch data from APIs
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [genresRes, songsRes, artistsRes] = await Promise.all([
                    axios.get('/api/auth/top-genres'),
                    axios.get('/api/auth/top-songs'),
                    axios.get('/api/auth/top-artists'),
                ]);

                setGenres(genresRes.data || []);
                setSongs(songsRes.data || []);
                setArtists(artistsRes.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const scrollToSection = (direction) => {
        if (!wrapperRef.current) return;

        const nextSection = currentSection + (direction === 'down' ? 1 : -1);

        if (nextSection >= 0 && nextSection < 4) {
            const section = wrapperRef.current.children[nextSection];
            section.scrollIntoView({ behavior: 'smooth' });
            setCurrentSection(nextSection);
        }
    };

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

            {/* Top Artists */}
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

            {/* Summary */}
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
                                        secondaryTypographyProps={{ sx: { fontSize: '0.875rem' } }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Box>

            {/* Navigation Buttons */}
            {currentSection > 0 && (
                <Fab
                    sx={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '20px',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        width: '56px',
                        height: '56px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                    onClick={() => scrollToSection('up')}
                >
                    <ArrowUpwardIcon />
                </Fab>
            )}

            {currentSection < 3 && (
                <Fab
                    sx={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '20px',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        width: '56px',
                        height: '56px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                    onClick={() => scrollToSection('down')}
                >
                    <ArrowDownwardIcon />
                </Fab>
            )}

            {/* Save Wrapper Button */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={saveWrapper}
                    sx={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    Save Wrapped
                </Button>
            </Box>
        </Box>
    );
};

export default Wrapper;
