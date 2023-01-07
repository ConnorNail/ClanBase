import useSWR from 'swr'
import { useSession, signIn, signOut } from "next-auth/react"

export default function getClanInfo( clanid ) {
    const { data: session } = useSession()
    
    const headers = {'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY, 'Authorization': 'Bearer ' + session.accessToken}

    const fetcher = ([url, header]) => fetch(url, {headers: header}).then((res) => res.json())

    const { data, error } = useSWR( clanid ?  ['https://www.bungie.net/Platform/GroupV2/' + clanid + '/', headers] : null, fetcher )

    return data
}