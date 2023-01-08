import useSWR from 'swr'
import getHeaders from '../../getHeaders'

export default function getSeasonInfo(seasonHash) {
    const headers = getHeaders(false)

    const fetcher = ([url, header]) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, error } = useSWR(seasonHash ? ['https://www.bungie.net/Platform/Destiny2/Manifest/DestinySeasonDefinition/' + seasonHash + '/', headers] : null, fetcher )

    return data
}