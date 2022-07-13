import React, { useState, useEffect } from "react";

export default function userLoggedIn() {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("access_token") !== null) {
            setLoggedIn(true)
        }
    }, [])

    return loggedIn;
}