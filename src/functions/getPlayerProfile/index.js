import useSWR from 'swr'
import getHeaders from '../getHeaders'

export default function getPlayerProfile(membershipId, membershipType) {
    const headers = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: headers }).then((res) => res.json())

    const { data, error } = useSWR(membershipId && membershipType ? 'https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Profile/' + membershipId + '/?components=200' : null, fetcher)

    return data
}