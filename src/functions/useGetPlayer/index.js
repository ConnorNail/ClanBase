import useSWRMutation from 'swr'
import getHeaders from '../useGetHeaders'

export default function useGetPlayer(name) {
    const header = getHeaders(false)

    async function updateUser(url, { arg }) {
        return fetch(url, {
            method: 'post',
            headers: header,
            body: JSON.stringify({
                'displayNamePrefix': arg
            })
        }).then((res) => res.json())
    }

    const { data, error, trigger } = useSWRMutation('https://www.bungie.net/Platform/User/Search/GlobalName/0/', updateUser)

    return [data, trigger]
}