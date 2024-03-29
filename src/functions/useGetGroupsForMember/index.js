import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useGetGroupsForMember(membershipId, membershipType) {
    const header = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, error } = useSWR(membershipId && membershipType ? 'https://www.bungie.net/Platform/GroupV2/User/' + membershipType + '/' + membershipId + '/0/1/' : null, fetcher)

    return data
}