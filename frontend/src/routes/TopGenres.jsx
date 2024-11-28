import React, { useState } from 'react';

const TopGenres = () => {
    const topGenres = [
        { id: 1, name: 'Pop' },
        { id: 2, name: 'Rock' },
        { id: 3, name: 'Hip Hop' },
        { id: 4, name: 'Jazz' },
        { id: 5, name: 'Classical' }
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
    

    //header
    const headerStyle = {
        fontSize: '6em',
        marginBottom: '20px'
    };

    const listStyle = {
        listStyleType: 'none',
        fontSize: '3em',
        padding: '0'
    };

    // Hover state for genre items
    const [hoveredGenre, setHoveredGenre] = useState(null);

    // Define the normal and hover styles for the genre items
    const getGenreStyle = (id) => ({
        margin: '10px 0',
        fontSize: hoveredGenre === id ? '1.6em' : '1.2em',
        transition: 'font-size 0.3s ease',
        cursor: 'pointer'
    });

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Top Genres</h1>
            <ul style={listStyle}>
                {topGenres.map(genre => (
                    <li
                        key={genre.id}
                        style={getGenreStyle(genre.id)}
                        onMouseEnter={() => setHoveredGenre(genre.id)}
                        onMouseLeave={() => setHoveredGenre(null)}
                    >
                        {genre.id}. {genre.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopGenres;
