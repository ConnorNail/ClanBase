import useSWR from 'swr'

export default function usePostClanScores(clanId, playtimePvE, activitiesCompletedPvE, averageStrikeDuration, KDPvE, raidsCompleted, playtimePvP, activitiesCompletedPvP, combatRating, winPercentage, flawlessCards, clanScorePvE, clanScorePvP) {

    const fetcher = (url) => fetch(url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            'clanId': clanId,
            'playtimePvE': playtimePvE.toString(),
            'activitiesCompletedPvE': activitiesCompletedPvE,
            'averageStrikeDuration': averageStrikeDuration,
            'KDPvE': KDPvE,
            'raidsCompleted': raidsCompleted,
            'playtimePvP': playtimePvP.toString(),
            'activitiesCompletedPvP': activitiesCompletedPvP,
            'combatRating': combatRating,
            'winPercentage': winPercentage,
            'flawlessCards': flawlessCards,
            'clanScorePvE': clanScorePvE,
            'clanScorePvP': clanScorePvP
        })
    }).then((res) => res.json())

    const { data, error } = useSWR(clanScorePvP ? window.location.origin + '/api/ClanScores' : null, fetcher)

    return data
}