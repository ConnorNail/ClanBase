import DefaultTemplate from '../components/DefaultLayout'
import SearchBar from '../components/SearchBar'
import LoginButton from '../components/LoginButton'
import LoginButtonDiscord from '../components/LoginButtonDiscord'
import { useRouter } from 'next/router'
import { Container, Button, Text, Row, Col, Image, Div } from "atomize";

export default function Home() {
  const router = useRouter()

  return (
    <DefaultTemplate>
      <Div h="100vh" bgImg="../destinybackground.jpg" bgPos="top" bgSize="auto" bgRepeat="no-repeat" m={{ x: "-0.5rem", y: "-2.5rem" }}>
        <Div h="100vh" bgPos="center" d="flex">
          <Col size="2" d={{ xs: "none", md: "block" }}>
            <Div m={{ t: "10rem" }} d={{ xs: "none", md: "block" }}>
              <Div bg="cbWhite" h="3rem" w="0.1rem" m={{ l: "2.3rem" }}></Div>
              <Button m="1rem" h="2.5rem" w="2.5rem" p="0rem" shadow="5" bg="none" onClick={() => location.assign("https://twitter.com/clanbasedev")}>
                <Image src="twitter.svg" alt="twitter" />
              </Button>
              <Button m="1rem" h="2.5rem" w="2.5rem" p="0.5rem" shadow="5" bg="#5865F2" onClick={() => location.assign("https://discord.gg/WDQC97ybAV")}>
                <Image src="discord.svg" alt="discord" />
              </Button>
              <Button m="1rem" h="2.5rem" w="2.5rem" p="0rem" shadow="5" bg="#FF5E5B" onClick={() => location.assign("https://www.patreon.com/clanbase")}>
                <Image src="ko-fi.png" alt="ko-fi" />
              </Button>
              <Div bg="cbWhite" h="3rem" w="0.1rem" m={{ l: "2.3rem" }}></Div>
            </Div>
          </Col>

          <Col size={{ xs: "12", md: "8" }}>
            <Row d="flex" flexDir="column" align="center" p={{ t: "3rem" }}>
              <Text textSize="title" textAlign="center" textWeight="500" textColor="cbWhite" m={{ t: "3rem" }}>
                WELCOME TO
              </Text>
              <Text textSize="display3" textAlign="center" textWeight="700" textColor="cbWhite">
                CLANBASE
              </Text>
              <Text textSize="title" textAlign="center" textColor="cbWhite" m={{ b: "2rem" }} p={{ x: "1rem" }}>
                THE HOME BASE FOR ALL DESTINY CLANS
              </Text>
            </Row>

            <Row d={{ xs: "flex", md: "none" }} flexDir="column" align="center">
              <Row>
                <Text textSize="display1" textAlign="center" textColor="white">Connect With Us</Text>
              </Row>
              <Row>
                <Button m="1rem" h="2.5rem" w="2.5rem" p="0rem" shadow="5" bg="none" onClick={() => location.assign("https://twitter.com/clanbasedev")}>
                  <Image src="twitter.svg" alt="twitter" />
                </Button>
                <Button m="1rem" h="2.5rem" w="2.5rem" p="0.5rem" shadow="5" bg="#5865F2" onClick={() => location.assign("https://discord.gg/WDQC97ybAV")}>
                  <Image src="discord.svg" alt="discord" />
                </Button>
                <Button m="1rem" h="2.5rem" w="2.5rem" p="0rem" shadow="5" bg="#FF5E5B" onClick={() => location.assign("https://www.patreon.com/clanbase")}>
                  <Image src="ko-fi.png" alt="ko-fi" />
                </Button>
              </Row>
            </Row>
          </Col>
        </Div>
      </Div>
    </DefaultTemplate>
  )
}