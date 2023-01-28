import DefaultTemplate from '../../components/DefaultLayout';
import InfoBox from '../../components/InfoBox';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Row, Col, Div, Text, Icon } from "atomize";
import getClanInfo from '../../functions/useGetClanInfo';
import getClanMemberInfo from '../../functions/getClanMemberProfileInfo/useGetClanMemberInfo';
import getClanMembersAllTimeStats from '../../functions/useGetClanMembersAllTimeStats';
import getAllMembersProfile from '../../functions/getClanMemberProfileInfo/useGetAllMembersProfile';
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
import RecentlyJoinClanMembersTable from '../../components/RecentlyJoinedClanMembersTable';
import ClanRoster from '../../components/ClanRoster';
import getClanMemberCharacterSeasonalTimeStats from '../../functions/getClanMemberCharacterSeasonalTimeStats';
import MemberStatCard from '../../components/MemberStatCard';
import ClanPageMain from '../../components/ClanPageMain';

export default function ClanPage() {

  const router = useRouter();

  // Get query string from URL
  const queryObj = router.query
  const clanId = queryObj.clanid

  const [memberIndex, setMemberIndex] = useState(0);

  const clanInfo = getClanInfo(clanId)
  const { data: clanMemberList } = getClanMemberInfo(clanId)
  const clanMemberStats = getClanMembersAllTimeStats(clanMemberList)
  const clanMemberProfiles = getAllMembersProfile(clanMemberList)

  const clanStatScores = calcClanStatScores(clanMemberStats, clanMemberProfiles)

  // const memberSeasonalTimeStats = getClanMemberCharacterSeasonalTimeStats(clanMemberList, clanMemberProfiles)

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
      <Div d="flex" justify="center">
        {/* <Row > */}
        <Col size="11">
          <Row m={{ y: "1rem" }}>
            <Col>
              <InfoBox bg="cbGrey1">
                <ClanPageMain clanId={clanId} clanInfo={clanInfo} clanStatScores={clanStatScores} router={router}/>
              </InfoBox>
            </Col>
            {/* <Col>
              <InfoBox bg="cbGrey1">
                <Row minW="10rem">
                  <Text textColor="cbWhite" textSize="heading">
                    Recent Members
                  </Text>
                </Row>
                <Row minW="10rem" d="flex" justify="center" align="center">
                  <Div m={{ t: "0.5rem", r: "1rem" }}>
                    <RecentlyJoinClanMembersTable clanMemberInfo={clanMemberList} />
                  </Div>
                </Row>
              </InfoBox>
            </Col> */}
          </Row>
          <Row m={{ y: "1rem" }}>
            <Col>
              <InfoBox bg="cbGrey1">
                <Text textColor="cbWhite" textSize="heading" p={{ x: "0.5rem" }}>
                  Clan Banner Perks
                </Text>
                <ClanLevel clanInfo={clanInfo} />
                <ClanBannerPerks memberProfiles={clanMemberProfiles} clanInfo={clanInfo} />
              </InfoBox>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <InfoBox bg="cbGrey1">
                <Text textColor="cbWhite" textSize="heading">
                  Seasonal Time Data
                </Text>
                <Row d="flex" justify="center">
                  <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
                </Row>
                <ScrollBox h={"35rem"}>
                  <Div>
                    <TimeTable memberSeasonalTime={memberSeasonalTimeStats} />
                  </Div>
                </ScrollBox>
                <Row d="flex" justify="center">
                  <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
                </Row>
              </InfoBox>
            </Col>
          </Row>
          <Row>
            <Col>
              <InfoBox bg="cbGrey1">
                <ScrollBox h={"45rem"}>
                  <ClanRoster clanMemberInfo={clanMemberList} clanMemberProfiles={clanMemberProfiles} memberIndex={memberIndex} setMemberIndex={setMemberIndex} />
                </ScrollBox>
              </InfoBox>
            </Col>
            <Col>
              <InfoBox bg={'cbGrey1'}>
                <MemberStatCard timeData={memberSeasonalTimeStats} membersInfo={clanMemberList} membersProfiles={clanMemberProfiles} membersAllTimeStats={clanMemberStats} memberIndex={memberIndex} setMemberIndex={setMemberIndex} />
              </InfoBox>
            </Col>
          </Row> */}
        </Col>
        {/* </Row> */}
      </Div >
    </DefaultTemplate >
  )
}