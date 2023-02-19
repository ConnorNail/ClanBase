import DefaultTemplate from '../components/DefaultLayout'
import { useSession } from "next-auth/react"
import { Row, Col, Div } from "atomize";
import InfoBox from '../components/InfoBox';
import LoginButton from '../components/LoginButton';
import { useRouter } from 'next/router'
import Head from 'next/head';

export default function Signin() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  if (session) {
    router.push('/clan-details')
  }
  

  return (
    <DefaultTemplate>
      <Head>
        <title>
          Sign In | ClanBase
        </title>
        <meta
          name="description"
          content="Sign into ClanBase the home base for all Destiny 2 clans."
          key="desc"
        />
      </Head>
      <Div d="flex" justify="center" h="40rem">
        <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
          <Row d="flex" justify="center">
            <Col size="auto">
              <Div border="1px solid" borderColor="cbWhite" rounded="md" m="5rem">
                <LoginButton />
              </Div>
            </Col>
          </Row>
        </InfoBox>
      </Div>
    </DefaultTemplate>
  )
}