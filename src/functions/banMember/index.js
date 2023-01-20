import useSWR from 'swr'
import getHeaders from '../getHeaders'

export default function banMembers(membershipId, membershipType, clanId, send) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            'comment': 'Ban this member from the clan',
            'length': 8
        })
    }).then((res) => res.json())

    const { data, error } = useSWR(send ? 'https://www.bungie.net/Platform/GroupV2/' + clanId + '/Members/' + membershipType + '/' + membershipId + '/Ban/' : null, fetcher)

    return data
}