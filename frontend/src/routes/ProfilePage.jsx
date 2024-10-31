import React, { useEffect, useState } from 'react';
import { Stack, Button, Box } from "@mui/material";
import { Typography }  from '@mui/material'
import NavBar from '../components/NavBar'
import Logo from '../components/Logo';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

const ProfilePage = () => {
  const [userData, setUserData] = useState({ username: '@UserID', friendCount: 0 }); // Sample user data

  useEffect(() => {
      const fetchUserData = async () => {
          // Simulate a network request
          const data = await new Promise((resolve) => {
              setTimeout(() => {
                  resolve({ username: '@example1', friendCount: 25 }); // Mock data
              }, 1000);
          });
          setUserData(data);
      };

      fetchUserData();
  }, []);

  return (
      <div
          className="ProfilePrevWrepsPage"
          style={{
              width: '100%' ,
              maxWidth: 1280,
              height: '100vh',
              position: 'relative',
              background: 'white',
              paddingLeft: '20px',
          }}
      >
          <NavBar buttons={["Home", "Contact", "Profile", "Sign Out"]} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start', // Align items to the left
                    width: '100%',
                    maxWidth: { xs: '300px', sm: '400px', md: '600px', lg: '800px' },
                    marginTop: { xs: 4, sm: 6, md: 8 },
                }}
            >
                <div
                    className="GenericAvatar"
                    style={{
                        width: '10vw', // Smaller width for avatar
                        height: '10vw', // Smaller height for avatar
                        position: 'relative',
                        background: '#EADDFF',
                        borderRadius: '50%', // Maintain round shape
                        overflow: 'hidden',
                    }}
                >
                    <div
                        className="AvatarPlaceholder"
                        style={{
                            width: '80%', // Responsive width
                            height: '80%', // Responsive height
                            position: 'absolute',
                            background: '#4F378A',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)', // Center the avatar
                        }}
                    />
                </div>
                <Typography
                    variant="h3" // Changed to h3 for a smaller size
                    sx={{
                        fontFamily: '"League Spartan", sans-serif',
                        fontWeight: 400,
                        fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem', lg: '2rem' }, // Smaller and responsive
                        textAlign: 'left', // Align text to the left
                        marginBottom: { xs: 2, sm: 3, md: 4 },
                        color: 'black',
                        wordWrap: 'break-word',
                    }}
                >
                    {userData.username}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem' }, // Smaller friend count size
                        color: 'black',
                        marginBottom: { xs: 2, sm: 3, md: 4 },
                    }}
                >
                    Friends: {userData.friendCount}
                </Typography>
                <Stack
                    spacing={1} // Reduced spacing between buttons
                    sx={{
                        width: '100%',
                        alignItems: 'flex-start', // Align buttons to the left
                    }}
                >
                    {/* My Friends Button */}
                    <Button
                        sx={{
                            width: '80%', // Responsive width
                            maxWidth: { xs: '120px', sm: '200px', md: '250px', lg: '300px' }, // Adjusted max width
                            background: '#486284',
                            color: '#FFFF',
                            fontWeight: 900,
                            borderRadius: '30px', // Smaller border radius
                            textTransform: 'none',
                            padding: { xs: 0.5, sm: 0.75, md: 1 }, // Adjusted padding
                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, // Smaller font size
                        }}
                    >
                        My Friends
                    </Button>

                    {/* Liked Songs Button */}
                    <Button
                        sx={{
                            width: '80%', // Responsive width
                            maxWidth: { xs: '120px', sm: '200px', md: '250px', lg: '300px' }, // Adjusted max width
                            background: '#486284',
                            color: '#FFFF',
                            fontWeight: 900,
                            borderRadius: '30px', // Smaller border radius
                            textTransform: 'none',
                            padding: { xs: 0.5, sm: 0.75, md: 1 }, // Adjusted padding
                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, // Smaller font size
                        }}
                    >
                        Liked Songs
                    </Button>

                    {/* Delete Account Button */}
                    <Button
                        sx={{
                            width: '80%', // Responsive width
                            maxWidth: { xs: '120px', sm: '200px', md: '250px', lg: '300px' }, // Adjusted max width
                            background: '#486284',
                            color: '#FFFF',
                            fontWeight: 900,
                            borderRadius: '30px', // Smaller border radius
                            textTransform: 'none',
                            padding: { xs: 0.5, sm: 0.75, md: 1 }, // Adjusted padding
                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, // Smaller font size
                        }}
                    >
                        Delete Account
                    </Button>
                </Stack>


              <div
                  className="Rectangle7"
                  style={{
                      width: 720,
                      height: 370,
                      position: 'absolute',
                      background: '#D9D9D9',
                      left: 484,
                      top: 377,
                  }}
              />
              <div
                  className="Mywraps"
                  style={{
                      position: 'absolute',
                      textAlign: 'center',
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      lineHeight: 20,
                      letterSpacing: 0.10,
                      wordWrap: 'break-word',
                      left: 788,
                      top: 335,
                  }}
              >
                  My Wraps
              </div>
          </Box>
      </div>
  );
};

export default ProfilePage;

<div className="Frame6" style={{height: 157, left: 66, top: 396, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 15, display: 'inline-flex'}}></div>
