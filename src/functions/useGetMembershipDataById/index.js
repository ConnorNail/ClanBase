import useSWR from 'swr'
import getHeaders from '../getHeaders'

export default function useGetMemberhsipDataById(membershipId, membershipType) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: headers }).then((res) => res.json())

    const { data, error } = useSWR(membershipId && membershipType ? 'https://www.bungie.net/Platform/User/GetMembershipById/' + membershipId + '/' + membershipType + '/' : null, fetcher)

    return data
}