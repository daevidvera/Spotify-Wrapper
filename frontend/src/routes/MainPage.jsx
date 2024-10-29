import React from "react";
import NavBar from '../components/NavBar'

function MainPage() {
    return (
        <NavBar buttons={["Home", "Contact" , "Profile", "Sign Out"]} />

    )
}

export default MainPage;