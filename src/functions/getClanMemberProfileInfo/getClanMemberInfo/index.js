import useSWR from 'swr'
import getHeaders from '../../getHeaders'

export default function getClanMemberInfo(clanid) {
    const header = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, mutate } = useSWR(clanid ? 'https://www.bungie.net/Platform/GroupV2/' + clanid + '/Members' : null, fetcher )

    return { data, mutate }
}