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
import calcClanStatScores from '../../functions/useCalcClanStatScores';
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
import ClanRosterMini from '../../components/ClanRosterMini';
import Head from 'next/head'

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

  const clanStatScores = calcClanStatScores(clanMemberStats, clanMemberProfiles, clanId)

  const memberSeasonalTimeStats = getClanMemberCharacterSeasonalTimeStats(clanMemberList, clanMemberProfiles)

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
        <Col size="11">
          <Row>
            <Col>
              <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
                <ClanPageMain clanId={clanId} clanInfo={clanInfo} clanStatScores={clanStatScores} router={router} />
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
          <Row>
            <Col>
              <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
                <Text textColor="cbWhite" textSize="heading" p={{ x: "0.5rem" }}>
                  Clan Banner Perks
                </Text>
                <ClanLevel clanInfo={clanInfo} />
                <ClanBannerPerks memberProfiles={clanMemberProfiles} clanInfo={clanInfo} />
              </InfoBox>
            </Col>
          </Row>
          <Row>
            <Col>
              <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
                <Text textColor="cbWhite" textSize="heading" p={{ x: "0.5rem" }}>
                  Roster
                </Text>
                <Row d="flex" justify="center">
                  <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
                </Row>
                <Div h="40.3rem">
                  <ScrollBox h={"40rem"}>
                    <Div d={{ xs: "none", sm: "block" }}>
                      <ClanRoster clanMemberInfo={clanMemberList} clanMemberProfiles={clanMemberProfiles} memberIndex={memberIndex} setMemberIndex={setMemberIndex} />
                    </Div>
                    <Div d={{ xs: "block", sm: "none" }}>
                      <ClanRosterMini clanMemberInfo={clanMemberList} clanMemberProfiles={clanMemberProfiles} />
                    </Div>
                  </ScrollBox>
                </Div>
                <Row d="flex" justify="center">
                  <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
                </Row>
              </InfoBox>
            </Col>
            <Col>
              <InfoBox bg={'cbGrey1'} m={{ y: "0.5rem" }}>
                <MemberStatCard timeData={memberSeasonalTimeStats} membersInfo={clanMemberList} membersProfiles={clanMemberProfiles} membersAllTimeStats={clanMemberStats} memberIndex={memberIndex} setMemberIndex={setMemberIndex} />
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
                <Div d={{ xs: "none", lg: "block" }}>
                  <ScrollBox h={"35rem"}>
                    <Div>
                      <TimeTable memberSeasonalTime={memberSeasonalTimeStats} />
                    </Div>
                  </ScrollBox>
                </Div>
                <Div d={{ xs: "block", lg: "none" }}>
                  <Text textColor="cbWhite" textSize="paragraph" p={{ x: "0.5rem" }}>
                    Data table is available on larger devices
                  </Text>
                </Div>
                <Row d="flex" justify="center">
                  <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
                </Row>
              </InfoBox>
            </Col>
          </Row> */}
        </Col>
      </Div >
    </DefaultTemplate >
  )
}