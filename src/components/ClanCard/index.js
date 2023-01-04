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
            let memberCount = stats.length
            let averageKD = 0
            for (let i = 0; i < stats.length; i++) {
                const kd = stats[i]?.Response?.mergedAllCharacters?.results?.allPvP?.allTime?.killsDeathsRatio?.basic?.value
                if (kd) {
                    averageKD += kd
                } else {
                    memberCount -= 1
                }
            }
            averageKD = averageKD/memberCount
            return averageKD.toFixed(2)
        }
    };

    // Calculate total number of Flawless cards completed
    const totalClanFlaslessCards = (stats) => {
        if (stats) {
            let clanFlawlessCards = 0
            for (let i = 0; i < stats.length; i++) {
                const flawlessCards = stats[i]?.Response?.metrics?.data?.metrics['1765255052']?.objectiveProgress?.progress
                // console.log(flawlessCards)
                if (flawlessCards) {
                    clanFlawlessCards += flawlessCards
                }
            }
            return clanFlawlessCards
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
                Average KD: {averageClanKD(clanMemberStats)}
                <br/>
                Total Flawless Trials Cards: {totalClanFlaslessCards(clanMemberProfiles)}
                {/* {stats.map((stat, index) => (
                    <Row p={{ y: "0.5rem" }} key={index}>
                        <Col size="8" >
                            <Text textSize="subtitle" >
                                {stat.name}:
                            </Text>
                        </Col>
                        <Col d="flex" align="center">
                            <Text textSize="subtitle">
                                {stat.value}
                            </Text>
                        </Col>
                    </Row>
                ))} */}
            </Div>
        </InfoBox>
    )
}

export default ClanCard