import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useGetAdminsAndFounderOfGroup( clanid ) {
    const headers = getHeaders(false)

    const fetcher = ([url, header]) => fetch(url, {headers: header}).then((res) => res.json())

    const { data, error } = useSWR( clanid ?  ['https://www.bungie.net/Platform/GroupV2/' + clanid + '/AdminsAndFounder/', headers] : null, fetcher, { revalidateOnFocus: true, refreshInterval: 60000 } )

    return data
}