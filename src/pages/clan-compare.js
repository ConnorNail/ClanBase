import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../components/DefaultLayout'
import ClanCard from '../components/ClanCard'
import InfoBox from '../components/InfoBox'
import CompareSearchBar from '../components/CompareSearchBar'
import LoginButton from '../components/LoginButton'
import { useRouter } from 'next/router'
import { Container, Button, Text, Row, Col, Image, Div } from "atomize";

export default function Home() {
    const router = useRouter()

    const maxCards = 7;

    // Get query string from URL
    const queryObj = router.query

    const data = []

    // Temp data
    //**************************************************************
    const clan1Stats = {
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
        clan2Stats,
        clan3Stats
    ]
    //**************************************************************

    // Fetch clan data from API for each clan id. Do this with a function below
    const keys = Object.keys(queryObj)
    for (let i = 0; i < keys.length; i++) {
        const clanId = queryObj[keys[i]]

        // Run function with clanId as an input. Return the data object
        const clanData = clan1Stats // Replace with API call function ************************************************************
        data.push(clanData)
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
                        {data.map((clan, index) => (
                            <Col key={index}>
                                <ClanCard clanName={clan.clanName} stats={clan.stats} />
                            </Col>
                        ))}
                        {keys.length < maxCards ?
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