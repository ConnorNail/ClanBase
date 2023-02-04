import DefaultTemplate from '../components/DefaultLayout'
import { useSession } from "next-auth/react"
import { Row, Col, Div } from "atomize";
import InfoBox from '../components/InfoBox';
import LoginButton from '../components/LoginButton';
import { useRouter } from 'next/router'
import LoginButtonDiscord from '../components/LoginButtonDiscord';

export default function Accounts() {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <DefaultTemplate>
      <Div d="flex" justify="center" h="40rem">
        <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
          <Row d="flex" justify="center">
            <Col size="auto">
              <Div border="1px solid" borderColor="cbWhite" rounded="md" m="5rem" p={{ y: "0.5rem" }}>
                <LoginButton />
              </Div>
              <Div border="1px solid" borderColor="cbWhite" rounded="md" m="5rem" p={{ y: "0.5rem" }}>
                <LoginButtonDiscord />
              </Div>
            </Col>
          </Row>
        </InfoBox>
      </Div>
    </DefaultTemplate>
  )
}