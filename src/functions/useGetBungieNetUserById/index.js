import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useGetBungieNetUserById(id) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: headers }).then((res) => res.json())

    const { data, error } = useSWR(id ? 'https://www.bungie.net/Platform/User/GetBungieNetUserById/' + id + '/' : null, fetcher)

    return data
}