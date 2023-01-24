import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useApprovePendingMembers(membershipId, membershipType, clanId, send) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            'message': 'Approve this member to join the clan'
        })
    }).then((res) => res.json())

    const { data, error } = useSWR(send ? 'https://www.bungie.net/Platform/GroupV2/' + clanId + '/Members/Approve/' + membershipType + '/' + membershipId + '/' : null, fetcher)

    return data
}