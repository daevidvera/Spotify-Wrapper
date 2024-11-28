import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserProvider.jsx';
import axios from 'axios';

const TopArtists = () => {
    const { user } = useContext(UserContext);
    const [topArtists, setTopArtists] = useState([]);
    const [hoveredArtist, setHoveredArtist] = useState(null);
    const [loading, setLoading] = useState(true);

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
        marginBottom: '20px',
    };

    const listStyle = {
        listStyleType: 'none',
        fontSize: '3em',
        padding: '0',
    };

    const getArtistStyle = (id) => ({
        margin: '10px 0',
        fontSize: hoveredArtist === id ? '1.6em' : '1.2em',
        transition: 'font-size 0.3s ease',
        cursor: 'pointer',
    });

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
                alert('Failed to load top artists. Check console for details.');
            } finally {
                setLoading(false);
            }
        };

        fetchTopArtists();
    }, [user?.id]);

    if (loading) {
        return (
            <div style={containerStyle}>
                <h1 style={headerStyle}>Loading...</h1>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Top Artists</h1>
            <ul style={listStyle}>
                {topArtists.length > 0 ? (
                    topArtists.map((artist, index) => (
                        <li
                            key={artist.id}
                            style={getArtistStyle(artist.id)}
                            onMouseEnter={() => setHoveredArtist(artist.id)}
                            onMouseLeave={() => setHoveredArtist(null)}
                        >
                            {index + 1}. {artist.name}
                        </li>
                    ))
                ) : (
                    <li style={{ fontSize: '1.5em' }}>
                        No top artists found.
                    </li>
                )}
            </ul>
        </div>
    );
};

export default TopArtists;
