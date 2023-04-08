import useSWRImmutable from 'swr/immutable'

export default function useGetManifestComponents(manifest) {
    const baseURL = 'https://www.bungie.net'

    const destinyRecordDefinitionURL = manifest ? manifest?.Response?.jsonWorldComponentContentPaths?.en?.DestinyRecordDefinition : null

    const fetcher = (url) => fetch(url).then((res) => res.json())

    const { data: destinyRecordDefinition } = useSWRImmutable(destinyRecordDefinitionURL ? baseURL + destinyRecordDefinitionURL : null, fetcher )

    return { destinyRecordDefinition }
}