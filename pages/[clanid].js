import { useRouter } from 'next/router'
import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../components/DefaultLayout'
import { Row, Col, Div, Text } from "atomize";

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const url = 'https://www.bungie.net/Platform/GroupV2/2084197/'; //4599535 Fruit Snaccs
const headers = { 'X-API-Key' : apikey }

export default function ClanPage({name, about, motto, memberCount}) {
  const [css] = useStyletron()

  return (
    <DefaultTemplate>
      <Div>
        <Col size="8">
            <Row>
              <Div rounded="md" shadow="5" m={{t: "2rem", b: "2rem"}}>
                <Text textSize="display2" textColor="black" m={{l: "2rem", r: "2rem"}}>{name}</Text>
              </Div>
            </Row>
            <Div bg="brand900" rounded="md" border="3px solid" borderColor="black">
              <Row>
                <Text textSize="body" textColor="black" m={{l: "1rem"}}>
                  Members: {memberCount}/100{'\n'}
                </Text>
              </Row>
              <Row>
                <Text textSize="body" textColor="black" m={{l: "1rem"}}>
                  {motto}
                </Text>
              </Row>
              <Row>
                <Text textSize="body" textColor="black" m={{l: "1rem"}}>
                  {about}
                </Text>
              </Row>
            </Div>
        </Col>
        <Col size="4">
        </Col>
      </Div>
    </DefaultTemplate>
  )
}

export async function getServerSideProps() {
  const router = useRouter()
  const { clanid } = router.query

  const res = await fetch(url, { headers })
  const json = await res.json()

  return {
    props: {
      name: json.Response.detail.name,
      about: json.Response.detail.about,
      motto: json.Response.detail.motto,
      memberCount: json.Response.detail.memberCount,
    },
  }
}