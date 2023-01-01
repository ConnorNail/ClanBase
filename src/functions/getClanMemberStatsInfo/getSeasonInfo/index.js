import React, { useState, useEffect } from "react";
import useSWR from 'swr'

export default function getSeasonInfo(seasonHash) {
    const headers = { 'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY }

    const fetcher = ([url, header]) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, error } = useSWR(['https://www.bungie.net/Platform/Destiny2/Manifest/DestinySeasonDefinition/' + seasonHash + '/', headers], fetcher )

    return data
    
    // const [data, setData] = useState([]);

    // // Clear states on route change
    // const dynamicRoute = router.asPath;
    // useEffect(() => setData([]), [dynamicRoute]);

    // useEffect(() => {
    //     const url = 'https://www.bungie.net/Platform/Destiny2/Manifest/DestinySeasonDefinition/' + seasonHash + '/';

    //     async function getData() {
    //         const out = fetch(url, { headers })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 setData(data.Response)
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             })
    //     }
    //     getData()
    // }, [seasonHash, headers, dynamicRoute])

    // return data
}