import DefaultTemplate from '../components/DefaultLayout'
import { Text, Icon, Col, Anchor, Div, Button } from "atomize";
import InfoBox from '../components/InfoBox';
import Head from 'next/head';
import Link from 'next/link'

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
            <Text textColor="cbWhite" textSize="title" p={{ y: "0.5rem" }}>
                {children}
            </Text>
        )
    }

    function Command({ children }) {
        return (
            <Text textColor="cbBlue" textSize="subheader">
                {children}
            </Text>
        )
    }

    function Body({ children }) {
        return (
            <Text textColor="cbWhite" textSize="paragraph" p={{ t: "0.5rem", b: "1rem", x: "1rem" }}>
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

    function LinkStyle({ href, children }) {
        return (
            <Link href={href} passHref legacyBehavior>
                <Anchor>
                    <Highlight>
                        {children}
                    </Highlight>
                </Anchor>
            </Link>
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
                            <Div m={{ l: "0.5rem" }}>
                                <Command>/setup</Command>
                                <Body>
                                    Initiates the process of linking your Destiny 2 clan and your Discord server.
                                    <br />
                                    Admin permissions in both the Discord server and Destiny 2 clan that is being linked.
                                    <br/>
                                    <br/>
                                    <Icon name="Alert" size="1.2rem" transform='translate(0, 20%)' color="cbBlue" d="inline-block" m={{ r: "0.25rem" }} />
                                    <Highlight>IMPORTANT:</Highlight> Before using this command you must first authenticate with ClanBase by using the /authenticate command.
                                </Body>
                            </Div>

                            <Subtitle>Commands</Subtitle>
                            <Div m={{ l: "0.5rem" }}>
                                <Command>/authenticate</Command>
                                <Body>Provides a link to <LinkStyle href="/accounts">myclanbase.com/accounts</LinkStyle>. Here you can login with both your Destiny 2 and Discord accounts through ClanBase. This will enable Discord time tracking on ClanBase.</Body>

                                <Command>/myclan</Command>
                                <Body>Provides a link to <LinkStyle href="/clan-details">myclanbase.com/clan-details</LinkStyle>. Here you can see your clan&apos;s dashboard on ClanBase.</Body>
                            </Div>
                        </Div>
                    </InfoBox>
                </Col>
            </Div>
        </DefaultTemplate >
    )
}