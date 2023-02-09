import useGetDiscordMembers from "../useGetDiscordMembers"


export default function useCalcDiscordTimeData(memberSeasonalTime) {

    const discordMembers = useGetDiscordMembers(memberSeasonalTime)

    if (memberSeasonalTime && discordMembers) {
        // Merge discord and destiny data
        for (let i = 0; i < memberSeasonalTime.length; i++) {
            memberSeasonalTime[i].discord = discordMembers[i].member
        }

        return memberSeasonalTime
    }

    return null
}