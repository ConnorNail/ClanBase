import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useDenyPendingMembers(membershipId, membershipType, displayName, bungieGlobalDisplayName, bungieGlobalDisplayNameCode, clanId, send) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            'memberships': [{
                'membershipType': membershipType,
                'membershipId': membershipId,
                'displayName': displayName,
                'bungieGlobalDisplayName': bungieGlobalDisplayName,
                'bungieGlobalDisplayNameCode': bungieGlobalDisplayNameCode
            }],
            'message': 'Deny this member to join the clan'
        })
    }).then((res) => res.json())

    const { data, error } = useSWR(send ? 'https://www.bungie.net/Platform/GroupV2/' + clanId + '/Members/DenyList/' : null, fetcher)

    return data
}