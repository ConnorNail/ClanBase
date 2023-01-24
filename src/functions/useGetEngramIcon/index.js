import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useGetEngramIcon(itemHash) {
    const header = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, error } = useSWR(itemHash ? 'https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/' + itemHash + '/' : null, fetcher )

    return data
}