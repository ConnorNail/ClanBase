import { Text, Div, Image, Icon, Row, Col, Anchor, Button } from "atomize";
import ClanIconBox from '../../components/ClanIconBox';
import PvEIcon from '../../components/PvEIcon';
import PvPIcon from '../../components/PvPIcon';
import ScrollBox from '../../components/ScrollBox';
import ClanBannerSimple from '../../components/ClanBannerSimple';
import ClanEngrams from '../../components/ClanEngrams';
import Link from 'next/link'

export default function ClanPageMain({ clanId, clanInfo, clanStatScores, router, isUsersClan }) {
    const loadingValue = (value, color) => {
        if (value || value == 0) {
            return (
                <>
                    {value}
                </>
            )
        } else {
            return (
                <Icon name="Loading3" size="20px" color={color} transform='translateY(15%)' />
            )
        }
    }

    return (
        <Div>
            <Row>
                <Col size="auto">
                    <Row m="0" minW="18rem" d="flex" align="center">
                        <Text textSize={{ xs: "heading", md: "display1" }} textColor="cbWhite" p={{ x: "0.5rem" }}>
                            {loadingValue(clanInfo?.Response?.detail?.name, "cbWhite")} [{loadingValue(clanInfo?.Response?.detail?.clanInfo?.clanCallsign, "cbWhite")}]
                        </Text>
                    </Row>
                    <Row m="0" minW="18rem">
                        <Text textSize="paragraph" textColor="cbGrey0" p={{ x: "0.5rem" }}>
                            &quot;{loadingValue(clanInfo?.Response?.detail?.motto, "cbGrey0")}&quot;
                        </Text>
                    </Row>
                </Col>
                <Col>
                    <ClanIconBox clanInfo={clanInfo}></ClanIconBox>
                </Col>
                <Col d="flex" align="center" justify="center">
                    <Div d="flex" align="center" m={{ x: "0.5rem" }}>
                        <PvEIcon />
                        {clanStatScores?.PvE || clanStatScores?.PvE == 0 ?
                            <Text textSize={{ xs: "title", md: "heading" }} textColor="cbBlue" p="0.5rem">
                                {clanStatScores?.PvE.toFixed()}
                            </Text> :
                            <Icon name="Loading3" size="20px" color="cbBlue" />}
                        <Link href="clan-score-explained" passHref legacyBehavior>
                            <Anchor>
                                <Icon name="Info" size="20px" color="cbGrey3" hoverColor="cbWhite" cursor="pointer" />
                            </Anchor>
                        </Link>
                    </Div>
                    <Div d="flex" align="center" m={{ x: "0.5rem" }}>
                        <PvPIcon />
                        {clanStatScores?.PvP || clanStatScores?.PvP == 0 ?
                            <Text textSize={{ xs: "title", md: "heading" }} textColor="cbBlue" p="0.5rem">
                                {clanStatScores?.PvP.toFixed()}
                            </Text> :
                            <Icon name="Loading3" size="20px" color="cbBlue" />}
                        <Link href="clan-score-explained" passHref legacyBehavior>
                            <Anchor>
                                <Icon name="Info" size="20px" color="cbGrey3" hoverColor="cbWhite" cursor="pointer" />
                            </Anchor>
                        </Link>
                    </Div>
                </Col>
            </Row>
            <Row d="flex" justify="center">
                <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
            </Row>
            <Row>
                <Col d={{ xs: "none", lg: "flex" }} justify="center" size="3">
                    <Div border={{ x: "1.5px solid" }} borderColor="cbWhite" w="13rem">
                        <ClanBannerSimple clanId={clanId} />
                    </Div>
                </Col>
                <Col size={{ lg: "6" }}>
                    <ScrollBox h={"19rem"}>
                        <Text style={{ whiteSpace: "pre-line" }} textSize={{ xs: "paragraph", md: "subheader" }} textColor="cbWhite">
                            {loadingValue(clanInfo?.Response?.detail?.about, "cbWhite")}
                        </Text>
                    </ScrollBox>
                    <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }} d={{ lg: "none" }}></Div>
                </Col>
                <Col d="flex" justify="center" size={{ xs: "12", lg: "3" }}>
                    <Div maxW={{ lg: "13rem" }} d="flex" align="center" flexDir="column" border={{ x: "1.5px solid" }} borderColor="cbWhite" p={{ xs: "0 2rem 0", md: "0" }}>
                        <Text textColor="cbWhite" textSize="title" textAlign="left">
                            Clan Engrams
                        </Text>
                        <Div d="flex" align="center" h="100%">
                            <ClanEngrams clanId={clanId} />
                        </Div>
                    </Div>
                </Col>
            </Row>
            <Row d="flex" justify="center">
                <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
            </Row>
            {isUsersClan ?
                <Row>
                    <Div d="flex" justify="center" w="100%" m={{ x: "0.5rem" }}>
                        <Button bg="cbGrey2" w="100%" hoverTextColor="cbBlue" textColor="cbWhite" textSize="subheader" shadow="2" hoverShadow="4" onClick={() => router.push('/clan-details')}>
                            <Text textAlign="center">
                                Details
                            </Text>
                        </Button>
                    </Div>
                </Row>
                :
                null
            }
        </Div>
    )
}