import React, { useState, useEffect } from "react";

export default function getCurrentSeasonHash(headers, router) {
    const [data, setData] = useState([]);

    // Clear states on route change
    const dynamicRoute = router.asPath;
    useEffect(() => setData([]), [dynamicRoute]);

    useEffect(() => {
        const url = 'https://www.bungie.net/Platform/Settings/';

        async function getData() {
            const out = fetch(url, { headers })
                .then((res) => res.json())
                .then((data) => {
                    setData(data.Response.destiny2CoreSettings.currentSeasonHash)
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
        getData()
    }, [headers, dynamicRoute])

    return data
}