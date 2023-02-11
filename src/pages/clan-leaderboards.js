import DefaultTemplate from '../components/DefaultLayout'
import { Text, Row, Col, Anchor, Div, Icon, Button } from "atomize";
import InfoBox from '../components/InfoBox';
import Head from 'next/head';
import useGetClanLeaderboards from '../functions/useGetClanLeaderboards';
import useGetClanInfoImut from '../functions/useGetClanInfoImut';
import Link from 'next/link'
import PvEIcon from '../components/PvEIcon';
import PvPIcon from '../components/PvPIcon';

export default function ClanLeaderboards() {
    const leaderboards = useGetClanLeaderboards()
    const clansPvELeaderboard = leaderboards?.clansPvELeaderboard
    const clansPvPLeaderboard = leaderboards?.clansPvPLeaderboard

    function Leaderboard({ data, name }) {
        return (
            <Div m={{ x: { xs: "0rem", lg: "1rem" } }}>
                <Text textColor="cbWhite" textSize={{ xs: "title", md: "heading" }} p={{ t: "0.5rem", x: "0.5rem" }}>
                    {name} Leaderboard
                </Text>
                <Div tag="ol" >
                    {data.map((clan, index) => (
                        <Div key={index}>
                            <ClanCard clanId={clan.clanId} clanScore={clan[`clanScore${name}`]} name={name} />
                        </Div>
                    ))}
                </Div>
            </Div>
        )
    }

    function ClanCard({ clanId, clanScore, name }) {
        const clanInfo = useGetClanInfoImut(clanId)
        const clanName = clanInfo?.Response?.detail?.name
        const clanCallsign = clanInfo?.Response?.detail?.clanInfo?.clanCallsign
        const motto = clanInfo?.Response?.detail?.motto

        return (
            <Div tag="li" textColor="cbBlue" textSize={{ xs: "subheader", md: "title" }}>
                <Link href={`/${clanId}`} passHref legacyBehavior>
                    <Anchor>
                        <Div bg="cbGrey2" rounded="md" m={{ x: "0.25rem", y: "0.5rem" }} p={{ l: "0.75rem", r: "0.5rem", y: "0.25rem" }} shadow="2" hoverShadow="4" d="flex" align="center">
                            <Div m={{ r: "1rem" }} style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                                {clanName && clanCallsign ?
                                    <Text textColor="cbWhite" textSize={{ xs: "paragraph", md: "subheader" }} style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {clanName} [{clanCallsign}]
                                    </Text>
                                    :
                                    <Icon name="Loading3" size="20px" color="cbWhite" />
                                }
                            </Div>
                            <Div d="flex" align="center" justify="flex-end" w="6rem" m={{ l: "auto" }} >
                                <Text textColor="cbBlue" textSize={{ xs: "subheader", md: "title" }} >
                                    {Math.round(clanScore)}
                                </Text>
                                {name === "PvE" ?
                                    <PvEIcon />
                                    :
                                    <PvPIcon />
                                }
                            </Div>
                        </Div>
                    </Anchor>
                </Link>
            </Div>
        )
    }

    return (
        <DefaultTemplate>
            <Head>
                <title>
                    Leaderboards | ClanBase
                </title>
                <meta
                    name="description"
                    content="Leaderboards that show the top ranking Destiny 2 clans in PvE and PvP."
                    key="desc"
                />
            </Head>
            <Div d="flex" justify="center">
                <Col size={{ xs: "11", md: "8" }}>
                    <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
                        <Div d="flex" align="center" m={{ x: "1rem", y: "0.5rem" }}>
                            <Text textColor="cbWhite" textSize="display1">
                                CLAN LEADERBOARD
                            </Text>
                            <Link href="/clan-score-explained" passHref legacyBehavior>
                                <Anchor m={{ l: "auto" }}>
                                    <Button bg="cbGrey2" textColor="cbWhite" textSize="paragraph" shadow="2" hoverShadow="4">
                                        What is a Clan Score?
                                    </Button>
                                </Anchor>
                            </Link>
                        </Div>
                        <Div d={{ xs: "block", lg: "flex" }} align="center" flexWrap="wrap" justify="center">
                            {clansPvELeaderboard && clansPvPLeaderboard ?
                                <>
                                    <Leaderboard data={clansPvELeaderboard} name="PvE" />
                                    <Leaderboard data={clansPvPLeaderboard} name="PvP" />
                                </>
                                :
                                <Icon name="Loading3" size="60px" color="cbGrey2" />
                            }
                        </Div>
                    </InfoBox>
                </Col>
            </Div>
        </DefaultTemplate>
    )
}