import { Div, Text, Row, Col, Button, Icon } from "atomize";
import InfoBox from '../InfoBox'
import { useRouter } from 'next/router';
import getClanInfo from "../../functions/getClanInfo";
import getClanMemberInfo from "../../functions/getClanMemberProfileInfo/getClanMemberInfo";
import getClanMembersAllTimeStats from "../../functions/getClanMembersAllTimeStats";
import getAllMembersProfile from '../../functions/getClanMemberProfileInfo/getAllMembersProfile';

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
    const clanMemberList = getClanMemberInfo(clanId)
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
            averageKDPvE = averageKDPvE/memberCountPvE
            averageKDPvP = averageKDPvP/memberCountPvP
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
            
            const daysPvE = Math.floor(clanPlaytimePvE % (3600*24*365) / (3600*24));
            const yearsPvE = Math.floor(clanPlaytimePvE / (3600*24*365));

            const daysDisplayPvE = daysPvE > 0 ? daysPvE + (daysPvE == 1 ? " day " : " days ") : "";
            const yearsDisplayPve = yearsPvE > 0 ? yearsPvE + (yearsPvE == 1 ? " year " : " years ") : "";

            const daysPvP = Math.floor(clanPlaytimePvP % (3600*24*365) / (3600*24));
            const yearsPvP = Math.floor(clanPlaytimePvP / (3600*24*365));

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
                    clanKillsPvP += killsPvE
                }
                if (killsPvP) {
                    clanKillsPvE += killsPvP
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

    return (
        <InfoBox>
            <Div p={{ x: "1rem" }} h="25rem">
                <Row>
                    <Col d="flex" align="center">
                        <Text textSize="title">
                            {clanInfo?.Response?.detail?.name}
                        </Text>
                    </Col>
                    <Col size="flex">
                        <Button
                            h="2.5rem"
                            w="2.5rem"
                            bg="danger700"
                            hoverBg="danger600"
                            rounded="circle"
                            shadow="2"
                            hoverShadow="4"
                            onClick={(e) => removeQuery(clanId)}
                        >
                            <Icon name="DeleteSolid" size="20px" color="cbWhite" />
                        </Button>
                    </Col>
                </Row>
                <Div bg="cbWhite" w="auto" h="0.1rem" m={{ y: "0.5rem" }}></Div>
                Members: {memberCount(clanInfo)}
                <br/>
                <br/>
                PvE
                <br/>
                Activites Completed: {totalActivitesCleared(clanMemberStats) ? totalActivitesCleared(clanMemberStats)[0] : null}
                <br/>
                Playtime: {totalPlaytime(clanMemberStats) ? totalPlaytime(clanMemberStats)[0] : null}
                <br/>
                Kills: {totalKills(clanMemberStats) ? totalKills(clanMemberStats)[0] : null}
                <br/>
                Deaths: {totalDeaths(clanMemberStats) ? totalDeaths(clanMemberStats)[0] : null}
                <br/>
                Average KD: {averageClanKD(clanMemberStats) ? averageClanKD(clanMemberStats)[0] : null}
                <br/>
                <br/>

                PvP
                <br/>
                Activites Completed: {totalActivitesCleared(clanMemberStats) ? totalActivitesCleared(clanMemberStats)[1] : null}
                <br/>
                Playtime: {totalPlaytime(clanMemberStats) ? totalPlaytime(clanMemberStats)[1] : null}
                <br/>
                Kills: {totalKills(clanMemberStats) ? totalKills(clanMemberStats)[1] : null}
                <br/>
                Deaths: {totalDeaths(clanMemberStats) ? totalDeaths(clanMemberStats)[1] : null}
                <br/>
                Average KD: {averageClanKD(clanMemberStats) ? averageClanKD(clanMemberStats)[1] : null}
                <br/>
                <br/>

                
                Total Flawless Trials Cards: {totalClanFlaslessCards(clanMemberProfiles)}
                <br/>
                Total Raids: {totalClanRaids(clanMemberStats)}
            </Div>
        </InfoBox>
    )
}

export default ClanCard