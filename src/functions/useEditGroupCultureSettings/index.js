import useSWR from 'swr'
import getHeaders from '../useGetHeaders'
import React, { useState, useEffect } from 'react';

export default function useEditGroupCultureSettings(clanName, callsign, motto, about, clanId, send, setSend) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            'name': clanName,
            'callsign': callsign,
            'motto': motto,
            'about': about
        })
    }).then((res) => res.json())

    const { data, error } = useSWR(send ? 'https://www.bungie.net/Platform/GroupV2/' + clanId + '/Edit/' : null, fetcher)

    useEffect(() => {
        setSend(false)
    }, [data]);

    return data
}