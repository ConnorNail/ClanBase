import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useGetClanBannerItem(clanBannerHash) {
    const header = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, error } = useSWR(clanBannerHash ? 'https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/' + clanBannerHash + '/' : null, fetcher )

    return data
}