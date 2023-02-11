import useSWR from 'swr'

export default function useGetClanLeaderboards() {

    const fetcher = (url) => fetch(url).then((res) => res.json())

    const { data, error } = useSWR(typeof window !== "undefined" ? window.location.origin + '/api/ClanLeaderboards' : null, fetcher)

    return data
}