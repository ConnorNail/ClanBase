import useSWR from 'swr'
import getHeaders from '../../useGetHeaders'

export default function useGetCurrentSeasonHash() {
    const headers = getHeaders(false)

    const fetcher = ([url, header]) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, error } = useSWR(['https://www.bungie.net/Platform/Settings/', headers], fetcher )

    return data?.Response?.destiny2CoreSettings?.currentSeasonHash
}