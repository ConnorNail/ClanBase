import React, { useState, useEffect } from "react";

export default function getClanMemberInfo(clanid, headers) {

    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'https://www.bungie.net/Platform/GroupV2/' + clanid + '/Members/';

        async function getData() {
            const out = fetch(url, { headers })
                .then((res) => res.json())
                .then((data) => {
                    setData(data.Response.results)
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
        getData()
    }, [headers])

    return data
}