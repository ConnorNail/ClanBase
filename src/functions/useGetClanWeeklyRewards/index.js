import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useGetClanWeeklyRewards(clanId) {
    const header = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, error } = useSWR(clanId ? 'https://www.bungie.net/Platform/Destiny2/Clan/' + clanId + '/WeeklyRewardState/' : null, fetcher, { revalidateOnFocus: true, refreshInterval: 60000 } )

    return data
}