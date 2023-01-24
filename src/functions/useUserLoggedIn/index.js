import React, { useState, useEffect } from "react";

export default function useUserLoggedIn() {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== 'undefined') {
            setLoggedIn(true)
        }
    }, [])

    return loggedIn;
}