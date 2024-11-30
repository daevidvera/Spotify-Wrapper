import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import NavBar from '../components/NavBar';
import SpotifyPreview from '../components/SpotifyPreview';
import { getCookie } from '../csrf/csrf';
import axios from 'axios';
import { UserContext } from '../contexts/UserProvider';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'; // Import translation hook

const ProfilePage = () => {
  const { t } = useTranslation(); // Use translation function
  const theme = useTheme(); // Access the current theme
  const navigate = useNavigate();
  const [deletePromptVisible, setDeletePromptVisible] = useState(false);
  const toggleDeletePrompt = () => setDeletePromptVisible((dpv) => !dpv);

  const { user, userDataLoading } = useContext(UserContext);

  const handleDeleteAccount = () => {
    axios
      .delete('/api/user/delete/', {
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
        withCredentials: true,
      })
      .then(() => navigate('/login'))
      .catch((ex) => {
        console.error('Account deletion failed: ', ex.response?.data || ex.message);
        window.alert('An error has occurred in deleting your account. Check console for more information.');
        toggleDeletePrompt();
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Dialog open={deletePromptVisible} onClose={toggleDeletePrompt}>
          <DialogTitle>{t("deleteAccount")}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t("deleteAccountPrompt")}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleDeletePrompt}>{t("cancel")}</Button>
            <Button onClick={handleDeleteAccount}>{t("confirm")}</Button>
          </DialogActions>
        </Dialog>
        <Box>
          <NavBar buttons={[t("home"), t("contact"), t("signOut")]} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: 5,
              mt: { xs: 4, sm: 6, md: 8 },
            }}
          >
            {userDataLoading ? (
              <Stack sx={{ width: '100%', alignItems: 'center' }}>
                <CircularProgress />
              </Stack>
            ) : (
              <>
                <Stack
                  spacing={2}
                  sx={{
                    width: '100%',
                    maxWidth: { xs: '100%', md: '250px' },
                    alignItems: 'center',
                  }}
                >
                  {/* Avatar */}
                  <Box>
                    <SpotifyPreview {...user} />
                  </Box>
                  {/* User Info */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{
                        fontFamily: '"League Spartan", sans-serif',
                        fontWeight: 900,
                        fontSize: { xs: '1.2rem', sm: '1.7rem', md: '1.9rem' },
                        color: theme.palette.text.primary,
                      }}
                    >
                      @{user['username']}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"League Spartan", sans-serif',
                        color: theme.palette.text.secondary,
                      }}
                      variant="button"
                    >
                      {user['email']}
                    </Typography>
                  </Box>
                  <Button
                    key="delete_account"
                    sx={{
                      width: '80%',
                      maxWidth: { xs: '120px', sm: '200px', md: '250px' },
                      background: theme.palette.error.main,
                      color: theme.palette.common.white,
                      fontWeight: 900,
                      borderRadius: '30px',
                      textTransform: 'none',
                      padding: { xs: 0.5, sm: 0.75, md: 1 },
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                      '&:hover': {
                        background: theme.palette.error.dark,
                      },
                    }}
                    onClick={toggleDeletePrompt}
                  >
                    {t("deleteAccount")}
                  </Button>
                </Stack>

                {/* My Wraps */}
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: { xs: '100%', md: '600px' },
                    mt: { xs: 4, md: 0 },
                    ml: { md: 4 },
                    padding: 4,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 2,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: theme.shadows[2],
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                      fontFamily: '"League Spartan", sans-serif',
                      fontWeight: 500,
                      letterSpacing: 0.1,
                    }}
                  >
                    {t("myWraps")}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </>
    </ThemeProvider>
  );
};

export default ProfilePage;