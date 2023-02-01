import DefaultTemplate from '../components/DefaultLayout'
import { Text, Row, Col, Anchor, Div } from "atomize";
import InfoBox from '../components/InfoBox';

export default function ClanScoreExplained() {

    function Title({ children }) {
        return (
            <Text textColor="cbWhite" textSize="display1">
                {children}
            </Text>
        )
    }

    function Subtitle({ children }) {
        return (
            <Text textColor="cbWhite" textSize="title" p={{ t: "0.5rem" }}>
                {children}
            </Text>
        )
    }

    function Body({ children }) {
        return (
            <Text textColor="cbWhite" textSize="paragraph" p="0.5rem">
                {children}
            </Text>
        )
    }

    return (
        <DefaultTemplate>
            <Div d="flex" justify="center">
                <Col size={{ xs: "11", md: "8" }}>
                    <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
                        <Div m={{ x: "2rem", y: "1rem" }}>
                            <Title>CLAN SCORES</Title>
                            <Subtitle>What are Clan Scores?</Subtitle>
                            <Body>Clan Scores are ranking values used to rate a clan in both PvE and PvP. These values are not from Bungie or in Destiny 2 but are calculated by us using aggregated data from all members in a clan. These values represent a clan’s proficiency in both PvE and PvP and can be used to determine which area of the game a clan is focused on. The scores can additionally be used to compare clans to each other and rank them. We will have leaderboards up soon once we have collected more data.</Body>
                            
                            <Subtitle>How do we calculate Clan Scores?</Subtitle>
                            <Body>The way in which we calculate these scores is a secret for now but it takes into account multiple factors across many areas of the game. It should be noted, however, that the number of members in a clan is accounted for and does not significantly impact the score assigned to a  clan. This ensures that the scores can be used to compare clans regardless of how many players are a part of them. The clan score for the average clan is 1000 for both PvE and PvP.</Body>
                        </Div>
                    </InfoBox>
                </Col>
            </Div>
        </DefaultTemplate>
    )
}