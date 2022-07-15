import React, { useState, useEffect } from "react";

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key': apikey }

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