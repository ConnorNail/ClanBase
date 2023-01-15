export default function calcMemberSeasonalActivityTime(allCharacterStats, playerProfiles, playerInfo) {

    if (allCharacterStats?.data && playerProfiles) {
        const characterCountArray = allCharacterStats?.characterCountArray
        const dateCount = allCharacterStats?.dateCount
        const data = allCharacterStats?.data

        let results = []

        // For each member
        let memberIndex = 0
        let characterIndex = 0
        while (memberIndex < characterCountArray.length) {

            const memberProfile = playerProfiles[memberIndex]?.Response?.profile
            const characterProfiles = playerProfiles[memberIndex]?.Response?.characters
            const bungieInfo = playerInfo?.Response?.results[memberIndex]?.bungieNetUserInfo


            let characterArray = []
            // For each character
            for (let j = 0; j < characterCountArray[memberIndex] * dateCount; j++) {
                const character = data[characterIndex + j]
                characterArray.push(character)
            }

            const characterTime = mergeCharacters(characterArray, memberIndex)

            const entry = {
                memberProfile,
                characterProfiles,
                bungieInfo,
                characterTime
            }

            results.push(entry)

            characterIndex += characterCountArray[memberIndex] * dateCount
            memberIndex++
        }

        return results
    }
    return null
}

function mergeCharacters(characterArray, memberIndex) {

    let totalTime = {
        seasonal: {
            allTime: 0,
            allPvE: 0,
            allPvECompetitive: 0,
            allPvP: 0,
            allStrikes: 0,
            patrol: 0,
            raid: 0,
            story: 0
        },
        daily: {
            allPvE: [],
            allPvECompetitive: [],
            allPvP: [],
            allStrikes: [],
            patrol: [],
            raid: [],
            story: []
        }
    }

    for (let i = 0; i < characterArray.length; i++) {
        if (characterArray[i]?.Response) {
            Object.keys(characterArray[i]?.Response).forEach(key => {
                const activities = characterArray[i]?.Response[key]?.daily
                if (activities) {
                    for (let j = 0; j < activities.length; j++) {
                        // Date is converted to mm/dd/yyy for convenience in chart later
                        const tempDate = new Date(activities[j]?.period)
                        const date = ((tempDate.getMonth() > 8) ? (tempDate.getMonth() + 1) : ('0' + (tempDate.getMonth() + 1))) + '/' + ((tempDate.getDate() > 9) ? tempDate.getDate() : ('0' + tempDate.getDate())) + '/' + tempDate.getFullYear()

                        totalTime.seasonal[key] += activities[j]?.values?.secondsPlayed?.basic?.value
                        // Converted to hours for convenience in chart later
                        totalTime.daily[key].push({ date: date, time: (activities[j]?.values?.secondsPlayed?.basic?.value / 60 / 60).toFixed(2) })
                    }
                }
            });
        }
    }

    // Calculate total time in the season
    totalTime.seasonal.allTime = totalTime.seasonal.allPvE + totalTime.seasonal.allPvP

    // Sort each daily array
    Object.keys(totalTime.daily).forEach(key => {
        totalTime.daily[key].sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
    });

    return totalTime
}