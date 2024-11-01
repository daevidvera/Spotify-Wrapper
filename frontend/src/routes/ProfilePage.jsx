import React from 'react';
import { Stack, Button, Box, Typography } from "@mui/material";
import NavBar from '../components/NavBar';

const ProfilePage = () => {
  return (
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
        <Stack
          spacing={2}
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', md: '250px' },
            alignItems: 'center',
          }}
        >
        {/* avatar  */}
          <Box
            sx={{
              width: '10vw',
              height: '10vw',
              maxWidth: '150px',
              maxHeight: '150px',
              background: '#EADDFF',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: '80%',
                height: '80%',
                background: '#4F378A',
                borderRadius: '50%',
              }}
            />
          </Box>
          {/*  user  */}
          <Typography sx={{
            fontFamily: '"League Spartan", sans-serif',
            fontWeight: 900,
            fontSize: { xs: '1.2rem', sm: '1.7rem', md: '1.9rem' },
          }}> 
            @User 
          </Typography>
          {/*  buttons  */}
          {['My Friends', 'Liked Songs', 'Delete Account'].map((text) => ( // simplified buttons
            <Button
              key={text}
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
            >
              {text}
            </Button>
          ))}
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
      </Box>
    </Box>
  );
};

export default ProfilePage;