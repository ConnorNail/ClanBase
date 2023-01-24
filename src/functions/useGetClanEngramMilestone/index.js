import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useGetClanEngramMilestone(milestoneHash) {
    const header = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, error } = useSWR(milestoneHash ? 'https://www.bungie.net/Platform/Destiny2/Manifest/DestinyMilestoneDefinition/' + milestoneHash + '/' : null, fetcher )

    return data
}