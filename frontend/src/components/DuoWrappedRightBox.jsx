import React, { useState, useEffect } from "react";
import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DuoWrappedRightBox = () => {
    const theme = useTheme(); // Access the current theme
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens
    const [friends, setFriends] = useState([]); // State to store friends data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors
    const navigate = useNavigate(); // Use useNavigate inside the component

    const navigatemyDuo = () => {
        navigate('/duofriend'); // Navigate to the desired route
    };

    // Fetch friends data when the component mounts
    useEffect(() => {
        setTimeout(() => {
            // Mock friends data
            const mockFriends = [
                { username: "JohnDoe", profilePic: "https://via.placeholder.com/60" },
                { username: "JaneSmith", profilePic: "https://via.placeholder.com/60" },
                { username: "EmilyBrown", profilePic: "https://via.placeholder.com/60" },
            ];
            setFriends(mockFriends); // Set mock data
            setLoading(false); // Data is loaded
        }, 1000); // Simulate a delay (like an actual API call)
    }, []);

    if (loading) {
        return (
            <Typography
                color={theme.palette.text.primary}
                sx={{ textAlign: "center", marginTop: isMobile ? 2 : 0 }}
            >
                Loading friends...
            </Typography>
        );
    }

    if (error) {
        return (
            <Typography
                color={theme.palette.error.main}
                sx={{ textAlign: "center", marginTop: isMobile ? 2 : 0 }}
            >
                Error: {error}
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                width: isMobile ? "90%" : 436.73,
                height: isMobile ? "auto" : 502,
                position: isMobile ? "relative" : "fixed",
                top: isMobile ? "auto" : "20%",
                right: isMobile ? "auto" : 80,
                backgroundColor: theme.palette.background.paper,
                padding: isMobile ? 3 : 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "16px",
                boxShadow: `0px 4px 10px ${theme.palette.action.hover}`,
                transition: "transform 0.3s ease",
                "&:hover": {
                    transform: isMobile ? "none" : "scale(1.03)",
                },
            }}
        >
            {/* Title */}
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    marginBottom: 2,
                    color: theme.palette.text.primary,
                    textAlign: isMobile ? "center" : "left",
                }}
            >
                Friends List
            </Typography>

            {/* Display Friends or Placeholder */}
            {friends.length > 0 ? (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: isMobile ? "center" : "space-around",
                        gap: 2,
                    }}
                >
                    {friends.map((friend, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 120,
                                height: 180,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: 1,
                                backgroundColor: theme.palette.background.default,
                                borderRadius: 2,
                                boxShadow: `0px 4px 10px ${theme.palette.action.disabledBackground}`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: `0px 8px 20px ${theme.palette.action.hover}`,
                                },
                            }}
                        >
                            {/* Profile Picture */}
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    marginBottom: 1,
                                }}
                            >
                                <img
                                    src={friend.profilePic}
                                    alt={`${friend.username} profile`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>

                            {/* Username */}
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: theme.palette.text.primary,
                                }}
                            >
                                {friend.username}
                            </Typography>

                            {/* Button */}
                            <Button
                                onClick={navigatemyDuo}
                                variant="contained"
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                    backgroundColor: theme.palette.primary.main,
                                    borderRadius: "90px",
                                    fontWeight: 900,
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                    "&:hover": {
                                        backgroundColor: theme.palette.primary.dark,
                                    },
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
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: theme.palette.background.default,
                        borderRadius: 2,
                        border: `1px dashed ${theme.palette.divider}`,
                        padding: 2,
                    }}
                >
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        No friends added yet. Add friends to see them here.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default DuoWrappedRightBox;