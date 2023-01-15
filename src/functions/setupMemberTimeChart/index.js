export default function setupMemberTimeChart(memberTimeData) {

    if (memberTimeData) {

        let cleanDataPvE = []
        let cleanDataPvP = []

        // For each member
        for (let i = 0; i < memberTimeData.length; i++) {
            cleanDataPvE.push(memberTimeData[i]?.characterTime?.daily?.allPvE)
            cleanDataPvP.push(memberTimeData[i]?.characterTime?.daily?.allPvP)
        }

        return [cleanDataPvE, cleanDataPvP]
    }

    return [ null, null ]
}