import { useEffect, useState } from 'react'
import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useGetClanMembersAllTimeStats(playerData) {
    const header = getHeaders(false)
    const [data, setData] = useState(null)

    const getKey = () => {
        let keys = []
        if (playerData) {
            for (let i = 0; i < playerData?.Response?.results.length; i++) {
                const membershipType = playerData?.Response?.results[i]?.destinyUserInfo?.membershipType
                const membershipId = playerData?.Response?.results[i]?.destinyUserInfo?.membershipId

                keys.push('https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Account/' + membershipId + '/Character/0/Stats/')
            }
            return keys
        }
        return null
    }

    // const { data } = useSWR(getKey, (keys) =>
    //     Promise.all(keys.map((key) => fetch(key, { headers: header }).then((res) => res.json())))
    // )

    useEffect(() => {
        const keys = getKey()

        const callData = async () => {
            if (keys) {
                const fetchedData = await Promise.all(keys.map((key) => fetch(key, { headers: header }).then((res) => res.json()).catch((err) => err)))
                setData(fetchedData)
            } else {
                setData(null)
            }
        }

        callData()
    }, [])

    return data
}