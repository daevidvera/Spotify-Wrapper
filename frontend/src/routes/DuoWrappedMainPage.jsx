import React from 'react';
import Box from '@mui/material/Box';  // Import Box if you're using Material-UI
import NavBar from '../components/NavBar';  // Correct path for NavBar

const DuoWrappedMainPage = () => {
  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
      {/* Navbar at the top */}
      <NavBar buttons={["Contact", "Profile", "Sign Out"]} />

      {/* Circular Box 1 (Left Circle) */}
{/* Circular Box 1 (Left Circle - User Profile) */}
        <div
        className="Ellipse1"
        style={{
            width: 899,
            height: 856,
            background: 'rgba(72, 98, 131, 0.26)', // Adjusted color values for RGBA
            borderRadius: '50%',
            position: 'absolute',
            top: '77%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',            // Center contents horizontally
            justifyContent: 'center',    
            alignItems: 'top',        // Center contents vertically
        }}
        >
        {/* User Profile Icon */}
        <img
            src="/path-to-user-profile-image.jpg" // Replace with actual image path
            alt="User Profile"
            style={{
            width: '150px',           // Size of the icon
            height: '150px',
            borderRadius: '50%',      // Circular icon
            border: '3px solid #486284', // Optional border for styling
            objectFit: 'cover',       // Ensure image fills the circle
            }}
        />
        </div>

        {/* Circular Box 2 (Right Circle - Friend's Profile) */}
        <div
        className="Ellipse2"
        style={{
            width: 899,
            height: 856,
            background: 'rgba(72, 98, 131, 0.26)', // Adjusted color values for RGBA
            borderRadius: '50%',
            position: 'absolute',
            top: '77%',
            right: '30%',
            transform: 'translate(50%, -50%)',
            display: 'flex',            // Center contents horizontally
            justifyContent: 'center',
            alignItems: 'top' ,        // Center contents vertically
        }}
        >
        {/* Friend's Profile Icon */}
        <img
            src="/path-to-friend-profile-image.jpg" // Replace with actual image path
            alt="Friend Profile"
            style={{
            width: '150px',           // Size of the icon
            height: '150px',
            borderRadius: '50%',      // Circular icon
            border: '3px solid #486284', // Optional border for styling
            objectFit: 'cover',       // Ensure image fills the circle
            }}
        />
        </div>
      
      <div>DuoWrappedMainPage</div>
    </Box>
  );
};

export default DuoWrappedMainPage;
