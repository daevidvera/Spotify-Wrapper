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
function UserProvider({children}) {

    const [user, setUser] = useState({'profile_img': defaultPfp})
    const [userDataLoading, setUserDataLoading] = useState(true)

    const setUserData = data => setUser({...data, 'profile_img': data['profile_img'] || defaultPfp})

    const refreshUserData = () => {
        setUserDataLoading(true)
        return axios.get('/api/user/profile/', {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            withCredentials: true
        })
        .then(res => setUserData(res.data))
        .catch(ex => {
            console.error(ex.response?.data || ex.message)
            window.alert('An error has occurred in retrieving user data. Check console for more information.')
        })
        .finally(res => setUserDataLoading(false))
    }

    useEffect(() => {
        refreshUserData()
    }, [])

    return <UserContext.Provider
        value={{
            user, refreshUserData, userDataLoading
        }}
    >
        {children}
    </UserContext.Provider>
}



export {UserContext, UserProvider}