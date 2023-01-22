import useSWR from 'swr'
import getHeaders from '../getHeaders'

export default function kickMember(membershipId, membershipType, clanId, send) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, {
        method: 'post',
        headers: headers
    }).then((res) => res.json())

    const { data, error } = useSWR(send ? 'https://www.bungie.net/Platform/GroupV2/' + clanId + '/Members/' + membershipType + '/' + membershipId + '/Kick/' : null, fetcher)

    return data
}