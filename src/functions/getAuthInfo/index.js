import React, { useState, useEffect } from "react";
import refreshAccessToken from '../../functions/refreshAccessToken'

export default function getAuthInfo() {
    const [headers, setHeaders] = useState({})

    // let tokenRefreshed = false;
    // tokenRefreshed = refreshAccessToken()

    useEffect(() => {
        if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== 'undefined') {
            // If logged in refresh the access token and set the header
            console.log("Logged In")
            refreshAccessToken()
            setHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
                'X-API-Key' : process.env.NEXT_PUBLIC_BUNGIE_API_KEY
            })
        } else {
            // If not logged in refresh the access token and set the header
            console.log("NOT Logged In")
            setHeaders({
                'X-API-Key' : process.env.NEXT_PUBLIC_BUNGIE_API_KEY
            })
        }
    }, [])

    return headers;
}