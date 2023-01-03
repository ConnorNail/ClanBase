import useSWR from 'swr'

export default function getClanMembersAllTimeStats(playerData) {
    const header = { 'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY }

    const getKey = () => {
        let keys = []
        if (playerData) {
            for (let i = 0; i < playerData?.Response?.results.length; i++) {
                const membershipType = playerData?.Response?.results[i]?.destinyUserInfo?.membershipType
                const membershipId = playerData?.Response?.results[i]?.destinyUserInfo?.membershipId

                keys.push('https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Account/' + membershipId + '/Stats')
            }
            return keys
        }
        return null
    }

    const { data } = useSWR(getKey, (keys) =>
        Promise.all(keys.map((key) => fetch(key, { headers: header }).then((res) => res.json())))
    )

    return data
}