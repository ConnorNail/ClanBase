import useSWRImmutable from 'swr/immutable'
import getHeaders from '../useGetHeaders'

export default function useGetClanInfoImut( clanid ) {
    const headers = getHeaders(false)

    const fetcher = ([url, header]) => fetch(url, {headers: header}).then((res) => res.json())

    const { data, error } = useSWRImmutable( clanid ?  ['https://www.bungie.net/Platform/GroupV2/' + clanid + '/', headers] : null, fetcher )

    return data
}