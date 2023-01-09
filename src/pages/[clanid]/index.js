import DefaultTemplate from '../../components/DefaultLayout';
import InfoBox from '../../components/InfoBox';
import SearchBar from '../../components/SearchBar';
import getClanMemberProfileInfo from '../../functions/getClanMemberProfileInfo';
import getClanMemberStatsInfo from '../../functions/getClanMemberStatsInfo';
import setupRosterTable from "../../functions/setupRosterTable";
import setupMemberTime from "../../functions/setupMemberTime";
import formatTotalTime from '../../functions/formatTotalTime';
import Table from "../../components/Table";
import getHeaders from '../../functions/getHeaders';
import { useRouter } from 'next/router';
import { Row, Col, Div, Text, Image, Container, Anchor, Icon } from "atomize";
import Link from 'next/link';
import getClanInfo from '../../functions/getClanInfo';
import getClanMemberInfo from '../../functions/getClanMemberProfileInfo/getClanMemberInfo';
import getClanMembersAllTimeStats from '../../functions/getClanMembersAllTimeStats';
import getAllMembersProfile from '../../functions/getClanMemberProfileInfo/getAllMembersProfile';
import ClanBannerSimple from '../../components/clanBannerSimple';
import ClanIconBox from '../../components/ClanIconBox';
import calcClanStatScores from '../../functions/calcClanStatScores';
import PvEIcon from '../../components/PvEIcon';
import PvPIcon from '../../components/PvPIcon';

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
        <InfoBox bg="cbGrey2">
          <Row>
            <Col size="auto">
              <Row m="0" minW="18rem">
                <Text textSize="display1" textColor="cbWhite">
                  {loadingValue(clanInfo?.Response?.detail?.name, "cbWhite")} [{loadingValue(clanInfo?.Response?.detail?.clanInfo?.clanCallsign, "cbWhite")}]
                </Text>
              </Row>
              <Row m="0" minW="18rem">
                <Text textSize="paragraph" textColor="cbGrey1">
                  "{loadingValue(clanInfo?.Response?.detail?.motto, "cbGrey1")}"
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
          <Row>
            <Col>
              CLAN BANNER PLACEHOLDER
            </Col>
            <Col>
              <Text style={{ whiteSpace: "pre-line" }} textSize="subheader" textColor="cbWhite">
                {loadingValue(clanInfo?.Response?.detail?.about, "cbWhite")}
              </Text>
            </Col>
            <Col>
              RECENT MEMBERS TABLE PLACEHOLDER
            </Col>
          </Row>
        </InfoBox>
        <InfoBox bg="cbGrey2">
          <Row>
            CLAN LEVEL PLACEHOLDER
          </Row>
        </InfoBox>
      </Row>
    </DefaultTemplate>
  )
}