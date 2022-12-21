import { useState, useEffect } from "react";
import getAuthInfo from '../../functions/getAuthInfo';
import { useRouter } from 'next/router';

export default function getClanMemberInfo(clanid) {
    const router = useRouter();

    const headers = getAuthInfo(false, router);

    const [data, setData] = useState([]);

    // Clear states on route change
    const dynamicRoute = router.asPath;
    useEffect(() => setData([]), [dynamicRoute]);

    useEffect(() => {
        for (let i = 0; i < clanid.length; i++) {
            const url = 'https://www.bungie.net/Platform/GroupV2/' + clanid[i] + '/';
            getData(url)
        }

        async function getData(url) {
            const out = fetch(url, { headers })
                .then((res) => res.json())
                .then((data) => {
                    setData(data.Response)
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [headers, dynamicRoute])

    return data
}