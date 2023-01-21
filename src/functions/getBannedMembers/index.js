import useSWR from 'swr'
import getHeaders from '../getHeaders'

export default function getBannedMembers(clanId) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: headers }).then((res) => res.json())

    const { data, error } = useSWR(clanId ? 'https://www.bungie.net/Platform/GroupV2/' + clanId + '/Banned/' : null, fetcher, { revalidateOnFocus: true, refreshInterval: 60000 })

    return data
}