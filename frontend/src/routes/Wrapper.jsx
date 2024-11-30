import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Fab,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Paper,
  Button,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider.jsx";
import { useTranslation } from "react-i18next";

const Wrapper = () => {
  const theme = useTheme();
  const wrapperRef = useRef();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const [currentSection, setCurrentSection] = useState(0);
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [songsRes, artistsRes, genresRes, summaryRes] = await Promise.all([
            axios.get("api/wrap/top-songs", {
                withCredentials: true,
                params: { spotify_id: user.user.spotify_id },
            }),
            axios.get("api/wrap/top-artists", {
                withCredentials: true,
                params: { spotify_id: user.user.spotify_id },
            }),
            axios.get("api/wrap/top-genres", {
                withCredentials: true,
                params: { spotify_id: user.user.spotify_id },
            }),
            axios.get("api/wrap/summary", {
                withCredentials: true,
                params: { spotify_id: user.user.spotify_id },
            })

        ]);
        setSongs(songsRes.data || []);
        setArtists(artistsRes.data || []);
        setGenres(genresRes.data || []);
        setSummary(summaryRes.data || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.user.spotify_id]);

  const scrollToSection = (direction) => {
    if (!wrapperRef.current) return;

    const sections = wrapperRef.current.querySelectorAll(".section");
    let nextSection = currentSection + (direction === "down" ? 1 : -1);

    if (direction === "down" && nextSection >= sections.length) {
      nextSection = 0; // Wrap back to the first section
    } else if (direction === "up" && nextSection < 0) {
      nextSection = sections.length - 1; // Wrap to the last section
    }

    const section = sections[nextSection];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(nextSection);
    }
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const saveWrap = () => {
    alert("Save functionality to be implemented!");
  };

  const shareWrap = () => {
      const formattedText = `
My 2024 Wrapped!      

Top Genres:
${genres.map((genre, index) => `${index + 1}. ${genre}`).join("\n")}

Top Artists:
${artists.map((artist, index) => `${index + 1}. ${artist}`).join("\n")}

Top Songs:
${songs.map((song, index) => `${index + 1}. ${song.title} - ${song.artist}`).join("\n")}

Summary:
${summary}
`;

      navigator.clipboard.writeText(formattedText.trim())
        .then(() => {
          alert("Summary copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          alert("Failed to copy summary.");
        });
    };


  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {t("loading")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={wrapperRef}
      sx={{
        width: "100vw",
        height: "100%",
        overflowY: "auto",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Back Button */}
      <Fab
        sx={{
          position: "fixed",
          top: isMobile ? "12px" : "24px",
          left: isMobile ? "12px" : "24px",
          zIndex: 999,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
        onClick={goToProfile}
      >
        <ArrowBackIcon />
      </Fab>

      {/* Scroll Down Button */}
      <Fab
        sx={{
          position: "fixed",
          bottom: isMobile ? "12px" : "24px",
          right: isMobile ? "12px" : "24px",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
        onClick={() => scrollToSection("down")}
      >
        <ArrowDownwardIcon />
      </Fab>

      {/* Sections */}
      {[
        { title: t("topGenres"), data: genres },
        { title: t("topArtists"), data: artists },
        { title: t("topSongs"), data: songs },
      ].map((section, idx) => (
        <Box
          className="section"
          key={idx}
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
            {section.title}
          </Typography>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: "90%",
              maxWidth: "600px",
              "&:hover": {
                boxShadow: `0 8px 16px ${theme.palette.primary.main}`,
              },
            }}
          >
            <List>
              {section.data.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                      borderRadius: "8px",
                    },
                  }}
                >
                  <ListItemText
                    primary={`${index + 1}. ${
                      idx === 2 ? item.title : item
                    }`}
                    secondary={
                      idx === 2 ? `${t("artist")}: ${item.artist}` : null
                    }
                    primaryTypographyProps={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                    secondaryTypographyProps={{
                      fontSize: "1.2rem",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      ))}

      {/* Summary */}
        <Box
          className="section"
          sx={{
            height: "auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            padding: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
              marginBottom: isMobile ? 4 : 0,
            }}
          >
            {t("summary")}
          </Typography>
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              maxWidth: isMobile ? "100%" : "600px", // Adjust width for a single text box
              p: 4,
              "&:hover": {
                boxShadow: `0 8px 16px ${theme.palette.primary.main}`,
              },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {t("Summary")}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "justify" }}>
              {summary || t("loadingSummary")}
            </Typography>
          </Paper>
        </Box>

      {/* Save and Share Buttons */}
      <Box
        sx={{
          position: "fixed",
          bottom: isMobile ? "20px" : "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 2,
          zIndex: 999,
          opacity: 0.3,
          transition: "opacity 0.3s ease-in-out",
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={saveWrap}
        >
          {t("save")}
        </Button>
        <Button
          variant="contained"
          startIcon={<ShareIcon />}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
          onClick={shareWrap}
        >
          {t("share")}
        </Button>
      </Box>
    </Box>
  );
};

export default Wrapper;