import DefaultTemplate from '../components/DefaultLayout'
import { Text, Image, Col, Anchor, Div } from "atomize";
import InfoBox from '../components/InfoBox';

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

    return (
        <DefaultTemplate>
            <Div d="flex" justify="center">
                <Col size={{ xs: "11", md: "8" }}>
                    <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
                        <Div m={{ x: "2rem", y: "1rem" }}>
                            <Title>CLANBASE</Title>
                            <Subtitle>Who We Are</Subtitle>
                            <Body>Clanbase is a collaborative project from CrunchyTheSnail and Hubbley, bringing together their expertise in development, design, and community management to offer Destiny 2 players a new, enhanced, and comprehensive experience in terms of clan interaction and management. The project was initiated in 2021 as a fun side venture where the creators brainstormed ideas for improving Destiny through the API. Now, they are working towards launching the main features and expanding their user base.</Body>
                            <Body>Why the name ClanBase?</Body>
                            <Body>The name Clanbase is inspired by the abbreviation &quot;CB&quot;, which is also the acronym for Clovis Bray. This connection to the lore of Destiny 2 creates a cohesive theme that enhances the user experience without being intrusive. Just like Clovis, who maintained his vast empire by keeping everything organized, detailed, and accessible, Clanbase aims to assist clan leaders in managing their clans efficiently during the Destiny seasonal cycle.</Body>

                            <Subtitle>Connect</Subtitle>
                            <Body>You can get in touch with us through our Discord, Twitter, or Reddit accounts. These platforms provide the best channels for communication.</Body>
                            <Div d="flex" justify="center">
                                <Anchor href="https://twitter.com/clanbasedev" target="_blank" m="0.5rem">
                                    <Div bg="#5865F2" p={{ x: "0.75rem", y: "0.75rem" }} rounded="md" d="flex">
                                        <Image src="discordLarge.svg" alt="discord" h="1.5rem" w="auto" />
                                    </Div>
                                </Anchor>
                                <Anchor href="https://twitter.com/clanbasedev" target="_blank" m="0.5rem">
                                    <Image src="twitter.svg" alt="twitter" h="3rem" w="auto" />
                                </Anchor>
                                <Anchor href="https://twitter.com/clanbasedev" target="_blank" m="0.5rem">
                                    <Div bg="white" p={{ x: "0.25rem" }} rounded="md" d="flex">
                                        <Image src="redditLarge.svg" alt="discord" h="3rem" w="auto" />
                                    </Div>
                                </Anchor>
                            </Div>

                            <Subtitle>Support ClanBase</Subtitle>
                            <Body>If you would like to help keep the lights on around here and see new features added in the future we&apos;re thankful for your help! Here are the places you can find us.</Body>
                            <Div d="flex" justify="center">
                                <Anchor href="https://twitter.com/clanbasedev" target="_blank">
                                    <Image src="ko-fiLarge.png" alt="ko-fi" h="2.5rem" w="auto" />
                                </Anchor>
                            </Div>
                        </Div>
                    </InfoBox>
                </Col>
            </Div>
        </DefaultTemplate>
    )
}