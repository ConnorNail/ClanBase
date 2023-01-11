import useSWR from 'swr'
import getHeaders from '../getHeaders'

export default function getClanBannerPerks(clanBannerItem) {
    const header = getHeaders(false)

    const getKey = () => {
        let keys = []
        if (clanBannerItem) {
            for (let i = 0; i < clanBannerItem?.Response?.sockets?.socketEntries.length; i++) {
                const itemHash = clanBannerItem?.Response?.sockets?.socketEntries[i]?.singleInitialItemHash

                keys.push('https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/' + itemHash + '/')
            }
            return keys
        }
        return null
    }

    const { data, error } = useSWR(getKey, (keys) =>
        Promise.all(keys.map((key) => fetch(key, { headers: header }).then((res) => res.json())))
    )

    return data
}