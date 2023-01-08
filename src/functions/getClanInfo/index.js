import useSWR from 'swr'
import getHeaders from '../getHeaders'

export default function getClanInfo( clanid ) {
    const headers = getHeaders(false)

    const fetcher = ([url, header]) => fetch(url, {headers: header}).then((res) => res.json())

    const { data, error } = useSWR( clanid ?  ['https://www.bungie.net/Platform/GroupV2/' + clanid + '/', headers] : null, fetcher )

    return data
}