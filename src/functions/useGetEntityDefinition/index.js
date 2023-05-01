import useSWRImmutable from 'swr/immutable'
import getHeaders from '../useGetHeaders'

export default function useGetEntityDefinition(entityType, hashIdentifier) {
    const header = getHeaders(false)

    const fetcher = (url) => fetch(url, { headers: header }).then((res) => res.json())

    const { data, error } = useSWRImmutable('https://www.bungie.net/Platform/Destiny2/Manifest/' + entityType + '/' + hashIdentifier + '/', fetcher )

    return data
}