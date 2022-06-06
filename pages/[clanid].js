import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../components/DefaultLayout'
import { Row, Col, Div, Text, Image, Container } from "atomize";

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key' : apikey }

export default function ClanPage({name, about, motto, memberCount, clanCallSign, d2ClanProgressions, clanBannerDetails}) {
  const [css] = useStyletron()

  const urlStart = 'https://www.bungie.net/'

  return (
    <DefaultTemplate>
      <Div>
        <Row>
          <Col size="2">
            <Div bg="brand900" rounded="md" m={{t: "2rem"}}>
              <Container bgImg={urlStart + clanBannerDetails.clanDecalBackgroundURL} bgSize="cover" bgPos="center">
                <Image src={urlStart + clanBannerDetails.clanDecalForegroundURL}/>
              </Container>
            </Div>
          </Col>
          <Col size="8">
            <Row m={{l: "0.5rem"}}>
              <Div rounded="md" shadow="5" border="3px solid" borderColor="brand900" m={{t: "2rem", b: "2rem"}}>
                <Text textSize="display2" textColor="brand900" m={{l: "2rem", r: "2rem"}}>
                  {name} [{clanCallSign}]
                </Text>
              </Div>
              <Div rounded="md" shadow="5" border="3px solid" borderColor="brand900">
                <Text textSize="title" textColor="brand900" m={{l: "1.5rem", r: "1.5rem"}}>
                  DESCRIPTION
                </Text>
                <Text textSize="subheader" textColor="brand900" m={{l: "1.5rem", r: "1.5rem"}}>
                  {memberCount} Members
                  <br/>
                  <br/>
                  "{motto}"
                  <br/>
                  <br/>
                  {about}
                </Text>
              </Div>
            </Row>
            <Row m={{l: "0.5rem"}}>
              <Div rounded="md" shadow="5" border="3px solid" borderColor="brand900" m={{t: "2rem", b: "2rem"}}>
                <Text textSize="title" textColor="brand900" m={{l: "1.5rem", r: "1.5rem"}}>
                  CLAN LEVEL
                </Text>
                <Text textSize="subheader" textColor="brand900" m={{l: "1.5rem", r: "1.5rem"}}>
                  LEVEL: {d2ClanProgressions.level}/{d2ClanProgressions.levelCap}
                  <br/>
                  TO NEXT LEVEL: {d2ClanProgressions.progressToNextLevel}/{d2ClanProgressions.nextLevelAt}
                  <br/>
                  WEEKLY XP EARNED: {d2ClanProgressions.weeklyProgress}/{d2ClanProgressions.weeklyLimit}
                  <br/>
                </Text>
              </Div>
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
  const url1 = 'https://www.bungie.net/Platform/GroupV2/'+clanid+'/' //House Fruit: 2084197 Fruit Snaccs: 4599535
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