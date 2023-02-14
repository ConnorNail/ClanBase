import { useEffect, useState } from 'react'
import useSWR from 'swr'
import getHeaders from '../../useGetHeaders'

export default function useGetAllCharacterStats(playerProfiles, dateArray) {
    const header = getHeaders(false)
    const [data, setData] = useState(null)
    const [characterCountArray, setCharacterCountArray] = useState([])
    const [dateCount, setDateCount] = useState(0)

    // let characterCountArray = []
    // let dateCount = 0

    // console.log(playerProfiles)

    const getKey = () => {
        let keys = []

        if (playerProfiles) {
            characterCountArray = []
            for (let i = 0; i < playerProfiles.length; i++) {

                if (playerProfiles[i]?.Response) {
                    const characterIds = playerProfiles[i]?.Response?.profile?.data?.characterIds
                    const characterCount = characterIds.length
                    const membershipId = playerProfiles[i]?.Response?.profile?.data?.userInfo?.membershipId
                    const membershipType = playerProfiles[i]?.Response?.profile?.data?.userInfo?.membershipType

                    // characterCountArray.push(characterCount)
                    setCharacterCountArray(characterCountArray => [...characterCountArray, characterCount])
                    // dateCount = dateArray.length
                    setDateCount(dateArray.length)

                    for (let j = 0; j < dateArray.length; j++) {
                        characterIds.forEach((characterId) => {
                            keys.push('https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Account/' + membershipId + '/Character/' + characterId + '/Stats/?periodType=Daily&groups=1&dayend=' + dateArray[j][1] + '&daystart=' + dateArray[j][0])
                        })
                    }
                } else {
                    characterCountArray.push(0)
                }
            }

            return keys
        }
        return null
    }

    // const { data, error } = useSWR(getKey, (keys) =>
    //     Promise.all(keys.map((key) => fetch(key, { headers: header }).then((res) => res.json())))
    // )

    useEffect(() => {
        const keys = getKey()

        const callData = async () => {
            if (keys) {
                const fetchedData = await Promise.all(keys.map((key) => fetch(key, { headers: header }).then((res) => res.json())))
                setData(fetchedData)
            }
        }

        callData()
    }, [playerProfiles])

    return { data: data, characterCountArray: characterCountArray, dateCount: dateCount }
}