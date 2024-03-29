import useSWR from 'swr'
import getHeaders from '../../useGetHeaders'

export default function useGetClanMemberInfo(clanid) {
    const header = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, mutate } = useSWR(clanid ? 'https://www.bungie.net/Platform/GroupV2/' + clanid + '/Members' : null, fetcher )

    return { data, mutate }
}