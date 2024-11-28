import React, { useRef, useState } from 'react';
import { Fab, Box, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TopGenres from './TopGenres';
import TopSongs from './TopSongs';
import TopArtists from './TopArtists';
import Summary from './Summary';

const Wrapper = () => {
    const wrapperRef = useRef();
    const [currentSection, setCurrentSection] = useState(0);

    const mockGenres = [
        { id: 1, name: 'Pop' },
        { id: 2, name: 'Rock' },
        { id: 3, name: 'Hip Hop' },
        { id: 4, name: 'Jazz' },
        { id: 5, name: 'Classical' },
    ];

    const mockSongs = [
        { id: 1, title: 'Song Title 1', artist: 'Artist Name 1' },
        { id: 2, title: 'Song Title 2', artist: 'Artist Name 2' },
        { id: 3, title: 'Song Title 3', artist: 'Artist Name 3' },
        { id: 4, title: 'Song Title 4', artist: 'Artist Name 4' },
        { id: 5, title: 'Song Title 5', artist: 'Artist Name 5' },
    ];

    const mockArtists = [
        { id: 1, name: 'Artist 1' },
        { id: 2, name: 'Artist 2' },
        { id: 3, name: 'Artist 3' },
        { id: 4, name: 'Artist 4' },
        { id: 5, name: 'Artist 5' },
    ];

    const sections = [
        { id: 0, title: 'Top Genres', component: <TopGenres /> },
        { id: 1, title: 'Top Artists', component: <TopArtists /> },
        { id: 2, title: 'Top Songs', component: <TopSongs /> },
        {
            id: 3,
            title: 'Summary',
            component: <Summary genres={mockGenres} songs={mockSongs} artists={mockArtists} />,
        },
    ];

    const scrollToSection = (direction) => {
        if (!wrapperRef.current) return;

        const nextSection = currentSection + (direction === 'down' ? 1 : -1);

        if (nextSection >= 0 && nextSection < sections.length) {
            const section = wrapperRef.current.children[nextSection];
            section.scrollIntoView({ behavior: 'smooth' });
            setCurrentSection(nextSection);
        }
    };

    const handleScroll = () => {
        if (!wrapperRef.current) return;

        const scrollPosition = wrapperRef.current.scrollTop;
        const viewportHeight = window.innerHeight;

        const sectionIndex = Math.round(scrollPosition / viewportHeight);
        setCurrentSection(sectionIndex);
    };

    return (
        <Box
            ref={wrapperRef}
            onScroll={handleScroll}
            sx={{
                width: '100vw',
                height: '100vh',
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                position: 'relative',
            }}
        >
            {sections.map((section) => (
                <Box
                    key={section.id}
                    sx={{
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        scrollSnapAlign: 'start',
                        bgcolor: '#121212',
                        color: 'white',
                    }}
                >
                    {section.component}
                </Box>
            ))}

            {currentSection > 0 && (
                <Fab
                    color="primary"
                    sx={{ position: 'fixed', bottom: '80px', right: '20px' }}
                    onClick={() => scrollToSection('up')}
                >
                    <ArrowUpwardIcon />
                </Fab>
            )}
            {currentSection < sections.length - 1 && (
                <Fab
                    color="primary"
                    sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
                    onClick={() => scrollToSection('down')}
                >
                    <ArrowDownwardIcon />
                </Fab>
            )}
        </Box>
    );
};

export default Wrapper;