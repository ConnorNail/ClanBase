import useSWRImmutable from 'swr/immutable'
import getHeaders from '../useGetHeaders'

export default function useGetAdminsAndFounderOfGroup( clanid ) {
    const headers = getHeaders(false)

    const fetcher = ([url, header]) => fetch(url, {headers: header}).then((res) => res.json())

    const { data, error } = useSWRImmutable( clanid ?  ['https://www.bungie.net/Platform/GroupV2/' + clanid + '/AdminsAndFounder/', headers] : null, fetcher )

    return data
}