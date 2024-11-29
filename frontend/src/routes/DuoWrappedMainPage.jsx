import React from 'react';
import { Box, Avatar, Typography, List, ListItem, ListItemText, useTheme, IconButton, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const DuoWrappedMainPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens

  const user1Songs = ['Song A', 'Song B', 'Song C', 'Song D', 'Song E'];
  const user2Songs = ['Song C', 'Song D', 'Song F', 'Song G', 'Song H'];

  const sharedSongs = user1Songs.filter((song) => user2Songs.includes(song));

  const circleSize = isMobile ? 'clamp(50vw, 60vw, 250px)' : 'clamp(20vw, 30vw, 300px)';
  const sharedCircleSize = isMobile
    ? `clamp(${25 + sharedSongs.length * 2}vw, ${40 + sharedSongs.length * 1.5}vw, 300px)`
    : `clamp(${15 + sharedSongs.length * 3}vw, ${25 + sharedSongs.length * 2}vw, 350px)`;

  const circleBackgroundColor =
    theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.primary.light;

  const circleTextColor = theme.palette.mode === 'dark' ? theme.palette.text.primary : '#FFFFFF';

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavBar buttons={['Contact', 'Profile', 'Home', 'Sign Out']} />

      {/* Back Button */}
      <Box
        sx={{
          mt: isMobile ? 2 : 4,
          ml: isMobile ? 2 : 4,
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <IconButton
          onClick={() => navigate('/duo')}
          sx={{
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            boxShadow: `0px 4px 10px ${theme.palette.action.disabledBackground}`,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            padding: isMobile ? 1 : 1.5,
            fontSize: isMobile ? '1rem' : '1.5rem',
          }}
        >
          <ArrowBackIcon fontSize={isMobile ? 'small' : 'medium'} />
        </IconButton>
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontSize: isMobile ? '1.5rem' : '2.5rem',
          fontFamily: '"League Spartan", sans-serif',
          fontWeight: 900,
          mt: isMobile ? 3 : 5,
          mb: isMobile ? 3 : 1,
          textAlign: 'center',
          alignSelf: 'center',
          color: theme.palette.text.primary,
        }}
      >
        @DuoWrapped
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'center' : 'space-evenly',
          alignItems: 'center',
          flexGrow: 1,
          position: 'relative',
          gap: isMobile ? 3 : 0,
        }}
      >
        {/* User 1 Circle */}
        <Box
          sx={{
            width: circleSize,
            height: circleSize,
            bgcolor: circleBackgroundColor,
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '15px',
            boxShadow: `0 5px 15px ${theme.palette.action.disabledBackground}`,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: `0 10px 20px ${theme.palette.action.hover}`,
            },
          }}
        >
          <Typography variant="h6" sx={{ color: circleTextColor, fontWeight: 'bold', mb: 2 }}>
            User 1's Songs
          </Typography>
          <Avatar
            alt="User Profile"
            src="/path-to-user-profile-image.jpg"
            sx={{
              width: '20%',
              height: '20%',
              border: `2px solid ${theme.palette.primary.main}`,
              mb: 2,
            }}
          />
          <List
            sx={{
              width: '100%',
              height: 'calc(60% - 20px)',
              overflowY: 'auto',
              color: circleTextColor,
            }}
          >
            {user1Songs.map((song, index) => (
              <ListItem key={index} sx={{ justifyContent: 'center' }}>
                <ListItemText
                  primary={song}
                  sx={{
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Shared Songs Circle */}
        <Box
          sx={{
            width: sharedCircleSize,
            height: sharedCircleSize,
            bgcolor: theme.palette.background.paper,
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '15px',
            boxShadow: `0 0 15px ${theme.palette.primary.dark}`,
            zIndex: 2,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: `0 10px 20px ${theme.palette.action.hover}`,
            },
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', mb: 2 }}>
            Shared Songs
          </Typography>
          {sharedSongs.length > 0 ? (
            <List
              sx={{
                width: '100%',
                height: 'calc(60% - 20px)',
                overflowY: 'auto',
                color: theme.palette.text.secondary,
              }}
            >
              {sharedSongs.map((song, index) => (
                <ListItem key={index} sx={{ justifyContent: 'center' }}>
                  <ListItemText
                    primary={song}
                    sx={{
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              No Shared Songs
            </Typography>
          )}
        </Box>

        {/* User 2 Circle */}
        <Box
          sx={{
            width: circleSize,
            height: circleSize,
            bgcolor: circleBackgroundColor,
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '15px',
            boxShadow: `0 5px 15px ${theme.palette.action.disabledBackground}`,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: `0 10px 20px ${theme.palette.action.hover}`,
            },
          }}
        >
          <Typography variant="h6" sx={{ color: circleTextColor, fontWeight: 'bold', mb: 2 }}>
            User 2's Songs
          </Typography>
          <Avatar
            alt="Friend Profile"
            src="/path-to-friend-profile-image.jpg"
            sx={{
              width: '20%',
              height: '20%',
              border: `2px solid ${theme.palette.primary.main}`,
              mb: 2,
            }}
          />
          <List
            sx={{
              width: '100%',
              height: 'calc(60% - 20px)',
              overflowY: 'auto',
              color: circleTextColor,
            }}
          >
            {user2Songs.map((song, index) => (
              <ListItem key={index} sx={{ justifyContent: 'center' }}>
                <ListItemText
                  primary={song}
                  sx={{
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default DuoWrappedMainPage;