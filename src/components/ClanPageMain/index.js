import { Text, Div, Image, Icon, Row, Col } from "atomize";
import getClanWeeklyRewards from "../../functions/useGetClanWeeklyRewards";
import getClanEngramMilestone from "../../functions/useGetClanEngramMilestone";
import ClanIconBox from '../../components/ClanIconBox';
import PvEIcon from '../../components/PvEIcon';
import PvPIcon from '../../components/PvPIcon';
import ScrollBox from '../../components/ScrollBox';
import ClanBannerSimple from '../../components/ClanBannerSimple';
import ClanEngrams from '../../components/ClanEngrams';

export default function ClanPageMain({ clanId, clanInfo, clanStatScores }) {
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
                        <Icon name="Settings" size="25px" color="cbBlue" hoverColor="cbGrey3" cursor="pointer" />
                    </Row>
                    <Row m="0" minW="18rem">
                        <Text textSize="paragraph" textColor="cbGrey2" p={{ x: "0.5rem" }}>
                            &quot;{loadingValue(clanInfo?.Response?.detail?.motto, "cbGrey2")}&quot;
                        </Text>
                    </Row>
                </Col>
                <Col>
                    <ClanIconBox clanInfo={clanInfo}></ClanIconBox>
                </Col>
                <Col d="flex" align="center" justify="center">
                    <Div d="flex" align="center" m={{ x: "0.5rem" }}>
                        <PvEIcon />
                        {clanStatScores?.PvE ?
                            <Text textSize={{ xs: "title", md: "heading" }} textColor="cbBlue" p="0.5rem">
                                {clanStatScores?.PvE.toFixed()}
                            </Text> :
                            <Icon name="Loading3" size="20px" color="cbBlue" />}
                        <Icon name="Info" size="20px" color="cbGrey2" hoverColor="cbGrey3" cursor="pointer" />
                    </Div>
                    <Div d="flex" align="center" m={{ x: "0.5rem" }}>
                        <PvPIcon />
                        {clanStatScores?.PvP ?
                            <Text textSize={{ xs: "title", md: "heading" }} textColor="cbBlue" p="0.5rem">
                                {clanStatScores?.PvP.toFixed()}
                            </Text> :
                            <Icon name="Loading3" size="20px" color="cbBlue" />}
                        <Icon name="Info" size="20px" color="cbGrey2" hoverColor="cbGrey3" cursor="pointer" />
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
        </Div>
    )
}