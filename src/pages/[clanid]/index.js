import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../../components/DefaultLayout'
import InfoBox from '../../components/InfoBox'
import SearchBar from '../../components/SearchBar'
import getClanMemberInfo from '../../functions/getClanMemberInfo';
import setupRosterTable from "../../functions/setupRosterTable";
import getAllMembersProfile from '../../functions/getAllMembersProfile';
import Table from "../../components/Table";
import getAuthInfo from '../../functions/getAuthInfo'
import { Row, Col, Div, Text, Image, Container, Anchor, Icon } from "atomize";
import Link from 'next/link'

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key': apikey }

export default function ClanPage({ clanId, name, about, motto, memberCount, clanCallSign, d2ClanProgressions, clanBannerDetails }) {
  const [css] = useStyletron()

  const urlStart = 'https://www.bungie.net/'

  const headers = getAuthInfo();
  
  const clanMemberInfo = getClanMemberInfo(clanId, headers)
  const clanMemberProfileInfo = getAllMembersProfile(clanMemberInfo, headers)
  const [rosterColumns, rosterData] = setupRosterTable(clanMemberProfileInfo)

  return (
    <DefaultTemplate>
      <Div bgImg="../../destinyimage2.png" bgPos="top" bgSize="auto" bgRepeat="no-repeat">
        <Container d="flex" flexDir="column" align="space-around">
          <SearchBar />
        </Container>
        <Row d="flex" flexDir="column" align="space-around" m={{ l: "2rem", r: "2rem" }}>
          <InfoBox>
            <Row>
              <Text textSize="title" textColor="white" m={{ l: "2rem", r: "2rem" }}>
                CLAN LEVEL
              </Text>
            </Row>
            <Row>
              <Col size="2">
                <Div bg="brand900" rounded="md" m="1rem">
                  <Container bgImg={urlStart + clanBannerDetails.clanDecalBackgroundURL} bgSize="cover" bgPos="center">
                    <Image src={urlStart + clanBannerDetails.clanDecalForegroundURL} alt="clan banner"/>
                  </Container>
                </Div>
              </Col>
              <Col size="3">
                <Row>
                  <Text textSize="title" textColor="white" p="0.5rem">
                    {name} [{clanCallSign}]
                  </Text>
                </Row>
                <Row>
                  <Text style={{ whiteSpace: "pre-line" }} textSize="h1" textColor="white" p="0.5rem">
                    {about}
                  </Text>
                </Row>
                <Row>
                  <Col size="1">
                    <Icon
                      name="UserSolid"
                      size="25px"
                      color="white"
                    />
                  </Col>
                  <Col size="1">
                    <Text style={{ whiteSpace: "pre-line" }} textSize="h1" textColor="#D6BF27" p="0.5rem">
                      {memberCount}
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ whiteSpace: "pre-line" }} textSize="h1" textColor="white" p="0.5rem">
                      Members
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col size="2">

              </Col>
              <Col size="4">

              </Col>
              <Col size="1">

              </Col>
            </Row>
          </InfoBox>
        </Row>
        <Row m={{ l: "2rem", r: "2rem" }}>
          <InfoBox>
            <Table columns={rosterColumns} data={rosterData}/>
          </InfoBox>
        </Row>
        <Row>
          <InfoBox>
            <Link href={"/" + clanId + "/members"}>
              <Anchor textSize="display1" textColor="brand900" hoverTextColor="black800" m="2rem">MEMBERS</Anchor>
            </Link>
          </InfoBox>
        </Row>
        <Row>
          <Col size="2">

          </Col>
          <Col size="8">
            <Row m={{ l: "0.5rem" }}>
              <InfoBox>
                <Text textSize="display2" textColor="brand900" m={{ l: "2rem", r: "2rem" }}>
                  {name} [{clanCallSign}]
                </Text>
              </InfoBox>
            </Row>
            <Row m={{ l: "0.5rem" }}>
              <InfoBox>
                <Text textSize="title" textColor="brand900" m={{ l: "1.5rem", r: "1.5rem" }}>
                  DESCRIPTION
                </Text>
                <Text style={{ whiteSpace: "pre-line" }} textSize="subheader" textColor="brand900" m={{ l: "1.5rem", r: "1.5rem" }}>
                  {memberCount} Members
                  <br />
                  <br />
                  &quot;{motto}&quot;
                  <br />
                  <br />
                  {about}
                </Text>
              </InfoBox>
            </Row>
            <Row m={{ l: "0.5rem" }}>
              <InfoBox>
                <Text textSize="title" textColor="brand900" m={{ l: "1.5rem", r: "1.5rem" }}>
                  CLAN LEVEL
                </Text>
                <Text textSize="subheader" textColor="brand900" m={{ l: "1.5rem", r: "1.5rem" }}>
                  LEVEL: {d2ClanProgressions.level}/{d2ClanProgressions.levelCap}
                  <br />
                  TO NEXT LEVEL: {d2ClanProgressions.progressToNextLevel}/{d2ClanProgressions.nextLevelAt}
                  <br />
                  WEEKLY XP EARNED: {d2ClanProgressions.weeklyProgress}/{d2ClanProgressions.weeklyLimit}
                  <br />
                </Text>
              </InfoBox>
            </Row>
          </Col>
          <Col size="2">
          </Col>
        </Row>
      </Div>
    </DefaultTemplate>
  )
}

