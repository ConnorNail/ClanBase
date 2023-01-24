import { useSession, signIn } from "next-auth/react"

export default function useGetHeaders(authNeeded) {
    const { data, status } = useSession()
    let headers = {}

    if (status == 'authenticated') {
        headers = {
            'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
            'Authorization': 'Bearer ' + data.accessToken
        }
    } else {
        headers = {
            'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY
        }
    }

    if (authNeeded && status == 'unauthenticated') {
        console.log('need to authenticate')
        signIn('bungie')
    }

    return headers;
}