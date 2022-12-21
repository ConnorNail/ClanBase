import DefaultTemplate from '../components/DefaultLayout'
import ClanCard from '../components/ClanCard'
import InfoBox from '../components/InfoBox'
import CompareSearchBar from '../components/CompareSearchBar'
import getClanInfo from "../functions/getClanInfo";
import { useRouter } from 'next/router'
import { Container, Button, Text, Row, Col, Image, Div } from "atomize";

export default function clanCompare() {
    const router = useRouter()

    const maxCards = 7;

    // Get query string from URL
    const queryObj = router.query

    const clanids = []

    // Temp data
    //**************************************************************
    const clan1Stats = {
        clanId: "2084197",
        clanName: "Clan 1",
        stats: [
            {
                name: "Average KD",
                value: "1.0"
            },
            {
                name: "Total Raids Completed",
                value: "5400"
            },
        ]
    }

    const clan2Stats = {
        clanId: "4599535",
        clanName: "Clan 2",
        stats: [
            {
                name: "Average KD",
                value: "1.2"
            },
            {
                name: "Total Raids Completed",
                value: "1000"
            },
        ]
    }

    const clan3Stats = {
        clanId: "32312415125",
        clanName: "Clan 3",
        stats: [
            {
                name: "Average KD",
                value: "2.55"
            },
            {
                name: "Total Raids Completed",
                value: "11"
            },
        ]
    }

    const testData = [
        clan1Stats,
        clan2Stats
    ]
    //**************************************************************

    // Count the number of queries
    var clanCount = 0;
    if (Array.isArray(queryObj.clanids)) {
        clanCount = queryObj.clanids.length
        clanids.push(...queryObj.clanids)
    } else if (typeof queryObj?.clanids !== 'undefined') {
        clanCount = 1
        clanids.push(queryObj.clanids)
    }

    return (
        <DefaultTemplate>
            <Div p="2rem">
                <Col>
                    <Row>
                        <Text textSize="title" p={{ b: "1rem" }}>
                            Clan Comparison
                        </Text>
                    </Row>
                    <Row>
                        {clanids.map((id, index) => (
                            <Col key={index}>
                                <ClanCard clanId={id} />
                            </Col>
                        ))}
                        {clanCount < maxCards ?
                            <Col>
                                <InfoBox>
                                    <Div p={{ x: "1rem" }} h="25rem" d="flex" align="center auto">
                                        <Col>
                                            <Text textSize="title" p={{ b: "1rem" }} textAlign="center">
                                                Add a Clan
                                            </Text>
                                            <CompareSearchBar />
                                        </Col>
                                    </Div>
                                </InfoBox>
                            </Col> :
                            <></>
                        }
                    </Row>
                </Col>
            </Div>
        </DefaultTemplate>
    )
}