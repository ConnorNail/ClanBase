import { useEffect, useState } from 'react'
import getHeaders from '../useGetHeaders'

export default function useGetAllMembersFullProfile(playerData) {
    const header = getHeaders(false)
    const [data, setData] = useState(null)

    const getKey = () => {
        let keys = []
        if (playerData) {
            for (let i = 0; i < playerData?.Response?.results.length; i++) {
                const membershipType = playerData?.Response?.results[i]?.destinyUserInfo?.membershipType
                const membershipId = playerData?.Response?.results[i]?.destinyUserInfo?.membershipId

                keys.push('https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Profile/' + membershipId + '/?components=100,200,800,900,1100,1300,1400')
            }
            return keys
        }
        return null
    }

    useEffect(() => {
        setData(null)
        const keys = getKey()

        const callData = async () => {
            if (keys) {
                const fetchedData = await Promise.all(keys.map((key) => fetch(key, { headers: header }).then((res) => res.json())))
                setData(fetchedData)
            }
        }

        callData()
    }, [playerData])

    return data
}