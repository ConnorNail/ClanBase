import DefaultTemplate from '../components/DefaultLayout'
import { Text, Image, Col, Anchor, Div } from "atomize";
import InfoBox from '../components/InfoBox';
import Head from 'next/head';

export default function AboutUs() {

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

    function List({ children }) {
        return (
            <Text textColor="cbWhite" textSize="paragraph" p={{ x: "0.5rem" }}>
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
                    About Use | ClanBase
                </title>
                <meta
                    name="description"
                    content="A brief overview of how ClanBase came to be and how you can support us."
                    key="desc"
                />
            </Head>
            <Div d="flex" justify="center">
                <Col size={{ xs: "11", md: "8" }}>
                    <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
                        <Div m={{ x: "2rem", y: "1rem" }}>
                            <Title>CLANBASE</Title>
                            <Subtitle>Who We Are</Subtitle>
                            <Body>Clanbase is a collaborative project from <Highlight>CrunchytheSnail#7245</Highlight> and <Highlight>Hubbley#6252</Highlight>. It  brings together their expertise in development, design, and community management to offer Destiny 2 players tools that enhance the clan experience for both members and leadership. The project was initiated in 2021 as a fun side venture where the creators brainstormed ideas for improving the Destiny 2 player experience through the API. Now, they are working towards launching the main features and expanding their user base.</Body>
                            <Body>Why the name ClanBase?</Body>
                            <Body>The name Clanbase is inspired by the abbreviation &quot;CB&quot;, which is also the acronym for Clovis Bray. This connection to the lore of Destiny 2 creates a cohesive theme that enhances the user experience without being intrusive. Just like Clovis, who maintained his vast empire by keeping everything organized, detailed, and accessible, Clanbase aims to assist clan leaders in managing their clans efficiently during the Destiny seasonal cycle.</Body>

                            <Subtitle>Connect</Subtitle>
                            <Body>You can get in touch with us through our Discord, Twitter, or Reddit accounts. These platforms provide the best channels for communication.</Body>
                            <Div d="flex" justify="center" flexWrap="wrap">
                                <Anchor href="https://discord.gg/WDQC97ybAV" target="_blank" m="0.5rem" >
                                    <Div bg="#5865F2" p={{ x: "0.75rem", y: "0.75rem" }} rounded="md" d="flex" shadow="2" hoverShadow="4">
                                        <Image src="discordLarge.svg" alt="discord" h="1.5rem" w="auto" />
                                    </Div>
                                </Anchor>
                                <Anchor href="https://twitter.com/clanbasedev" target="_blank" m="0.5rem" >
                                    <Image src="twitter.svg" alt="twitter" h="3rem" w="auto" shadow="2" hoverShadow="4" />
                                </Anchor>
                                <Anchor href="https://www.reddit.com/user/ClanbaseDev" target="_blank" m="0.5rem" >
                                    <Div bg="white" p={{ x: "0.25rem" }} rounded="md" d="flex" shadow="2" hoverShadow="4">
                                        <Image src="redditLarge.svg" alt="discord" h="3rem" w="auto" />
                                    </Div>
                                </Anchor>
                            </Div>

                            <Subtitle>Support ClanBase</Subtitle>
                            <Body>If you would like to help keep the lights on around here and see new features added in the future we&apos;re thankful for your help! Here are the places you can find us.</Body>
                            <Div d="flex" justify="center">
                                <Anchor href="https://ko-fi.com/clanbase" target="_blank">
                                    <Image src="ko-fiLarge.png" alt="ko-fi" h="2.5rem" w="auto" shadow="2" hoverShadow="4" />
                                </Anchor>
                            </Div>

                            <Subtitle>Special Thank You</Subtitle>
                            <Body>Thank you so much to everyone who has helped with ClanBase! We are so thankful for each and every one of you!</Body>
                            <List><Highlight>Ducor#0773</Highlight> for all your help developing the Discord bot</List>
                            <List><Highlight>AllegedGames#5980</Highlight> and <Highlight>Creator Trech#5812</Highlight> for helping with the website design</List>
                            <List></List>
                        </Div>
                    </InfoBox>
                </Col>
            </Div>
        </DefaultTemplate>
    )
}