export default function calcMemberSeasonalTime(allCharacterStats, playerProfiles, playerInfo) {

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

            const characterTime = mergeCharacters(characterArray)

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

function mergeCharacters(characterArray) {

    let totalTime = {
        allTime: 0,
        allPvE: 0,
        allPvECompetitive: 0,
        allPvP: 0,
        allStrikes: 0,
        patrol: 0,
        raid: 0,
        story: 0
    }

    for (let i = 0; i < characterArray.length; i++) {
        const activitiesPvE = characterArray[i]?.Response?.allPvE?.daily
        if (activitiesPvE) {
            for (let j = 0; j < activitiesPvE.length; j++) {
                totalTime.allPvE += activitiesPvE[j]?.values?.totalActivityDurationSeconds?.basic?.value
            }
        }

        const activitiesPvECompetitive = characterArray[i]?.Response?.allPvECompetitive?.daily
        if (activitiesPvECompetitive) {
            for (let j = 0; j < activitiesPvECompetitive.length; j++) {
                totalTime.allPvECompetitive += activitiesPvECompetitive[j]?.values?.totalActivityDurationSeconds?.basic?.value
            }
        }

        const activitiesPvP = characterArray[i]?.Response?.allPvP?.daily
        if (activitiesPvP) {
            for (let j = 0; j < activitiesPvP.length; j++) {
                totalTime.allPvP += activitiesPvP[j]?.values?.totalActivityDurationSeconds?.basic?.value
            }
        }

        const activitiesStrikes = characterArray[i]?.Response?.allStrikes?.daily
        if (activitiesStrikes) {
            for (let j = 0; j < activitiesStrikes.length; j++) {
                totalTime.allStrikes += activitiesStrikes[j]?.values?.totalActivityDurationSeconds?.basic?.value
            }
        }

        const activitiesPatrol = characterArray[i]?.Response?.patrol?.daily
        if (activitiesPatrol) {
            for (let j = 0; j < activitiesPatrol.length; j++) {
                totalTime.patrol += activitiesPatrol[j]?.values?.totalActivityDurationSeconds?.basic?.value
            }
        }

        const activitiesRaid = characterArray[i]?.Response?.raid?.daily
        if (activitiesRaid) {
            for (let j = 0; j < activitiesRaid.length; j++) {
                totalTime.raid += activitiesRaid[j]?.values?.totalActivityDurationSeconds?.basic?.value
            }
        }

        const activitiesStory = characterArray[i]?.Response?.story?.daily
        if (activitiesStory) {
            for (let j = 0; j < activitiesStory.length; j++) {
                totalTime.story += activitiesStory[j]?.values?.totalActivityDurationSeconds?.basic?.value
            }
        }
    }

    totalTime.allTime = totalTime.allPvE + totalTime.allPvP

    return totalTime
}