export async function getServerSideProps(context) {
  const { clanid } = context.query
  const url1 = 'https://www.bungie.net/Platform/GroupV2/' + clanid + '/' //House Fruit: 2084197 Fruit Snaccs: 4599535
  const url2 = 'https://www.bungie.net/Platform/Destiny2/Clan/ClanBannerDictionary/'

  // Clan details
  const res1 = await fetch(url1, { headers })
  const json1 = await res1.json()

  // Clan banner IDs
  const res2 = await fetch(url2, { headers })
  const json2 = await res2.json()

  const decalId = json1.Response.detail.clanInfo.clanBannerData.decalId
  const decalColorId = json1.Response.detail.clanInfo.clanBannerData.decalColorId
  const decalBackgroundColorId = json1.Response.detail.clanInfo.clanBannerData.decalBackgroundColorId
  const gonfalonId = json1.Response.detail.clanInfo.clanBannerData.gonfalonId
  const gonfalonColorId = json1.Response.detail.clanInfo.clanBannerData.gonfalonColorId
  const gonfalonDetailId = json1.Response.detail.clanInfo.clanBannerData.gonfalonDetailId
  const gonfalonDetailColorId = json1.Response.detail.clanInfo.clanBannerData.gonfalonDetailColorId

  return {
    props: {
      clanId: clanid,
      name: json1.Response.detail.name,
      about: json1.Response.detail.about,
      motto: json1.Response.detail.motto,
      memberCount: json1.Response.detail.memberCount,
      clanCallSign: json1.Response.detail.clanInfo.clanCallsign,
      d2ClanProgressions: {
        dailyProgress: json1.Response.detail.clanInfo.d2ClanProgressions[584850370].dailyProgress,
        weeklyProgress: json1.Response.detail.clanInfo.d2ClanProgressions[584850370].weeklyProgress,
        weeklyLimit: json1.Response.detail.clanInfo.d2ClanProgressions[584850370].weeklyLimit,
        currentProgress: json1.Response.detail.clanInfo.d2ClanProgressions[584850370].currentProgress,
        level: json1.Response.detail.clanInfo.d2ClanProgressions[584850370].level,
        levelCap: json1.Response.detail.clanInfo.d2ClanProgressions[584850370].levelCap,
        progressToNextLevel: json1.Response.detail.clanInfo.d2ClanProgressions[584850370].progressToNextLevel,
        nextLevelAt: json1.Response.detail.clanInfo.d2ClanProgressions[584850370].nextLevelAt,
      },
      clanBannerDetails: {
        clanDecalForegroundURL: json2.Response.clanBannerDecals[decalId].foregroundPath,
        clanDecalBackgroundURL: json2.Response.clanBannerDecals[decalId].backgroundPath,
        clanDecalColors: json2.Response.clanBannerDecalPrimaryColors[decalColorId],
        clanDecalBackgroundColors: json2.Response.clanBannerDecalSecondaryColors[decalBackgroundColorId],
        clanGonfalonURL: json2.Response.clanBannerGonfalons[gonfalonId],
        clanGonfalonColors: json2.Response.clanBannerGonfalonColors[gonfalonColorId],
        clanGonfalonDetailsURL: json2.Response.clanBannerGonfalonDetails[gonfalonDetailId],
        clanGonfalonDetailsColors: json2.Response.clanBannerGonfalonDetailColors[gonfalonDetailColorId],
      },
    },
  }
}