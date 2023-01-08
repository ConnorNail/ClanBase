import useSWR from 'swr'
import getHeaders from '../../getHeaders'

export default function getAllCharacterStats(playerProfiles) {
    const header = getHeaders(false)
    
    const getKey = () => {
        let keys = []
        if (playerProfiles) {
            for (let i = 0; i < playerProfiles.length; i++) {
                const characters = playerProfiles[i]?.Response?.characters?.data
                const characterIds = playerProfiles[i]?.Response?.profile?.data?.characterIds
                const characterCount = characterIds.length
                const membershipId = playerProfiles[i]?.Response?.profile?.data?.userInfo?.membershipId
                const membershipType = playerProfiles[i]?.Response?.profile?.data?.userInfo?.membershipType
                // console.log(characterIds)

                // Add dates ******************************************************************************************
                characterIds.forEach ((characterId) => {
                    console.log(characters[characterId])
                    keys.push('https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Account/' + membershipId + '/Character/' + characterId + '/Stats/?periodType=Daily&groups=1&dayend=' + set[1] + '&daystart=' + set[0])
                })
                
            //     const membershipType = playerData?.Response?.results[i]?.destinyUserInfo?.membershipType
            //     const membershipId = playerData?.Response?.results[i]?.destinyUserInfo?.membershipId

            //     keys.push('https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Profile/' + membershipId + '/?components=100,200,1100')
            }
            return keys
        }
        return null
    }

    const { data, error } = useSWR(getKey, (keys) =>
        Promise.all(keys.map((key) => fetch(key, { headers: header }).then((res) => res.json())))
    )

    return data

    
    // const [data, setData] = useState([]);

    // // Clear states on route change
    // const dynamicRoute = router.asPath;
    // useEffect(() => setData([]), [dynamicRoute]);

    // const statDataStructure = {
    //     playerStats: {
    //         allPvE: {
    //             daily: []
    //         },
    //         allPvECompetitive: {
    //             daily: []
    //         },
    //         allPvP: {
    //             daily: []
    //         },
    //         allStrikes: {
    //             daily: []
    //         },
    //         patrol: {
    //             daily: []
    //         },
    //         raid: {
    //             daily: []
    //         },
    //         story: {
    //             daily: []
    //         }
    //     }
    // }

    // useEffect(() => {
    //     // Establish the object structure
    //     inputData.map((member, i, array) => {
    //         array[i] = { ...member, ...statDataStructure }
    //     })

    //     async function getData() {
    //         let fetches = [];

    //         inputData.map((member, i, array) => {
    //             const membershipId = member.destinyUserInfo.membershipId;
    //             const membershipType = member.destinyUserInfo.membershipType;
    //             const characterIDs = member.playerProfile.profile.data.characterIds;

    //             // Collect data for first character
    //             let fullData = member;
    //             characterIDs.map((characterID) => {
    //                 dates.map((set) => {
    //                     fetches.push(fetch('https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Account/' + membershipId + '/Character/' + characterID + '/Stats/?periodType=Daily&groups=1&dayend=' + set[1] + '&daystart=' + set[0], { headers })
    //                         .then((res) => res.json())
    //                         .then((data) => { return { playerStats: data.Response } })
    //                         .then((data) => {
    //                             // Push each element in the old data into the new before replacing old data
    //                             mergeData(fullData, data)

    //                             // Combine the data. fullData remembers between iterations
    //                             fullData = { ...fullData, ...data }
    //                             array[i] = fullData
    //                             console.log("update stats")
    //                         })
    //                         .catch((error) => {
    //                             console.error('Error:', error);
    //                         })
    //                 )})
    //             })
    //         })
            
    //         // Run all promises
    //         await Promise.all(fetches)
    //         setData(inputData)

    //     }
    //     getData()

    // }, [inputData, headers, dynamicRoute])

    // return data
}

function mergeData(baseData, newData) {
    // If data exists add it to the object
    // allPvE
    if (typeof baseData?.playerStats?.allPvE?.daily != 'undefined' && typeof newData?.playerStats?.allPvE?.daily != 'undefined') {
        baseData.playerStats.allPvE.daily.forEach((element) => newData.playerStats.allPvE.daily.push(element))
    } else {
        newData.playerStats.allPvE.daily = baseData.playerStats.allPvE.daily
    }

    // allPvECompetitive
    if (typeof baseData?.playerStats?.allPvECompetitive?.daily != 'undefined' && typeof newData?.playerStats?.allPvECompetitive?.daily != 'undefined') {
        baseData.playerStats.allPvECompetitive.daily.forEach((element) => newData.playerStats.allPvECompetitive.daily.push(element))
    } else {
        newData.playerStats.allPvECompetitive.daily = baseData.playerStats.allPvECompetitive.daily
    }

    // allPvP
    if (typeof baseData?.playerStats?.allPvP?.daily != 'undefined' && typeof newData?.playerStats?.allPvP?.daily != 'undefined') {
        baseData.playerStats.allPvP.daily.forEach((element) => newData.playerStats.allPvP.daily.push(element))
    } else {
        newData.playerStats.allPvP.daily = baseData.playerStats.allPvP.daily
    }

    // allStrikes
    if (typeof baseData?.playerStats?.allStrikes?.daily != 'undefined' && typeof newData?.playerStats?.allStrikes?.daily != 'undefined') {
        baseData.playerStats.allStrikes.daily.forEach((element) => newData.playerStats.allStrikes.daily.push(element))
    } else {
        newData.playerStats.allStrikes.daily = baseData.playerStats.allStrikes.daily
    }

    // patrol
    if (typeof baseData?.playerStats?.patrol?.daily != 'undefined' && typeof newData?.playerStats?.patrol?.daily != 'undefined') {
        baseData.playerStats.patrol.daily.forEach((element) => newData.playerStats.patrol.daily.push(element))
    } else {
        newData.playerStats.patrol.daily = baseData.playerStats.patrol.daily
    }

    // raid
    if (typeof baseData?.playerStats?.raid?.daily != 'undefined' && typeof newData?.playerStats?.raid?.daily != 'undefined') {
        baseData.playerStats.raid.daily.forEach((element) => newData.playerStats.raid.daily.push(element))
    } else {
        newData.playerStats.raid.daily = baseData.playerStats.raid.daily
    }

    // story
    if (typeof baseData?.playerStats?.story?.daily != 'undefined' && typeof newData?.playerStats?.story?.daily != 'undefined') {
        baseData.playerStats.story.daily.forEach((element) => newData.playerStats.story.daily.push(element))
    } else {
        newData.playerStats.story.daily = baseData.playerStats.story.daily
    }
}