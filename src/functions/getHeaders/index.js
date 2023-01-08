import { useSession, signIn } from "next-auth/react"

export default function getHeaders(authNeeded) {
    const { data: session } = useSession()
    let headers = {}

    if (session) {
        headers = {
            'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
            'Authorization': 'Bearer ' + session.accessToken
        }
    } else {
        if (authNeeded) {
            signIn('bungie')
            // Do something here to have the user sign in
        }

        headers = {
            'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY
        }
    }

    return headers;
}