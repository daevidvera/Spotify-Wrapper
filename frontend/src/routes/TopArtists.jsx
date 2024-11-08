import React, { useState } from 'react';

const TopArtists = () => {
    const topArtists = [
        { id: 1, name: 'Artist Name 1' },
        { id: 2, name: 'Artist Name 2' },
        { id: 3, name: 'Artist Name 3' },
        { id: 4, name: 'Artist Name 4' },
        { id: 5, name: 'Artist Name 5' }
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

    // Hover state for artist items
    const [hoveredArtist, setHoveredArtist] = useState(null);

    // Define the normal and hover styles for the artist items
    const getArtistStyle = (id) => ({
        margin: '10px 0',
        fontSize: hoveredArtist === id ? '1.6em' : '1.2em',
        transition: 'font-size 0.3s ease',
        cursor: 'pointer'
    });

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Top Artists</h1>
            <ul style={listStyle}>
                {topArtists.map(artist => (
                    <li
                        key={artist.id}
                        style={getArtistStyle(artist.id)}
                        onMouseEnter={() => setHoveredArtist(artist.id)}
                        onMouseLeave={() => setHoveredArtist(null)}
                    >
                        {artist.id}. {artist.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopArtists;
