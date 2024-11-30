import { createContext, useState, useEffect, useContext } from "react";
import defaultPfp from '../assets/default_pfp.jpeg'
import { getCookie } from "../csrf/csrf";
import { AuthContext } from "./AuthProvider";
import { LinearProgress, Stack } from "@mui/material";
import axios from "axios";


const UserContext = createContext()

// Provides current user data & functions 
// NOTE: Except for login/register pages, every page with access to user profile must be authenticated
// This means it must be a child of RequireAuth
// So, make sure the page is a protected route in App.jsx
// NOTE: Values stored in front end can be maliciously changed. Do NOT use these values as authentication!
// Only use values handled in the back end with session storage etc.
function UserProvider({ children }) {
    const [user, setUser] = useState(null); // Start with `null` for proper loading state
    const [userDataLoading, setUserDataLoading] = useState(true);

    const setUserData = (data) => {
        setUser({
            ...data,
            profile_img: data?.profile_img || defaultPfp,
        });
    };

    const refreshUserData = async () => {
        setUserDataLoading(true);
        try {
            const res = await axios.get('/api/user/profile/', {
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                withCredentials: true,
            });
            setUserData(res.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
            window.alert('Failed to retrieve user data. Check console for details.');
        } finally {
            setUserDataLoading(false);
        }
    };

    useEffect(() => {
        refreshUserData(); // Fetch user data when component mounts
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                refreshUserData,
                userDataLoading,
            }}
        >
            {userDataLoading ? (
                // Optionally show a loading spinner or fallback UI while data loads
                <Stack spacing={2} sx={{ width: '100%', marginTop: 4 }}>
                    <LinearProgress />
                </Stack>
            ) : (
                children
            )}
        </UserContext.Provider>
    );
}


export {UserContext, UserProvider}