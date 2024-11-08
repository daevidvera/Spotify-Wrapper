import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

const DuoWrappedRightBox = () => {
    const [friends, setFriends] = useState([]); // State to store friends data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors

    // Fetch friends data when the component mounts
    useEffect(() => {
        // Simulate API call (for now, this can be a mock fetch)
        setTimeout(() => {
            // Uncomment when we have the backend set-up so we can fetch from an API:
            /*
            fetch('/api/friends')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch friends');
                    }
                    return response.json();
                })
                .then((data) => {
                    setFriends(data); // Set the fetched data in state
                    setLoading(false); // Set loading to false after data is fetched
                })
                .catch((error) => {
                    setError(error.message); // Set error state if there's an error
                    setLoading(false); // Set loading to false on error
                });
            */

            // Using mock data right now because i want to see how itll look API is not available
            const mockFriends = [
                { username: "JohnDoe" },
                { username: "JaneSmith" },
                { username: "EmilyBrown" },
            ];
            setFriends(mockFriends); // Set mock data
            setLoading(false); // Data is loaded
        }, 1000); // Simulate a delay (like an actual API call)
    }, []); // Empty array ensures this runs once when the component mounts

    // If data is still loading, show a loading message
    if (loading) {
        return <Typography>Loading friends...</Typography>;
    }

    // error message
    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <Box
            sx={{
                width: 436.73,
                height: 502,
                position: 'fixed', 
                top: '20%', 
                right: 80, 
                backgroundColor: 'rgba(72.30, 98.13, 131.70, 0.26)', 
                padding: 6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '16px',
            }}
        >
            {/* Title */}
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                Friends List
            </Typography>

            {/* Display Friends or Placeholder */}
            {friends.length > 0 ? (
                <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    gap: 2,
                }}
                >
                    {friends.map((friend, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 120,
                                height: 180,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 1,
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                boxShadow: 1,
                            }}
                        >
                                                        {/* Profile Picture */}
                                                        <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    marginBottom: 1,
                                }}
                            >
                                <img
                                    src={friend.profilePic}
                                    alt={`${friend.username} profile`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>

                            {/* Username */}
                            <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                {friend.username}
                            </Typography>

                            {/* Button */}
                            <Button variant="contained" color="primary" 
                            sx={{
                                color: "#FFFFF",
                                backgroundColor: "#486284",
                                borderRadius: "90px",
                                fontWeight: 900,
                                paddingLeft: '20px',
                                paddingRight: '20px'
                            }}
                            
                            
                            >
                                Blend
                            </Button>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f0f0f0',
                        borderRadius: 2,
                        border: '1px dashed #ccc',
                        padding: 2,
                    }}
                >
                    <Typography variant="body2" color="textSecondary">
                        No friends added yet. Add friends to see them here.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default DuoWrappedRightBox;
