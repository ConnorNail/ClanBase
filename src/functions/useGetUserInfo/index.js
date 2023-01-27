import useSWRImmutable from 'swr/immutable'
import getHeaders from '../useGetHeaders'

export default function useGetUserInfo(status) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: headers }).then((res) => res.json())

    const { data, error } = useSWRImmutable(status == 'authenticated' ? 'https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/' : null, fetcher)

    return data
}