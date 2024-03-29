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
                <Div>
                    {data.map((clan, index) => (
                        <Div key={index}>
                            <ClanCard index={index} clanId={clan.clanId} clanName={clan.clanName} clanCallsign={clan.clanCallsign} clanScore={clan[`clanScore${name}`]} name={name} />
                        </Div>
                    ))}
                </Div>
            </Div>
        )
    }

    function ClanCard({ index, clanId, clanName, clanCallsign, clanScore, name }) {
        return (
            <Div textColor="cbBlue" textSize={{ xs: "subheader", md: "title" }} d="flex" align="center">
                <Text textAlign="center" textColor="cbBlue" textSize={{ xs: "subheader", md: "title" }} w="1rem" p={{ l: "0.5rem", r: "1rem" }}>{index+1}</Text>
                <Link href={`/${clanId}`} passHref legacyBehavior>
                    <Anchor style={{ flex: "0 1 auto"}} w="95%">
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
                        <Div d={{ xs: "block", lg: "flex" }} flexWrap="wrap" align="center" m={{ x: { xs: "0.5rem", lg: "2rem" }, y: "1rem" }}>
                            <Text textColor="cbWhite" textSize="display1">
                                CLAN LEADERBOARD
                            </Text>
                            <Link href="/clan-score-explained" passHref legacyBehavior>
                                <Anchor m={{ l: "auto" }}>
                                    <Button bg="cbGrey2" textColor="cbWhite" textSize="paragraph" shadow="2" hoverShadow="4">
                                        What are Clan Scores?
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