import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useGetActivityIcon( hashId ) {
    const headers = getHeaders(false)

    const fetcher = ([url, header]) => fetch(url, {headers: header}).then((res) => res.json())

    const { data, error } = useSWR(hashId ? ['https://www.bungie.net/Platform/Destiny2/Manifest/DestinyActivityModeDefinition/' + hashId + '/', headers] : null, fetcher )

    return data
}