import React, {useContext, useEffect, useState} from 'react';
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
  MenuItem,
  Select,
    CardContent,
    CardActions,
    Card,
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
    const [deleteAccountPromptVisible, setDeleteAccountPromptVisible] = useState(false);
    const [deleteWrapPromptVisible, setDeleteWrapPromptVisible] = useState(false);
    const [savedWraps, setSavedWraps] = useState([]);
    const [loadingWraps, setLoadingWraps] = useState(false);
    const [deleteWrapId, setDeleteWrapId] = useState(null);

    const toggleDeleteAccountPrompt = () => {
        setDeleteAccountPromptVisible((visible) => !visible);
      };

    // Toggle wrap delete prompt
    const toggleDeleteWrapPrompt = (wrapId = null) => {
        setDeleteWrapId(wrapId);
        setDeleteWrapPromptVisible((visible) => !visible);
      };

  const { user, userDataLoading, setHoliday } = useContext(UserContext);
  const [holidayDialogVisible, setHolidayDialogVisible] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState('');
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(true);

  const holidays = ['Default', 'Halloween', 'Christmas'];

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoadingSummary(true);
        const response = await axios.get('/api/wrap/summary', {
          withCredentials: true,
          params: { spotify_id: user.spotify_id },
        });
        setSummary(response.data || 'No summary available.');
      } catch (error) {
        console.error('Failed to fetch summary:', error);
        setSummary('Failed to load description.');
      } finally {
        setLoadingSummary(false);
      }
    };

    if (user.spotify_id) {
      fetchSummary();
    }
  }, [user.spotify_id]);

  const handleSelectHoliday = () => {
    setHoliday(selectedHoliday);
    setHolidayDialogVisible(false);
    window.alert(`Holiday selected: ${selectedHoliday}`);
  };

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
            toggleDeleteAccountPrompt();
          });
      };

    const handleDeleteWrap = async () => {
          try {
              await axios.delete('/api/user/delete-wrap/', {
                  params: {
                      spotify_id: user.spotify_id,
                      wrap_id: deleteWrapId
                    },
                  headers: {
                      'X-CSRFToken': getCookie('csrftoken'),
                    },
                  withCredentials: true,
              });

                // Remove the deleted wrap from the state
              setSavedWraps(prevWraps =>
                  prevWraps.filter(wrap => wrap.id !== deleteWrapId)
              );

                // Close the delete prompt
              toggleDeleteWrapPrompt();
        } catch (error) {
          console.error('Error deleting wrap:', error.response?.data || error.message);
          window.alert('Failed to delete wrap. Please try again.');
        }
      };

    useEffect(() => {
          const fetchSavedWraps = async () => {
              setLoadingWraps(true);
              try {
                  const response = await axios.get('/api/user/get-saved-wraps/', {
                      params: { spotify_id: user.spotify_id },
                      withCredentials: true,
                      headers: {
                          'X-CSRFToken': getCookie('csrftoken'),
                      },
                  });

                  setSavedWraps(response.data || []);

              } catch (error) {
                  console.error('Error fetching saved wraps:', error.response?.data || error.message);
              } finally {
                  setLoadingWraps(false);
              }
          };
          fetchSavedWraps();
      }, [user.spotify_id]);

  return (
    <ThemeProvider theme={theme}>
      <>
      {/* Wrap Deletion Dialog */}
        <Dialog open={deleteWrapPromptVisible} onClose={() => toggleDeleteWrapPrompt()}>
          <DialogTitle>{t('deleteWrap')}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t('deleteWrapPrompt')}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => toggleDeleteWrapPrompt()}>{t('cancel')}</Button>
            <Button color="error" onClick={handleDeleteWrap}>
              {t('confirm')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Account Deletion Dialog */}
        <Dialog open={deleteAccountPromptVisible} onClose={toggleDeleteAccountPrompt}>
          <DialogTitle>{t('deleteAccount')}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t('deleteAccountPrompt')}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleDeleteAccountPrompt}>{t('cancel')}</Button>
            <Button onClick={handleDeleteAccount}>{t('confirm')}</Button>
          </DialogActions>
        </Dialog>

        {/* Holiday Selection Dialog */}
        <Dialog open={holidayDialogVisible} onClose={() => setHolidayDialogVisible(false)}>
          <DialogTitle>{t('selectHolidayWrapper')}</DialogTitle>
          <DialogContent>
            <Select
              value={selectedHoliday}
              onChange={(e) => setSelectedHoliday(e.target.value)}
              fullWidth
            >
              {holidays.map((holiday) => (
                <MenuItem key={holiday} value={holiday}>
                  {holiday}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHolidayDialogVisible(false)}>{t('cancel')}</Button>
            <Button
              onClick={handleSelectHoliday}
              disabled={!selectedHoliday}
            >
              {t('apply')}
            </Button>
          </DialogActions>
        </Dialog>

        <Box
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#000000' : theme.palette.background.default,
            minHeight: '100vh',
            width: '100%',
          }}
        >
          <NavBar buttons={[t('home'), t('contact'), t('signOut')]} />
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
                  <Box>
                    <SpotifyPreview {...user} />
                  </Box>
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
                    sx={{
                      width: '80%',
                      background: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      fontWeight: 900,
                      borderRadius: '30px',
                      textTransform: 'none',
                      padding: { xs: 0.5, sm: 0.75, md: 1 },
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                      '&:hover': {
                        background: theme.palette.primary.dark,
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={() => setHolidayDialogVisible(true)}
                  >
                    {t('selectHolidayWrapper')}
                  </Button>
                  <Button
                    key="delete_account"
                    sx={{
                      width: '80%',
                      background: theme.palette.error.main,
                      color: theme.palette.common.white,
                      fontWeight: 900,
                      borderRadius: '30px',
                      textTransform: 'none',
                      padding: { xs: 0.5, sm: 0.75, md: 1 },
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                      '&:hover': {
                        background: theme.palette.error.dark,
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={toggleDeleteAccountPrompt}
                  >
                    {t('deleteAccount')}
                  </Button>
                </Stack>
                              <Box
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', md: '600px' }, // Ensure the same width as "Describing You"
                  mt: { xs: 4, md: 4 }, // Match top margin
                  ml: { md: 4 },
                  padding: 4,
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                  textAlign: 'center',
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
                    marginBottom: 2,
                  }}
                >
                  {t("myWraps")}
                </Typography>
                {savedWraps.length > 0 ? (
                  savedWraps.map((wrap, index) => (
                    <Card
                      key={index}
                      sx={{
                        marginBottom: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: 2,
                      }}
                    >
                      <CardContent>
                        <Typography variant="body1">Wrap {wrap.id}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Date Created: {new Date(wrap.created_at).toLocaleString()}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Button
                          size="small"
                          href={wrap.pdf_file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("Open Wrap")}
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => toggleDeleteWrapPrompt(wrap.id)}
                        >
                          {t("Delete Wrap")}
                        </Button>
                      </CardActions>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {t("noWraps")}
                  </Typography>
                )}
              </Box>

                {/* Describing You Section */}
                {/* Describing You Section */}
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: { xs: '100%', md: '600px' },
                    mt: { xs: 4, md: 4 },
                    ml: { md: 4 },
                    padding: 4,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)' // Subtle transparency for dark mode
                      : 'rgba(0, 0, 0, 0.03)', // Subtle transparency for light mode
                    borderRadius: 2,
                    boxShadow: theme.shadows[2],
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      fontFamily: '"League Spartan", sans-serif',
                      fontWeight: 500,
                      mb: 2,
                    }}
                  >
                    {t('Describing You')}
                  </Typography>
                  {loadingSummary ? (
                    <CircularProgress />
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: '"League Spartan", sans-serif',
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {summary}
                    </Typography>
                  )}
                </Box>

              </>
            )}
          </Box>
        </Box>
      </>
    </ThemeProvider>
  );
};


