import useSWRImmutable from 'swr/immutable'
import getHeaders from '../getHeaders'

export default function getAvailableLocales() {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, {headers: headers}).then((res) => res.json())

    const { data, error } = useSWRImmutable( 'https://www.bungie.net/Platform/GetAvailableLocales/', fetcher )

    return data
}