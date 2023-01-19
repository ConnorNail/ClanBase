import useSWR from 'swr'
import getHeaders from '../getHeaders'

export default function getBungieNetUserById(id) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: headers }).then((res) => res.json())

    const { data, error } = useSWR(id ? 'https://www.bungie.net/Platform/User/GetBungieNetUserById/' + id + '/' : null, fetcher)

    return data
}