import React, { useState, useEffect } from "react";
import refreshAccessToken from '../../functions/refreshAccessToken'

export default function getAuthInfo() {
    const [headers, setHeaders] = useState({})

    useEffect(() => {
        refreshAccessToken()

        if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== 'undefined') {
            setHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
                'X-API-Key' : process.env.NEXT_PUBLIC_BUNGIE_API_KEY
            })
        } else {
            setHeaders({
                'X-API-Key' : process.env.NEXT_PUBLIC_BUNGIE_API_KEY
            })
        }
    }, [])

    return headers;
}