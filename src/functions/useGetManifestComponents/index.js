import useSWRImmutable from 'swr/immutable'

export default function useGetManifestComponents(manifest, componentName) {
    const baseURL = 'https://www.bungie.net'

    const destinyComponentDefinitionURL = manifest ? manifest?.Response?.jsonWorldComponentContentPaths?.en[componentName] : null

    const fetcher = (url) => fetch(url).then((res) => res.json())

    const { data: destinyDefinitions } = useSWRImmutable(destinyComponentDefinitionURL ? baseURL + destinyComponentDefinitionURL : null, fetcher )

    return { destinyDefinitions }
}