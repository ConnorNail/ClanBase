import useSWR from 'swr'
import getHeaders from '../getHeaders'

export default function getClanEngramMilestone(milestoneHash) {
    const header = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, error } = useSWR(milestoneHash ? 'https://www.bungie.net/Platform/Destiny2/Manifest/DestinyMilestoneDefinition/' + milestoneHash + '/' : null, fetcher )

    return data
}