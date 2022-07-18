export default  function formatTotalTime(data) {
    data.map((profile) => {
        // allPvE
        const allPvEDays = profile?.playerStats?.allPvE?.daily;

        // Sum all days
        let allPvETime = 0;
        allPvEDays.forEach((day) => {
            allPvETime += day.values.totalActivityDurationSeconds.basic.value;
        })

        // Add to data object
        profile.playerStats.allPvE.totalTime = allPvETime

        
        // allPvECompetitive
        const allPvECompetitiveDays = profile?.playerStats?.allPvECompetitive?.daily;

        // Sum all days
        let allPvECompetitiveTime = 0;
        allPvECompetitiveDays.forEach((day) => {
            allPvECompetitiveTime += day.values.totalActivityDurationSeconds.basic.value;
        })

        // Add to data object
        profile.playerStats.allPvECompetitive.totalTime = allPvECompetitiveTime


        // allPvP
        const allPvPDays = profile?.playerStats?.allPvP?.daily;

        // Sum all days
        let allPvPTime = 0;
        allPvPDays.forEach((day) => {
            allPvPTime += day.values.totalActivityDurationSeconds.basic.value;
        })

        // Add to data object
        profile.playerStats.allPvP.totalTime = allPvPTime


        // allStrikes
        const allStrikesDays = profile?.playerStats?.allStrikes?.daily;

        // Sum all days
        let allStrikesTime = 0;
        allStrikesDays.forEach((day) => {
            allStrikesTime += day.values.totalActivityDurationSeconds.basic.value;
        })

        // Add to data object
        profile.playerStats.allStrikes.totalTime = allStrikesTime


        // patrol
        const patrolDays = profile?.playerStats?.patrol?.daily;

        // Sum all days
        let patrolTime = 0;
        patrolDays.forEach((day) => {
            patrolTime += day.values.totalActivityDurationSeconds.basic.value;
        })

        // Add to data object
        profile.playerStats.patrol.totalTime = patrolTime


        // raid
        const raidDays = profile?.playerStats?.raid?.daily;

        // Sum all days
        let raidTime = 0;
        raidDays.forEach((day) => {
            raidTime += day.values.totalActivityDurationSeconds.basic.value;
        })

        // Add to data object
        profile.playerStats.raid.totalTime = raidTime


        // story
        const storyDays = profile?.playerStats?.story?.daily;

        // Sum all days
        let storyTime = 0;
        storyDays.forEach((day) => {
            storyTime += day.values.totalActivityDurationSeconds.basic.value;
        })

        // Add to data object
        profile.playerStats.story.totalTime = storyTime


        // Total time
        let totalTime = allPvETime + allPvECompetitiveTime + allPvPTime + allStrikesTime + patrolTime + raidTime + storyTime;

        // Add to data object
        profile.playerStats.totalTime = totalTime
    })

    return data
}