import DefaultTemplate from '../../components/DefaultLayout';
import InfoBox from '../../components/InfoBox';
import getHeaders from '../../functions/getHeaders';
import { useRouter } from 'next/router';
import { Row, Col, Div, Text, Icon } from "atomize";
import getClanInfo from '../../functions/getClanInfo';
import getClanMemberInfo from '../../functions/getClanMemberProfileInfo/getClanMemberInfo';
import getClanMembersAllTimeStats from '../../functions/getClanMembersAllTimeStats';
import getAllMembersProfile from '../../functions/getClanMemberProfileInfo/getAllMembersProfile';
import ClanBannerSimple from '../../components/ClanBannerSimple';
import ClanIconBox from '../../components/ClanIconBox';
import calcClanStatScores from '../../functions/calcClanStatScores';
import PvEIcon from '../../components/PvEIcon';
import PvPIcon from '../../components/PvPIcon';
import ScrollBox from '../../components/ScrollBox';
import TimeTable from '../../components/TimeTable';
import ClanLevel from '../../components/ClanLevel';
import ClanEngrams from '../../components/ClanEngrams';
import ClanBannerPerks from '../../components/ClanBannerPerks';

export default function ClanPage() {

  const router = useRouter();

  // Get query string from URL
  const queryObj = router.query
  const clanId = queryObj.clanid

  const headers = getHeaders(false);

  const clanInfo = getClanInfo(clanId)
  const clanMemberList = getClanMemberInfo(clanId)
  const clanMemberStats = getClanMembersAllTimeStats(clanMemberList)
  const clanMemberProfiles = getAllMembersProfile(clanMemberList)

  const clanStatScores = calcClanStatScores(clanMemberStats, clanMemberProfiles)

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
    <DefaultTemplate>
      <Row d="flex" flexDir="column" m={{ x: "2rem" }}>
        <InfoBox bg="cbGrey1">
          <Row>
            <Col size="auto">
              <Row m="0" minW="18rem">
                <Text textSize="display1" textColor="cbWhite">
                  {loadingValue(clanInfo?.Response?.detail?.name, "cbWhite")} [{loadingValue(clanInfo?.Response?.detail?.clanInfo?.clanCallsign, "cbWhite")}]
                </Text>
              </Row>
              <Row m="0" minW="18rem">
                <Text textSize="paragraph" textColor="cbGrey2">
                  &quot;{loadingValue(clanInfo?.Response?.detail?.motto, "cbGrey2")}&quot;
                </Text>
              </Row>
            </Col>
            <Col size="auto">
              <ClanIconBox clanInfo={clanInfo}></ClanIconBox>
            </Col>
            <Col>
              CLAN SCORE PLACEHOLDER
            </Col>
            <Col d="flex" align="center">
              <PvEIcon />
              {clanStatScores?.PvE ?
                <Text textSize="heading" textColor="cbBlue">
                  {clanStatScores?.PvE.toFixed()}
                </Text> :
                <Icon name="Loading3" size="20px" color="cbBlue" />}
            </Col>
            <Col d="flex" align="center">
              <PvPIcon />
              {clanStatScores?.PvP ?
                <Text textSize="heading" textColor="cbBlue">
                  {clanStatScores?.PvP.toFixed()}
                </Text> :
                <Icon name="Loading3" size="20px" color="cbBlue" />}
            </Col>
          </Row>
          <Row d="flex" justify="center">
            <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
          </Row>
          <Row>
            <Col d="flex" justify="center" size="auto">
              <ClanBannerSimple clanId={clanId} />
            </Col>
            <Col>
              <ScrollBox h={"19.2rem"}>
                <Text style={{ whiteSpace: "pre-line" }} textSize="subheader" textColor="cbWhite">
                  {loadingValue(clanInfo?.Response?.detail?.about, "cbWhite")}
                </Text>
              </ScrollBox>
            </Col>
            <Col>
              RECENT MEMBERS TABLE PLACEHOLDER
            </Col>
          </Row>
        </InfoBox>
        <InfoBox bg="cbGrey1">
          <ClanLevel clanInfo={clanInfo} />
          <Text textColor="cbWhite" textSize="heading">
            Clan Banner Perks
          </Text>
          <ClanBannerPerks memberProfiles={clanMemberProfiles} clanInfo={clanInfo} />
          <Text textColor="cbWhite" textSize="heading">
            Clan Engrams
          </Text>
          <ClanEngrams clanId={clanId} />
        </InfoBox>
        <InfoBox bg="cbGrey1">
          <Text textColor="cbWhite" textSize="heading">
            Seasonal Time Data
          </Text>
          <Row d="flex" justify="center">
            <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
          </Row>
          <ScrollBox h={"35rem"}>
            <Div>
              <TimeTable memberInfo={clanMemberList} memberProfiles={clanMemberProfiles} />
            </Div>
          </ScrollBox>
          <Row d="flex" justify="center">
            <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
          </Row>
        </InfoBox>
      </Row>
    </DefaultTemplate>
  )
}