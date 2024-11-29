import React from "react";
import NavBar from "../components/NavBar";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import DuoWrappedRightBox from "../components/DuoWrappedRightBox";

const DuoWrapped = () => {
    const theme = useTheme(); // Access the current theme
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens

    return (
        <Box
            sx={{
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Ensure all children are centered
            }}
        >
            {/* Explicitly styled NavBar */}
            <Box
                sx={{
                    width: "100%", // Ensure full-width NavBar
                    position: "sticky", // Keep NavBar at the top
                    top: 0, // Stick to the top
                    zIndex: 1000, // Ensure it appears above other elements
                }}
            >
                <NavBar buttons={["Contact", "Profile", "Home", "Sign Out"]} />
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "center" : "flex-start",
                    width: "100%",
                    mt: isMobile ? 4 : 30,
                    gap: isMobile ? 4 : 0,
                    padding: isMobile ? 2 : 4,
                }}
            >
                {/* Left Section */}
                <Box
                    sx={{
                        p: isMobile ? 2 : 3,
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 2,
                        maxWidth: isMobile ? "90%" : "500px",
                        boxShadow: `0px 4px 10px ${theme.palette.action.hover}`,
                        textAlign: isMobile ? "center" : "left",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: isMobile ? "1.5rem" : "2rem",
                            fontFamily: '"League Spartan", sans-serif',
                            fontWeight: 200,
                            color: theme.palette.text.primary,
                        }}
                    >
                        <span>Welcome to </span>
                        <span
                            style={{
                                color: theme.palette.primary.main,
                                textDecoration: "underline",
                            }}
                        >
                            DuoWrapped
                        </span>
                    </Typography>

                    {/* Description */}
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: "1rem",
                            fontFamily: '"League Spartan", sans-serif',
                            fontWeight: 300,
                            color: theme.palette.text.secondary,
                            mt: 1,
                        }}
                    >
                        It allows you to compare, blend, and contrast your top songs with your friends to see how similar your taste in music is.
                    </Typography>
                </Box>

                {/* Right Section */}
                <Box
                    sx={{
                        display: isMobile ? "flex" : "block",
                        justifyContent: isMobile ? "center" : "flex-start",
                        alignItems: isMobile ? "center" : "flex-start",
                        width: isMobile ? "100%" : "auto",
                    }}
                >
                    <DuoWrappedRightBox />
                </Box>
            </Box>
        </Box>
    );
};

export default DuoWrapped;