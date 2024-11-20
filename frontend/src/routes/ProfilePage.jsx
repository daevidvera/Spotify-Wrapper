import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Button, Box, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from '../components/NavBar';
import SpotifyPreview from '../components/SpotifyPreview'
import getCookie from '../../csrf/csrf';
import axios from 'axios';


const ProfilePage = () => {
  const navigate = useNavigate()

  const [deletePromptVisible, setDeletePromptVisible] = useState(false)
  const toggleDeletePrompt = () => setDeletePromptVisible(dpv => !dpv)

  const [profileData, setProfileData] = useState(null)
  useEffect(() => {
    axios.get('/api/user/profile/', {
      headers: {
        'X-CSRFToken': getCookie('csrftoken')
      },
      withCredentials: true
    })
    .then(res => setProfileData(res.data))
    .catch(ex => {
      console.error(ex.response?.data || ex.message)
      window.alert('An error has occurred in retrieving user data. Check console for more details.')
    })
  }, [])

  const handleDeleteAccount = () => {
    axios.delete('/api/user/delete/', {
      headers: {
        'X-CSRFToken': getCookie('csrftoken')
      },
      withCredentials: true
    })
    .then(() => navigate('/login'))
    .catch(ex => {
      console.error('Account deletion failed: ', ex.response?.data || ex.message)
      window.alert('An error has occurred in deleting your account. Check console for more information.')
      toggleDeletePrompt()
    })
  }

  return (
    <>
      <Dialog 
        open={deletePromptVisible}
        onClose={toggleDeletePrompt}
      >
        <DialogTitle> Delete Account </DialogTitle>
        <DialogContent> 
          <DialogContentText>
          Are you sure you want to delete your account? This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDeletePrompt}> Cancel </Button>
          <Button onClick={handleDeleteAccount}> Confirm </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <NavBar buttons={["Home", "Contact", "Sign Out"]} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between', // left section good, center aligned
            alignItems: 'flex-start',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 5,
            mt: { xs: 4, sm: 6, md: 8 }, // RESPONSIVEEEEE
          }}
        >
          {
            profileData ? (
              <>
                <Stack
            spacing={2}
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: '250px' },
              alignItems: 'center',
            }}
          >
                {/* avatar  */}
                <Box>
                  <SpotifyPreview {...profileData} />
                </Box>
                {/*  user  */}
                <Box sx={{
                  textAlign:'center'
                }}>
                  <Typography sx={{
                    fontFamily: '"League Spartan", sans-serif',
                    fontWeight: 900,
                    fontSize: { xs: '1.2rem', sm: '1.7rem', md: '1.9rem' },
                  }}> 
                    @{profileData.username}
                  </Typography>
                  <Typography sx={{
                    fontFamily: '"League Spartan", sans-serif'
                  }}
                    variant='button'
                  >
                    {profileData.email}
                  </Typography>
                </Box>
                <Button 
                  key='delete_account'
                  sx={{
                    width: '80%',
                    maxWidth: { xs: '120px', sm: '200px', md: '250px' },
                    background: '#486284',
                    color: '#FFFF',
                    fontWeight: 900,
                    borderRadius: '30px',
                    textTransform: 'none',
                    padding: { xs: 0.5, sm: 0.75, md: 1 },
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                  }}
                  onClick={toggleDeletePrompt}
                >
                Delete Account
                </Button>
              </Stack>
            
              {/*  my wraps prototype not finished lol sorry berto  */}
              <Box
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', md: '600px' },
                  mt: { xs: 4, md: 0 },
                  ml: { md: 4 },
                  padding: 4,
                  backgroundColor: '#D9D9D9',
                  borderRadius: 2,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'black',
                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                    fontFamily: 'Roboto',
                    fontWeight: '500',
                    letterSpacing: 0.1,
                  }}
                >
                  My Wraps
                </Typography>
              </Box>
              </>
            ) : (
              <Stack sx={{alignItems: 'center', width: '100%'}}>
                <CircularProgress />
              </Stack>
            )
          }
        </Box>
      </Box>
    </>
  )
};

export default ProfilePage;