import React, { useState, useEffect } from "react";
import refreshAccessToken from '../../functions/refreshAccessToken'

export default function getAuthInfo(authNeeded, router) {
    const [headers, setHeaders] = useState({})

    // Clear states on route change
    const dynamicRoute = router.asPath;
    useEffect(() => setHeaders({}), [dynamicRoute]);

    useEffect(() => {
        // If logged in refresh the access token and set the header
        if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== 'undefined') {
            console.log("Logged In")
            refreshAccessToken()
            setHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
                'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY
            })
        } else {
            // If not logged in
            console.log("NOT Logged In")
            // If authentication is needed route to login screen
            if (authNeeded) {
                router.push('/login')
            } else {
                // If authentication is not needed set the header
                setHeaders({
                    'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY
                })
            }
        }
    }, [dynamicRoute])

    return headers;
}