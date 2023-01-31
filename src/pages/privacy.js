import DefaultTemplate from '../components/DefaultLayout'
import { Container, Button, Text, Row, Col, Image, Div } from "atomize";
import InfoBox from '../components/InfoBox';

export default function Privacy() {

  return (
    <DefaultTemplate>
      <Div d="flex" justify="center">
        <Col size="11">
          <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
            <Text textColor="cbWhite" textSize="heading" p={{ x: "0.5rem" }}>
              Priacy Policy
            </Text>
            <Row d="flex" justify="center">
              <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
            </Row>
            <Div p="1rem">
              <Text textSize="subheader" textColor="cbWhite" >
                1. Introduction
              </Text>
              <Text textSize="subheader" textColor="cbWhite" m="0.5rem">
                For all purposes, this English language version of this Privacy Policy shall be the original, governing instrument, and understanding of the parties. In the event of any conflict between this English language version of this Privacy Policy and any subsequent translation into any other language, this English language version shall govern and control.
              </Text>
              <Text textSize="subheader" textColor="cbWhite" m="0.5rem">
                ClanBase is a free team-made service for Destiny 2, the video game. This privacy policy explains how this application uses your data.
              </Text>
              <Text textSize="subheader" textColor="cbWhite" m="0.5rem">
                ClanBase is constantly improving, and the developer may modify this Privacy Policy from time to time to reflect changes in their privacy practices. You are encouraged to review this Privacy Policy periodically and to check the date at the end of the Privacy Policy for the most recent version.
              </Text>
            </Div>
            <Div p="1rem">
              <Text textSize="subheader" textColor="cbWhite" >
                2. Information the Developers Collect
              </Text>
              <Text textSize="subheader" textColor="cbWhite" m="0.5rem">
                Information provided by you:
              </Text>
              <Div tag="ul">
                <Text textSize="subheader" textColor="cbWhite" tag="li" m="0.5rem">
                  Your platform-specific profile information is used to load and display your Destiny profile.
                </Text>
                <Text textSize="subheader" textColor="cbWhite" tag="li" m="0.5rem">
                  Patrons of ClanBase may also optionally provide their email address to associate their Destiny profile with their Patreon account to receive the appropriate flair for their Patreon pledge.
                </Text>
                <Text textSize="subheader" textColor="cbWhite" tag="li" m="0.5rem">
                  Information the developer automatically collects
                </Text>
              </Div>
            </Div>
            <Row d="flex" justify="center">
              <Div bg="cbWhite" w="95%" h="0.1rem" m={{ y: "0.5rem" }}></Div>
            </Row>
          </InfoBox>
        </Col>
      </Div>
    </DefaultTemplate>
  )
}