import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Button, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import NavBar from "../components/NavBar";

function MainPage({ toggleTheme, currentMode }) {
    const { t } = useTranslation(); // Access the translation function
    const navigate = useNavigate();
    const theme = useTheme(); // Access the theme

    const navigatemyWrap = () => {
        navigate("/wrapper");
    };

    const navigatemyDuoWrap = () => {
        navigate("/duo");
    };

    return (
        <Box
            sx={{
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                minHeight: "100vh",
            }}
        >
            {/* Navbar at the top */}
            <NavBar
                buttons={[t("contact"), t("profile"), t("signOut")]} // Use translations for Navbar buttons
                toggleTheme={toggleTheme}
                currentMode={currentMode}
            />

            {/* Content area below Navbar */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "center", lg: "center" },
                    alignItems: "center",
                    p: { xs: 2, md: 5 }, // Responsive padding
                }}
            >
                {/* Main Container */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: {
                            xs: "300px",
                            sm: "400px",
                            md: "600px",
                            lg: "800px",
                        },
                        marginTop: { xs: 8, sm: 10, md: 12 },
                    }}
                >
                    {/* Welcome message */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: '"League Spartan", sans-serif',
                            fontWeight: 900,
                            fontSize: {
                                xs: "2rem",
                                sm: "3rem",
                                md: "4rem",
                                lg: "5rem",
                            },
                            textAlign: {
                                xs: "center",
                                sm: "center",
                                md: "left",
                                lg: "left",
                            },
                            marginBottom: { xs: 4, sm: 5, md: 6 },
                            transition: "transform 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.1)",
                            },
                        }}
                    >
                        {t("welcomeUser", { user: "@user" })} {/* Dynamic welcome message */}
                    </Typography>

                    {/* Stack for Buttons */}
                    <Stack
                        spacing={4}
                        sx={{
                            width: "100%",
                            alignItems: "center",
                            maxWidth: {
                                xs: "300px",
                                sm: "400px",
                                md: "500px",
                                lg: "600px",
                            },
                        }}
                    >
                        {/* getmyWrap Button */}
                        <Button
                            onClick={navigatemyWrap}
                            sx={{
                                width: "100%",
                                maxWidth: {
                                    xs: "200px",
                                    sm: "400px",
                                    md: "500px",
                                    lg: "600px",
                                },
                                background: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                fontWeight: 900,
                                borderRadius: "90px",
                                textTransform: "none",
                                padding: { xs: 1, sm: 1.5, md: 2 },
                                fontSize: {
                                    xs: "0.875rem",
                                    sm: "1rem",
                                    md: "1.25rem",
                                },
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            {t("getMyWrap")}
                        </Button>


                        {/* game Button */}
                        <Button
                            sx={{
                                width: "100%",
                                maxWidth: {
                                    xs: "200px",
                                    sm: "400px",
                                    md: "500px",
                                    lg: "600px",
                                },
                                background: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                fontWeight: 900,
                                borderRadius: "90px",
                                textTransform: "none",
                                padding: { xs: 1, sm: 1.5, md: 2 },
                                fontSize: {
                                    xs: "0.875rem",
                                    sm: "1rem",
                                    md: "1.25rem",
                                },
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            {t("game")}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

export default MainPage;