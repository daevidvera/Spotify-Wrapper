import '../styles/Login.css';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Login page

// Computer compatible: ✅
// Mobile compatible: ✅

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: null,
        userID: null,
        displayName: null,
        username: null,
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

function Login() {
    const { setUser } = useContext(UserContext); // Access setUser from context
    const [showLogo, setShowLogo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShowLogo(true);
    }, []);

    const handleSignIn = () => {
        // Example user data
        const userData = {
            name: 'John Doe',
            userID: 'spotify123',
            displayname: 'JohnD',
            username: 'john_doe_account',
        };
        setUser(userData); // Set user data in context
        navigate('/signin');
    };

    const handleCreateAccount = () => {
        navigate('/account');
    };

    return (
        <Stack
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                gap: 3,
            }}
        >
            <Fade in={showLogo} timeout={4400}>
                <div>
                    <Logo fontSize="100px" />
                </div>
            </Fade>

            <Fade in={showLogo} timeout={3000}>
                <Button
                    sx={{
                        borderColor: '#65558F',
                        color: '#65558F',
                        width: '500px',
                        borderRadius: '90px',
                    }}
                    variant="outlined"
                    onClick={handleSignIn}
                >
                    Sign In
                </Button>
            </Fade>

            <Fade in={showLogo} timeout={3000}>
                <Button
                    sx={{
                        borderColor: '#65558F',
                        color: '#65558F',
                        width: '500px',
                        borderRadius: '90px',
                    }}
                    variant="outlined"
                    onClick={handleCreateAccount}
                >
                    Create Account
                </Button>
            </Fade>
        </Stack>
    );
}

export default Login;
