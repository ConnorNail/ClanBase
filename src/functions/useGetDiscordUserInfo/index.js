import useSWR from 'swr'

export default function useGetDiscordUserInfo( token ) {

    const fetcher = (url) => fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then((res) => res.json())

    const { data, error } = useSWR( token ?  'https://discord.com/api/users/@me' : null, fetcher)

    return data
}