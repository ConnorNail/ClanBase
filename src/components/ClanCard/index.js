import { Div, Text, Row, Col, Button, Icon, Anchor } from "atomize";
import InfoBox from '../InfoBox'
import { useRouter } from 'next/router';
import getClanInfo from "../../functions/useGetClanInfo";
import getClanMemberInfo from "../../functions/getClanMemberProfileInfo/useGetClanMemberInfo";
import getClanMembersAllTimeStats from "../../functions/useGetClanMembersAllTimeStats";
import getAllMembersProfile from '../../functions/getClanMemberProfileInfo/useGetAllMembersProfile';
import Bracket from "../BracketSimple";
import Link from 'next/link'

const ClanCard = ({ clanId, stats }) => {

    const router = useRouter();

    const removeQuery = (value) => {
        const newQuery = router.query
        const finalList = []

        // If no queries exist then do nothing
        // If there is one query remove it
        // If there are more than one querie then remove the specific one that was selected
        if (Array.isArray(newQuery.clanids)) {
            const index = newQuery.clanids.indexOf(value);

            if (index > -1) { // only splice array when item is found
                newQuery.clanids.splice(index, 1); // 2nd parameter means remove one item only
            }

            finalList = newQuery.clanids
        } else if (Object.keys(newQuery).length == 1) {
            finalList = []
        }

        router.push({
            pathname: '/clan-compare',
            query: { clanids: finalList },
        });
    };

    const clanInfo = getClanInfo(clanId)
    const { data: clanMemberList } = getClanMemberInfo(clanId)
    const clanMemberStats = getClanMembersAllTimeStats(clanMemberList)
    const clanMemberProfiles = getAllMembersProfile(clanMemberList)

    // Total members
    const memberCount = (stats) => {
        if (stats) {
            return stats?.Response?.detail?.memberCount
        }
    }

    // Calculate average clan KD
    const averageClanKD = (stats) => {
        if (stats) {
            let memberCountPvE = stats.length
            let averageKDPvE = 0
            let memberCountPvP = stats.length
            let averageKDPvP = 0
            for (let i = 0; i < stats.length; i++) {
                const kdPvE = stats[i]?.Response?.allPvE?.allTime?.killsDeathsRatio?.basic?.value
                const kdPvP = stats[i]?.Response?.allPvP?.allTime?.killsDeathsRatio?.basic?.value
                if (kdPvE) {
                    averageKDPvE += kdPvE
                } else {
                    memberCountPvE -= 1
                }
                if (kdPvP) {
                    averageKDPvP += kdPvP
                } else {
                    memberCountPvP -= 1
                }
            }
            averageKDPvE = averageKDPvE / memberCountPvE
            averageKDPvP = averageKDPvP / memberCountPvP
            return [averageKDPvE.toFixed(2), averageKDPvP.toFixed(2)]
        }
    };

    // Calculate total number of Flawless cards completed
    const totalClanFlaslessCards = (stats) => {
        if (stats) {
            let clanFlawlessCards = 0
            for (let i = 0; i < stats.length; i++) {
                const flawlessCards = stats[i]?.Response?.metrics?.data?.metrics['1765255052']?.objectiveProgress?.progress
                if (flawlessCards) {
                    clanFlawlessCards += flawlessCards
                }
            }
            return clanFlawlessCards.toLocaleString()
        }
    }

    // Calculate total raids completed
    const totalClanRaids = (stats) => {
        if (stats) {
            let clanRaids = 0
            for (let i = 0; i < stats.length; i++) {
                const raids = stats[i]?.Response?.raid?.allTime?.activitiesCleared?.basic?.value
                if (raids) {
                    clanRaids += raids
                }
            }
            return clanRaids.toLocaleString()
        }
    }

    // Calculate total GMs completed
    const totalClanGMs = (stats) => {
        if (stats) {
            let clanGMs = 0
            for (let i = 0; i < stats.length; i++) {
                const gms = stats[i]?.Response?.profileRecords?.data?.records[3034652948]?.objectives[0]?.progress
                if (gms) {
                    clanGMs += gms
                }
            }
            return clanGMs.toLocaleString()
        }
    }

    // Calculate total playtime
    const totalPlaytime = (stats) => {
        if (stats) {
            let clanPlaytimePvE = 0
            let clanPlaytimePvP = 0
            for (let i = 0; i < stats.length; i++) {
                const playtimePvE = stats[i]?.Response?.allPvE?.allTime?.secondsPlayed?.basic?.value
                const playtimePvP = stats[i]?.Response?.allPvP?.allTime?.secondsPlayed?.basic?.value

                if (playtimePvE) {
                    clanPlaytimePvE += playtimePvE
                }
                if (playtimePvP) {
                    clanPlaytimePvP += playtimePvP
                }
            }

            const daysPvE = Math.floor(clanPlaytimePvE % (3600 * 24 * 365) / (3600 * 24));
            const yearsPvE = Math.floor(clanPlaytimePvE / (3600 * 24 * 365));

            const daysDisplayPvE = daysPvE > 0 ? daysPvE + (daysPvE == 1 ? " day " : " days ") : "";
            const yearsDisplayPve = yearsPvE > 0 ? yearsPvE + (yearsPvE == 1 ? " year " : " years ") : "";

            const daysPvP = Math.floor(clanPlaytimePvP % (3600 * 24 * 365) / (3600 * 24));
            const yearsPvP = Math.floor(clanPlaytimePvP / (3600 * 24 * 365));

            const daysDisplayPvP = daysPvP > 0 ? daysPvP + (daysPvP == 1 ? " day " : " days ") : "";
            const yearsDisplayPvP = yearsPvP > 0 ? yearsPvP + (yearsPvP == 1 ? " year " : " years ") : "";

            return [yearsDisplayPve + daysDisplayPvE, yearsDisplayPvP + daysDisplayPvP]
        }
    }

    // Calculate total activites completed
    const totalActivitesCleared = (stats) => {
        if (stats) {
            let clanActivitesPvP = 0
            let clanActivitesPvE = 0
            for (let i = 0; i < stats.length; i++) {
                const playtimePvE = stats[i]?.Response?.allPvE?.allTime?.activitiesCleared?.basic?.value
                const playtimePvP = stats[i]?.Response?.allPvP?.allTime?.activitiesEntered?.basic?.value
                if (playtimePvE) {
                    clanActivitesPvE += playtimePvE
                }
                if (playtimePvP) {
                    clanActivitesPvP += playtimePvP
                }
            }

            return [clanActivitesPvE.toLocaleString(), clanActivitesPvP.toLocaleString()]
        }
    }

    // Calculate total kills
    const totalKills = (stats) => {
        if (stats) {
            let clanKillsPvP = 0
            let clanKillsPvE = 0
            for (let i = 0; i < stats.length; i++) {
                const killsPvE = stats[i]?.Response?.allPvE?.allTime?.kills?.basic?.value
                const killsPvP = stats[i]?.Response?.allPvP?.allTime?.kills?.basic?.value
                if (killsPvE) {
                    clanKillsPvE += killsPvE
                }
                if (killsPvP) {
                    clanKillsPvP += killsPvP
                }
            }

            return [clanKillsPvE.toLocaleString(), clanKillsPvP.toLocaleString()]
        }
    }

    // Calculate total deaths
    const totalDeaths = (stats) => {
        if (stats) {
            let clanDeathsPvP = 0
            let clanDeathsPvE = 0
            for (let i = 0; i < stats.length; i++) {
                const deathsPvE = stats[i]?.Response?.allPvE?.allTime?.deaths?.basic?.value
                const deathsPvP = stats[i]?.Response?.allPvP?.allTime?.deaths?.basic?.value
                if (deathsPvE) {
                    clanDeathsPvP += deathsPvE
                }
                if (deathsPvP) {
                    clanDeathsPvE += deathsPvP
                }
            }

            return [clanDeathsPvE.toLocaleString(), clanDeathsPvP.toLocaleString()]
        }
    }

    // Calculated average strike duration
    const averageStrikeDuration = (stats) => {
        if (stats) {
            let averageClanStrikeDuration = 0
            let memberCount = stats.length
            for (let i = 0; i < stats.length; i++) {
                const averageStrikeDuration = stats[i]?.Response?.allStrikes?.allTime?.totalActivityDurationSeconds?.pga?.value
                if (averageStrikeDuration) {
                    averageClanStrikeDuration += averageStrikeDuration
                } else {
                    memberCount -= 1
                }
            }

            averageClanStrikeDuration = averageClanStrikeDuration/memberCount

            return averageClanStrikeDuration.toFixed()
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
                if (activitiesEntered && activitesWon) {
                    averageWP += activitesWon/activitiesEntered
                } else {
                    memberCount -= 1
                }
            }
            averageWP = (averageWP / memberCount)
            return averageWP.toFixed(4)
        }
    };

    // Calculate average combat rating
    const averageCombatRating = (stats) => {
        if (stats) {
            let memberCount = stats.length
            let averageCR = 0
            for (let i = 0; i < stats.length; i++) {
                const combatRating = stats[i]?.Response?.allPvP?.allTime?.combatRating?.basic?.value
                if (combatRating) {
                    averageCR += combatRating
                } else {
                    memberCount -= 1
                }
            }
            averageCR = averageCR / memberCount
            return averageCR.toFixed(2)
        }
    };

    const stat = (text, stat) => {
        return (
            <>
                <Text textSize="paragraph" textColor="cbWhite" p={{ l: '1rem', r: '0.5rem', y: '0.25rem' }} h="1.1rem">
                    {text}
                </Text>
                {stat ?
                    <Text textSize="paragraph" textColor="cbBlue" h="1rem" p={{ y: '0.25rem' }}>
                        {stat}
                    </Text> :
                    <Icon name="Loading3" size="20px" color="cbWhite" transform='translateY(15%)' />
                }
            </>
        )
    }

    return (
        <InfoBox bg="cbGrey1" h="100%" m="0.5rem">
            <Div p={{ x: "1rem" }} minW="14.5rem">
                <Row>
                    <Col d="flex" align="center">
                        {clanInfo?.Response?.detail?.name ?
                        <Link href={"/" + clanId}>
                            <Anchor textSize="title" textColor="cbWhite" hoverTextColor="cbBlue">
                                {clanInfo?.Response?.detail?.name}
                            </Anchor> 
                            </Link>:
                            <Icon name="Loading3" size="24px" color="cbWhite" transform='translateY(15%)' />
                        }
                    </Col>
                    <Col size="flex">
                        <Button
                            h="2rem"
                            w="2rem"
                            bg="cbGrey2"
                            hoverBg="cbGrey3"
                            rounded="circle"
                            shadow="2"
                            hoverShadow="4"
                            onClick={(e) => removeQuery(clanId)}
                        >
                            <Icon name="Cross" size="20px" color="cbWhite" />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Text textSize="caption" textColor="cbWhite" p={{ l: '0.5rem', r: '0.5rem' }} h="1rem">
                        Members
                    </Text>
                    {memberCount(clanInfo) ?
                        <Text textSize="caption" textColor="cbBlue" h="1rem">
                            {memberCount(clanInfo)}
                        </Text> :
                        <Icon name="Loading3" size="20px" color="cbWhite" transform='translateY(15%)' />
                    }
                </Row>
                <Bracket align="flex-start"/>
                <Row>
                    <Text textSize="subheader" textColor="cbWhite" p={{ l: '0.5rem', b: '0.5rem' }} h="1rem">
                        PvE
                    </Text>
                </Row>
                <Row>
                    {stat("Activites Completed:", totalActivitesCleared(clanMemberStats) ? totalActivitesCleared(clanMemberStats)[0] : null)}
                </Row>
                <Row>
                    {stat("Playtime:", totalPlaytime(clanMemberStats) ? totalPlaytime(clanMemberStats)[0] : null)}
                </Row>
                <Row>
                    {stat("Kills:", totalKills(clanMemberStats) ? totalKills(clanMemberStats)[0] : null)}
                </Row>
                <Row>
                    {stat("Deaths:", totalDeaths(clanMemberStats) ? totalDeaths(clanMemberStats)[0] : null)}
                </Row>
                <Row>
                    {stat("Average K/D:", averageClanKD(clanMemberStats) ? averageClanKD(clanMemberStats)[0] : null)}
                </Row>
                <Row>
                    {stat("Average Strike Duration:", averageStrikeDuration(clanMemberStats))}
                </Row>

                <Row>
                    <Text textSize="subheader" textColor="cbWhite" p={{ l: '0.5rem', t: '0.75rem', b: '0.5rem' }} h="1rem">
                        PvP
                    </Text>
                </Row>
                <Row>
                    {stat("Activites Completed:", totalActivitesCleared(clanMemberStats) ? totalActivitesCleared(clanMemberStats)[1] : null)}
                </Row>
                <Row>
                    {stat("Playtime:", totalPlaytime(clanMemberStats) ? totalPlaytime(clanMemberStats)[1] : null)}
                </Row>
                <Row>
                    {stat("Kills:", totalKills(clanMemberStats) ? totalKills(clanMemberStats)[1] : null)}
                </Row>
                <Row>
                    {stat("Deaths:", totalDeaths(clanMemberStats) ? totalDeaths(clanMemberStats)[1] : null)}
                </Row>
                <Row>
                    {stat("Average K/D:", averageClanKD(clanMemberStats) ? averageClanKD(clanMemberStats)[1] : null)}
                </Row>
                <Row>
                    {stat("Average Win Rate:", averageClanWinPercentage(clanMemberStats))}
                </Row>
                <Row>
                    {stat("Average Combat Rating:", averageCombatRating(clanMemberStats))}
                </Row>

                <Row>
                    <Text textSize="subheader" textColor="cbWhite" p={{ l: '0.5rem', t: '0.75rem', b: '0.5rem' }} h="1rem">
                        Endgame
                    </Text>
                </Row>
                <Row>
                    {stat("Raids:", totalClanRaids(clanMemberStats))}
                </Row>
                <Row>
                    {stat("Flawless Cards:", totalClanFlaslessCards(clanMemberProfiles))}
                </Row>
                <Bracket align="flex-end"/>
            </Div>
        </InfoBox>
    )
}

export default ClanCard