// return (
//         <ThemeProvider theme={theme}>
//             <>
//             {/* Wrap Deletion Dialog */}
//             <Dialog open={deleteWrapPromptVisible} onClose={() => toggleDeleteWrapPrompt()}>
//               <DialogTitle>{t('deleteWrap')}</DialogTitle>
//               <DialogContent>
//                 <DialogContentText>{t('deleteWrapPrompt')}</DialogContentText>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={() => toggleDeleteWrapPrompt()}>{t('cancel')}</Button>
//                 <Button color="error" onClick={handleDeleteWrap}>
//                   {t('confirm')}
//                 </Button>
//               </DialogActions>
//             </Dialog>
//
//             {/* Account Deletion Dialog */}
//             <Dialog open={deleteAccountPromptVisible} onClose={toggleDeleteAccountPrompt}>
//               <DialogTitle>{t('deleteAccount')}</DialogTitle>
//               <DialogContent>
//                 <DialogContentText>{t('deleteAccountPrompt')}</DialogContentText>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={toggleDeleteAccountPrompt}>{t('cancel')}</Button>
//                 <Button onClick={handleDeleteAccount}>{t('confirm')}</Button>
//               </DialogActions>
//             </Dialog>
//
//             <Box>
//               <NavBar buttons={[t("home"), t("contact"), t("signOut")]} />
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexDirection: { xs: 'column', md: 'row' },
//                   justifyContent: 'space-between',
//                   alignItems: 'flex-start',
//                   width: '100%',
//                   maxWidth: '1200px',
//                   margin: '0 auto',
//                   padding: 5,
//                   mt: { xs: 4, sm: 6, md: 8 },
//                 }}
//               >
//                 {loadingWraps ? (
//                   <Stack sx={{ width: '100%', alignItems: 'center' }}>
//                     <CircularProgress />
//                   </Stack>
//                 ) : (
//                   <>
//                     <Stack
//                       spacing={2}
//                       sx={{
//                         width: '100%',
//                         maxWidth: { xs: '100%', md: '250px' },
//                         alignItems: 'center',
//                       }}
//                     >
//                       {/* Avatar */}
//                       <Box>
//                         <SpotifyPreview {...user} />
//                       </Box>
//                       {/* User Info */}
//                       <Box sx={{ textAlign: 'center' }}>
//                         <Typography
//                           sx={{
//                             fontFamily: '"League Spartan", sans-serif',
//                             fontWeight: 900,
//                             fontSize: { xs: '1.2rem', sm: '1.7rem', md: '1.9rem' },
//                             color: theme.palette.text.primary,
//                           }}
//                         >
//                           @{user['username']}
//                         </Typography>
//                         <Typography
//                           sx={{
//                             fontFamily: '"League Spartan", sans-serif',
//                             color: theme.palette.text.secondary,
//                           }}
//                           variant="button"
//                         >
//                           {user['email']}
//                         </Typography>
//                       </Box>
//                       <Button
//                         key="delete_account"
//                         sx={{
//                           width: '80%',
//                           maxWidth: { xs: '120px', sm: '200px', md: '250px' },
//                           background: theme.palette.error.main,
//                           color: theme.palette.common.white,
//                           fontWeight: 900,
//                           borderRadius: '30px',
//                           textTransform: 'none',
//                           padding: { xs: 0.5, sm: 0.75, md: 1 },
//                           fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
//                           '&:hover': {
//                             background: theme.palette.error.dark,
//                           },
//                         }}
//                         onClick={toggleDeleteAccountPrompt}
//                       >
//                         {t("deleteAccount")}
//                       </Button>
//                     </Stack>
//
//
//                   </>
//                 )}
//               </Box>
//             </Box>
//           </>
//         </ThemeProvider>

export default ProfilePage;