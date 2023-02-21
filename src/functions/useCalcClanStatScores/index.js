import usePostClanScores from "../usePostClanScores";

export default function useCalcClanStatScores(clanMemberStats, clanMemberProfiles, clanId, clanName, clanMemberCount, clanCallsign) {

    // Calculate average clan KD
    const averageClanKD = (stats) => {
        if (stats) {
            let memberCountPvE = stats.length
            let averageKDPvE = 0
            for (let i = 0; i < stats.length; i++) {
                const kdPvE = stats[i]?.Response?.allPvE?.allTime?.killsDeathsRatio?.basic?.value
                if (kdPvE || kdPvE == 0) {
                    averageKDPvE += kdPvE
                } else {
                    memberCountPvE -= 1
                }
            }

            if (memberCountPvE != 0) {
                averageKDPvE = averageKDPvE / memberCountPvE
            } else {
                averageKDPvE = 0
            }

            return averageKDPvE
        }
    };

    // Calculate total number of Flawless cards completed
    const averageClanFlaslessCards = (stats) => {
        if (stats) {
            let memberCount = stats.length
            let clanFlawlessCards = 0
            for (let i = 0; i < stats.length; i++) {
                const flawlessCards = stats[i]?.Response?.metrics?.data?.metrics['1765255052']?.objectiveProgress?.progress
                if (flawlessCards || flawlessCards == 0) {
                    clanFlawlessCards += flawlessCards
                } else {
                    memberCount -= 1
                }
            }

            if (memberCount != 0) {
                clanFlawlessCards = clanFlawlessCards / memberCount
            } else {
                clanFlawlessCards = 0
            }

            return clanFlawlessCards
        }
    }

    // Calculate total raids completed
    const averageClanRaids = (stats) => {
        if (stats) {
            let memberCount = stats.length
            let clanRaids = 0
            for (let i = 0; i < stats.length; i++) {
                const raids = stats[i]?.Response?.raid?.allTime?.activitiesCleared?.basic?.value
                if (raids || raids == 0) {
                    clanRaids += raids
                } else {
                    memberCount -= 1
                }
            }

            if (memberCount != 0) {
                clanRaids = clanRaids / memberCount
            } else {
                clanRaids = 0
            }

            return clanRaids
        }
    }

    // Calculate total playtime
    const averagePlaytime = (stats) => {
        if (stats) {
            let memberCountPvE = stats.length
            let clanPlaytimePvE = 0
            let memberCountPvP = stats.length
            let clanPlaytimePvP = 0
            for (let i = 0; i < stats.length; i++) {
                const playtimePvE = stats[i]?.Response?.allPvE?.allTime?.secondsPlayed?.basic?.value
                const playtimePvP = stats[i]?.Response?.allPvP?.allTime?.secondsPlayed?.basic?.value

                if (playtimePvE || playtimePvE == 0) {
                    clanPlaytimePvE += playtimePvE
                } else {
                    memberCountPvE -= 1
                }
                if (playtimePvP || playtimePvP == 0) {
                    clanPlaytimePvP += playtimePvP
                } else {
                    memberCountPvP -= 1
                }
            }

            if (memberCountPvE != 0) {
                clanPlaytimePvE = clanPlaytimePvE / memberCountPvE
            } else {
                clanPlaytimePvE = 0
            }
            if (memberCountPvP != 0) {
                clanPlaytimePvP = clanPlaytimePvP / memberCountPvP
            } else {
                clanPlaytimePvP = 0
            }

            return [clanPlaytimePvE, clanPlaytimePvP]
        }
    }

    // Calculate total activites completed
    const averageActivitesCleared = (stats) => {
        if (stats) {
            let memberCountPvE = stats.length
            let clanActivitesPvE = 0
            let memberCountPvP = stats.length
            let clanActivitesPvP = 0
            for (let i = 0; i < stats.length; i++) {
                const playtimePvE = stats[i]?.Response?.allPvE?.allTime?.activitiesCleared?.basic?.value
                const playtimePvP = stats[i]?.Response?.allPvP?.allTime?.activitiesEntered?.basic?.value
                if (playtimePvE || playtimePvE == 0) {
                    clanActivitesPvE += playtimePvE
                } else {
                    memberCountPvE -= 1
                }
                if (playtimePvP || playtimePvP == 0) {
                    clanActivitesPvP += playtimePvP
                } else {
                    memberCountPvP -= 1
                }
            }

            if (memberCountPvE != 0) {
                clanActivitesPvE = clanActivitesPvE / memberCountPvE
            } else {
                clanActivitesPvE = 0
            }
            if (memberCountPvP != 0) {
                clanActivitesPvP = clanActivitesPvP / memberCountPvP
            } else {
                clanActivitesPvP = 0
            }

            return [clanActivitesPvE, clanActivitesPvP]
        }
    }

    // Calculated average strike duration
    const averageStrikeDuration = (stats) => {
        if (stats) {
            let averageClanStrikeDuration = 0
            let memberCount = stats.length
            for (let i = 0; i < stats.length; i++) {
                const averageStrikeDuration = stats[i]?.Response?.allStrikes?.allTime?.totalActivityDurationSeconds?.pga?.value
                if (averageStrikeDuration || averageStrikeDuration == 0) {
                    averageClanStrikeDuration += averageStrikeDuration
                } else {
                    memberCount -= 1
                }
            }

            if (memberCount != 0) {
                averageClanStrikeDuration = averageClanStrikeDuration / memberCount
            } else {
                averageClanStrikeDuration = 0
            }

            return averageClanStrikeDuration
        }
    }

    // Calculate average win percentage
    const averageClanWinPercentage = (stats) => {
        if (stats) {
            let memberCount = stats.length
            let averageWP = 0
            for (let i = 0; i < stats.length; i++) {
                const activitiesEntered = stats[i]?.Response?.allPvP?.allTime?.activitiesEntered?.basic?.value
                const activitesWon = stats[i]?.Response?.allPvP?.allTime?.activitiesWon?.basic?.value
                if ((activitiesEntered && activitesWon) || (activitiesEntered == 0 && activitesWon) || (activitiesEntered && activitesWon == 0) || (activitiesEntered == 0 && activitesWon == 0)) {
                    averageWP += activitesWon / activitiesEntered
                } else {
                    memberCount -= 1
                }
            }

            if (memberCount != 0) {
                averageWP = averageWP / memberCount
            } else {
                averageWP = 0
            }
            
            return averageWP
        }
    };

    // Calculate average combat rating
    const averageCombatRating = (stats) => {
        if (stats) {
            let memberCount = stats.length
            let averageCR = 0
            for (let i = 0; i < stats.length; i++) {
                const combatRating = stats[i]?.Response?.allPvP?.allTime?.combatRating?.basic?.value
                if (combatRating || combatRating == 0) {
                    averageCR += combatRating
                } else {
                    memberCount -= 1
                }
            }

            if (memberCount != 0) {
                averageCR = averageCR / memberCount
            } else {
                averageCR = 0
            }

            return averageCR
        }
    };

    const normals = {
        PvE: {
            playtime: 2119145,
            activitiesCompleted: 1164,
            averageStrikeDuration: 937,
            KD: 34.68,
            raidsCompleted: 47
        },
        PvP: {
            playtime: 474459,
            activitiesCompleted: 906,
            combatRating: 108,
            winPercentage: 0.4721,
            flawlessCards: 4
        }
    }

    const weights = {
        PvE: {
            playtime: 0.2,
            activitiesCompleted: 0.3,
            averageStrikeDuration: 0.2,
            KD: 0.25,
            raidsCompleted: 0.05
        },
        PvP: {
            playtime: 0.2,
            activitiesCompleted: 0.2,
            combatRating: 0.3,
            winPercentage: 0.25,
            flawlessCards: 0.05
        }
    }

    const baseline = 1000

    let clanScore = {}
    let perMemberStats = {}
    if (clanMemberStats && clanMemberProfiles) {
        perMemberStats = {
            PvE: {
                playtime: averagePlaytime(clanMemberStats)[0],
                activitiesCompleted: averageActivitesCleared(clanMemberStats)[0],
                averageStrikeDuration: averageStrikeDuration(clanMemberStats),
                KD: averageClanKD(clanMemberStats),
                raidsCompleted: averageClanRaids(clanMemberStats)
            },
            PvP: {
                playtime: averagePlaytime(clanMemberStats)[1],
                activitiesCompleted: averageActivitesCleared(clanMemberStats)[1],
                combatRating: averageCombatRating(clanMemberStats),
                winPercentage: averageClanWinPercentage(clanMemberStats),
                flawlessCards: averageClanFlaslessCards(clanMemberProfiles)
            }
        }
        
        const normalizedStats = {
            PvE: {
                playtime: perMemberStats?.PvE?.playtime / normals?.PvE?.playtime,
                activitiesCompleted: perMemberStats?.PvE?.activitiesCompleted / normals?.PvE?.activitiesCompleted,
                averageStrikeDuration: perMemberStats?.PvE?.averageStrikeDuration ? 1 / (perMemberStats?.PvE?.averageStrikeDuration / normals?.PvE?.averageStrikeDuration) : 0,
                KD: perMemberStats?.PvE?.KD / normals?.PvE?.KD,
                raidsCompleted: perMemberStats?.PvE?.raidsCompleted / normals?.PvE?.raidsCompleted
            },
            PvP: {
                playtime: perMemberStats?.PvP?.playtime / normals?.PvP?.playtime,
                activitiesCompleted: perMemberStats?.PvP?.activitiesCompleted / normals?.PvP?.activitiesCompleted,
                combatRating: perMemberStats?.PvP?.combatRating / normals?.PvP?.combatRating,
                winPercentage: perMemberStats?.PvP?.winPercentage / normals?.PvP?.winPercentage,
                flawlessCards: perMemberStats?.PvP?.flawlessCards / normals?.PvP?.flawlessCards
            }
        }

        const memberWeight = clanMemberCount ? Math.log10(clanMemberCount + 11.1111) - 1.04576 : 0

        clanScore = {
            PvE: (normalizedStats?.PvE?.playtime * weights?.PvE?.playtime + normalizedStats?.PvE?.activitiesCompleted * weights?.PvE?.activitiesCompleted + normalizedStats?.PvE?.averageStrikeDuration * weights?.PvE?.averageStrikeDuration + normalizedStats?.PvE?.KD * weights?.PvE?.KD + normalizedStats?.PvE?.raidsCompleted * weights?.PvE?.raidsCompleted) * memberWeight * baseline,
            PvP: (normalizedStats?.PvP?.playtime * weights?.PvP?.playtime + normalizedStats?.PvP?.activitiesCompleted * weights?.PvP?.activitiesCompleted + normalizedStats?.PvP?.combatRating * weights?.PvP?.combatRating + normalizedStats?.PvP?.winPercentage * weights?.PvP?.winPercentage + normalizedStats?.PvP?.flawlessCards * weights?.PvP?.flawlessCards) * memberWeight * baseline
        }
        
    }
    usePostClanScores(clanId, clanName, clanMemberCount, clanCallsign, perMemberStats?.PvE?.playtime, perMemberStats?.PvE?.activitiesCompleted, perMemberStats?.PvE?.averageStrikeDuration, perMemberStats?.PvE?.KD, perMemberStats?.PvE?.raidsCompleted, perMemberStats?.PvP?.playtime, perMemberStats?.PvP?.activitiesCompleted, perMemberStats?.PvP?.combatRating, perMemberStats?.PvP?.winPercentage, perMemberStats?.PvP?.flawlessCards, clanScore.PvE, clanScore.PvP)

    return clanScore
}