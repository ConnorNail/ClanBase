import { useState, useEffect } from "react";
import getAuthInfo from '../../functions/getAuthInfo';
import { useRouter } from 'next/router';
import useSWR from 'swr'

export default function getClanInfo( clanid ) {
    
    const headers = {'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY}

    const fetcher = ([url, header]) => fetch(url, {headers: header}).then((res) => res.json())

    const { data, error } = useSWR( ['https://www.bungie.net/Platform/GroupV2/' + clanid + '/', headers], fetcher )

    return data
}