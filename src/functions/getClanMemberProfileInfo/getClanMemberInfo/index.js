import useSWR from 'swr'

export default function getClanMemberInfo(clanid) {
    const header = { 'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY }

    const fetcher = (url) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, error } = useSWR(clanid ? 'https://www.bungie.net/Platform/GroupV2/' + clanid + '/Members' : null, fetcher )

    return data
}