import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useSendIndividualGroupInvite(membershipId, membershipType, clanId, send) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            'message': 'I would like to join your clan'
        })
    }).then((res) => res.json())

    const { data, error } = useSWR(send ? 'https://www.bungie.net/Platform/GroupV2/' + clanId + '/Members/IndividualInvite/' + membershipType + '/' + membershipId + '/' : null, fetcher)

    return data
}