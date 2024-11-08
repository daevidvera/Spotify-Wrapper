import React, { useState } from 'react';

const TopSongs = () => {
    const topSongs = [
        { id: 1, title: 'Song Title 1', artist: 'Artist Name 1' },
        { id: 2, title: 'Song Title 2', artist: 'Artist Name 2' },
        { id: 3, title: 'Song Title 3', artist: 'Artist Name 3' },
        { id: 4, title: 'Song Title 4', artist: 'Artist Name 4' },
        { id: 5, title: 'Song Title 5', artist: 'Artist Name 5' }
    ];

    // Define inline styles as JavaScript objects
    const containerStyle = {
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#1DB954',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: '0',
    };

    const headerStyle = {
        fontSize: '6em',
        marginBottom: '20px'
    };

    const listStyle = {
        listStyleType: 'none',
        fontSize: '3em',
        padding: '0'
    };

    // Hover state for song items
    const [hoveredSong, setHoveredSong] = useState(null);

    // Define the normal and hover styles for the song items
    const getSongStyle = (id) => ({
        margin: '10px 0',
        fontSize: hoveredSong === id ? '1.6em' : '1.2em',
        transition: 'font-size 0.3s ease',
        cursor: 'pointer'
    });

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Top Songs</h1>
            <ul style={listStyle}>
                {topSongs.map(song => (
                    <li
                        key={song.id}
                        style={getSongStyle(song.id)}
                        onMouseEnter={() => setHoveredSong(song.id)}
                        onMouseLeave={() => setHoveredSong(null)}
                    >
                        {song.id}. {song.title} - {song.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopSongs;
