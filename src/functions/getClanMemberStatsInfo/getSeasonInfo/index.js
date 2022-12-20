import React, { useState, useEffect } from "react";

export default function getSeasonInfo(seasonHash, headers, router) {
    const [data, setData] = useState([]);

    // Clear states on route change
    const dynamicRoute = router.asPath;
    useEffect(() => setData([]), [dynamicRoute]);

    useEffect(() => {
        const url = 'https://www.bungie.net/Platform/Destiny2/Manifest/DestinySeasonDefinition/' + seasonHash + '/';

        async function getData() {
            const out = fetch(url, { headers })
                .then((res) => res.json())
                .then((data) => {
                    setData(data.Response)
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
        getData()
    }, [seasonHash, headers, dynamicRoute])

    return data
}