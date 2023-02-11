import DefaultTemplate from '../components/DefaultLayout'
import { Text, Image, Col, Anchor, Div, Button } from "atomize";
import InfoBox from '../components/InfoBox';
import Head from 'next/head';

export default function Discord() {

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

    function Highlight({ children }) {
        return (
            <Text textColor="cbBlue" tag="span">
                {children}
            </Text>
        )
    }

    return (
        <DefaultTemplate>
            <Head>
                <title>
                    Discord Bot | ClanBase
                </title>
                <meta
                    name="description"
                    content="Documentation for the ClanBase Discord bot."
                    key="desc"
                />
            </Head>
            <Div d="flex" justify="center">
                <Col size={{ xs: "11", md: "8" }}>
                    <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
                        <Div m={{ x: "2rem", y: "1rem" }}>
                            <Title>DISCORD BOT</Title>
                            <Div d="flex" align="center">
                                <Anchor href="https://discordapp.com/oauth2/authorize?&client_id=1063891110805639338&scope=bot&permissions=33557504" target="_blank" m={{ y: "1rem", x: "0.5rem" }}>
                                    <Button bg="cbBlue" shadow="2" hoverShadow="4" m="0.5rem">
                                        <Text textColor="cbGrey1">
                                            Add To Server
                                        </Text>
                                    </Button>
                                </Anchor>
                                <Anchor href="https://discord.gg/WDQC97ybAV" target="_blank" m="0.5rem" >
                                    <Button bg="cbGrey2" shadow="2" hoverShadow="4" m="0.5rem">
                                        <Text textColor="cbWhite">
                                            Join Us On Discord
                                        </Text>
                                    </Button>
                                </Anchor>
                            </Div>

                            <Subtitle>Setup</Subtitle>
                            <Body>Coming Soon...</Body>

                            <Subtitle>Commands</Subtitle>
                            <Body>Coming Soon...</Body>
                        </Div>
                    </InfoBox>
                </Col>
            </Div>
        </DefaultTemplate>
    )
}