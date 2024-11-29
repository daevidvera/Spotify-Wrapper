import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import { useTheme } from "@mui/material/styles"; // Use theme hook
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";

function Navbar({ buttons = ["Home", "Contact", "Profile", "Sign Out"] }) {
  const { user, userDataLoading } = useContext(UserContext);
  const profileImg = user?.profile_img || "/path-to-default-avatar.jpg";

  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme(); // Access the current theme
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigateProfile = () => {
    navigate("/profile");
    setDrawerOpen(false);
  };

  const navigateHome = () => {
    navigate("/main");
    setDrawerOpen(false);
  };

  const navigateSignOut = () => {
    navigate("/login");
  };

  const navigateContact = () => {
    navigate("/contact");
    setDrawerOpen(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: isMobile ? "8px 16px" : "8px 98px", // Adjust padding for mobile and desktop
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Logo fontSize={isMobile ? "20px" : "30px"} />

        {/* Responsive Navigation */}
        {isMobile ? (
          <>
            {/* Hamburger Menu for Mobile */}
            <IconButton
              edge="end"
              onClick={() => setDrawerOpen(true)}
              aria-label="menu"
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>

            {/* Drawer for Mobile Navigation */}
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                },
              }}
            >
              <Box sx={{ width: 250 }} role="presentation">
                <List>
                  {buttons.includes("Home") && (
                    <ListItem button onClick={navigateHome}>
                      <ListItemText primary="Home" />
                    </ListItem>
                  )}
                  {buttons.includes("Contact") && (
                    <ListItem button onClick={navigateContact}>
                      <ListItemText primary="Contact" />
                    </ListItem>
                  )}
                  {buttons.includes("Profile") && (
                    <ListItem
                      button
                      onClick={userDataLoading ? null : navigateProfile}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {userDataLoading ? (
                        <CircularProgress size={24} sx={{ color: theme.palette.text.primary }} />
                      ) : (
                        <img
                          src={profileImg}
                          alt="Profile"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            border: `2px solid ${theme.palette.divider}`,
                          }}
                        />
                      )}
                      <ListItemText primary="Profile" />
                    </ListItem>
                  )}
                  {buttons.includes("Sign Out") && (
                    <ListItem
                      button
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderRadius: "10px",
                        textAlign: "center",
                      }}
                      onClick={navigateSignOut}
                    >
                      <ListItemText primary="Sign Out" />
                    </ListItem>
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
            {buttons.includes("Home") && (
              <Button onClick={navigateHome} sx={{ color: theme.palette.text.primary }}>
                Home
              </Button>
            )}
            {buttons.includes("Contact") && (
              <Button onClick={navigateContact} sx={{ color: theme.palette.text.primary }}>
                Contact
              </Button>
            )}
            {buttons.includes("Profile") && (
              userDataLoading ? (
                <CircularProgress sx={{ color: theme.palette.text.primary }} />
              ) : (
                <Button onClick={navigateProfile} sx={{ padding: 0 }}>
                  <img
                    src={profileImg}
                    alt="Profile"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: `2px solid ${theme.palette.divider}`,
                    }}
                  />
                </Button>
              )
            )}
            {buttons.includes("Sign Out") && !userDataLoading && (
              <Button
                onClick={navigateSignOut}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  borderRadius: "90px",
                  fontWeight: 900,
                  padding: "5px 20px",
                }}
              >
                Sign Out
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;