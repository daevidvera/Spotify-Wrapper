import React, { useRef, useState, useEffect, useContext } from 'react';
import { Fab, Box, Button, Typography, List, ListItem, ListItemText, Grid, useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import {getCookie} from "../csrf/csrf.jsx";
import { UserContext } from "../contexts/UserProvider.jsx";
import { useTranslation } from 'react-i18next'; // Import translation hook

const Wrapper = () => {
    const theme = useTheme();
    const wrapperRef = useRef();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation(); // Access translations
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

    const saveWrapper = async () => {
        const wrapperData = { genres, songs, artists };

        // Generate PDF using jsPDF
        const doc = new jsPDF();

        // Add the user's wrapper data into the PDF
        doc.setFontSize(16);
        doc.text('Wrapper Summary', 20, 20);
        doc.text(`Top Genres:`, 20, 30);
        genres.forEach((genre, index) => {
            doc.text(`${index + 1}. ${genre}`, 20, 40 + index * 10);
        });

        doc.text(`Top Artists:`, 20, 50 + genres.length * 10);
        artists.forEach((artist, index) => {
            doc.text(`${index + 1}. ${artist}`, 20, 60 + (genres.length + index) * 10);
        });

        doc.text(`Top Songs:`, 20, 70 + (genres.length + artists.length) * 10);
        songs.forEach((song, index) => {
            doc.text(`${index + 1}. ${song.title} - ${song.artist}`, 20, 80 + (genres.length + artists.length + index) * 10);
        });

        // Convert the PDF to a Blob and save it as a file
        const pdfBlob = doc.output('blob');

        // Upload the PDF to the server
        const formData = new FormData();
        formData.append('wrapper_data', pdfBlob, 'wrap.pdf');

        try {
            const response = await axios.post('/api/user/save-wrapper/', {
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                params: {
                    display_name: user.user.display_name,
                },
                withCredentials: true,
                data: formData

            });

            if (response.status === 201) {
                alert('Wrapper saved successfully!');
                navigate('/main');
            }
        } catch (error) {
            console.error('Error saving the wrapper:', error);
            alert('Failed to save wrapper.');
        }
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
                {t('loading')} {/* Translated loading message */}
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
                <Typography variant="h2" sx={{ mb: 4 }}>{t('topGenres')}</Typography>
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
                        <Typography>{t('noGenres')}</Typography>
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
                <Typography variant="h2" sx={{ mb: 4 }}>{t('topArtists')}</Typography>
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
                        <Typography>{t('noArtists')}</Typography>
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
                <Typography variant="h2" sx={{ mb: 4 }}>{t('topSongs')}</Typography>
                <List>
                    {songs.length > 0 ? (
                        songs.map((song, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`${index + 1}. ${song.title}`}
                                    secondary={`${t('artist')}: ${song.artist}`}
                                    primaryTypographyProps={{ sx: { fontSize: '1.5rem', textAlign: 'center' } }}
                                    secondaryTypographyProps={{ sx: { fontSize: '1rem', textAlign: 'center' } }}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Typography>{t('noSongs')}</Typography>
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
                <Typography variant="h2" sx={{ mb: 4 }}>{t('summary')}</Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>{t('topGenres')}</Typography>
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
                        <Typography variant="h6" sx={{ mb: 2 }}>{t('topArtists')}</Typography>
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
                        <Typography variant="h6" sx={{ mb: 2 }}>{t('topSongs')}</Typography>
                        <List>
                            {songs.slice(0, 5).map((song, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={`${index + 1}. ${song.title}`}
                                        secondary={`${t('artist')}: ${song.artist}`}
                                        primaryTypographyProps={{ sx: { fontSize: '1rem' } }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Box>

            <Button
                onClick={saveWrapper}
                variant="contained"
                sx={{
                    position: 'fixed',
                    top: isMobile ? '10px' : '20px', // Adjust position for mobile
                    left: isMobile ? '10px' : '20px', // Adjust position for mobile
                    zIndex: 999,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: 600,
                    padding: isMobile ? '6px 10px' : '8px 16px', // Adjust padding for mobile
                    borderRadius: '8px',
                    fontSize: isMobile ? '0.7rem' : '1rem', // Adjust font size for mobile
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }}
            >
                Save Wrapper
            </Button>
            <ArrowUpwardIcon />
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={saveWrapper}
                    sx={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        fontWeight: 700,
                    }}
                >
                    {t('saveWrapper')} {/* Translated Save Button */}
                </Button>
        </Box>
    );
};

export default Wrapper;