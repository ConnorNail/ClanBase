import DefaultTemplate from '../components/DefaultLayout'
import { Text, Row, Col, Anchor, Div } from "atomize";
import InfoBox from '../components/InfoBox';

export default function Privacy() {

  function Title({ children }) {
    return (
      <Text textColor="cbWhite" textSize="title" tag="li" m={{ t: "0.5rem" }}>
        {children}
      </Text>
    )
  }

  function Body({ children }) {
    return (
      <Text textColor="cbWhite" textSize="paragraph">
        {children}
      </Text>
    )
  }

  return (
    <DefaultTemplate>
      <Div d="flex" justify="center">
        <Col size={{ xs: "11", md: "8"}}>
          <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
            <Div tag="ol">
              <Title>Introduction</Title>
              <Body>This Privacy Policy is the governing and controlling instrument in the event of any conflict between its English language version and any subsequent translation into any other language. ClanBase is a free, community-created service for the video game, Destiny 2, and this policy outlines how the application uses your data. The developer may periodically update this Privacy Policy to reflect changes in their privacy practices, and you are encouraged to review it regularly.</Body>

              <Title>Information Collected by the Developers</Title>
              <Body>ClanBase utilizes your platform-specific profile information to display your Destiny profile. The application also collects data on your usage of its services, including IP address, imprecise geographical location, browser information, operating system, referral source, length of visit, page views, and navigation paths. Information on the timing, frequency, and pattern of your service use may also be collected.</Body>

              <Title>Use of Personal Data</Title>
              <Body>
                ClanBase uses the Bungie.net API to display and manipulate Destiny game information. The only information the application receives or has access to is your game information (e.g. items, characters) and basic account information such as your Bungie.net membership ID and linked service identifiers (e.g. PSN, Xbox Live, Steam, Stadia, Blizzard, or Bungie.net usernames). ClanBase does not have access to your personal information such as name, address, payment information, or any other data held by Bungie or game platforms. The use of the Bungie.net API is governed by the <Anchor href="https://www.bungie.net/7/en/Legal/terms" target="_blank" textColor="cbBlue" hoverTextColor="cbBlue">Terms of Use</Anchor> and <Anchor href="https://www.bungie.net/7/en/Legal/privacypolicy" target="_blank" textColor="cbBlue" hoverTextColor="cbBlue">Privacy Policy</Anchor> of Bungie.net.
              </Body>

              <Title>Discord</Title>
              <Body>The data provided by you to associate your Destiny profile with your Discord account is used solely for this purpose and is stored securely.</Body>

              <Title>Usage Data</Title>
              <Body>This usage data may be processed to analyze the use of the website and services. The processing is based on either your consent or our legitimate interests in monitoring and improving our website and services.</Body>

              <Title>Contact Information</Title>
              <Body>If you have any questions or concerns regarding ClanBase&apos;s Privacy Policy, please contact the developer at <Anchor href="mailto: clanbasedev@gmail.com" target="_blank" textColor="cbBlue" hoverTextColor="cbBlue">clanbasedev@gmail.com</Anchor>.</Body>

              <Title>Effective Date</Title>
              <Body>This Privacy Policy is effective as of January 31, 2023.</Body>
            </Div>
          </InfoBox>
        </Col>
      </Div>
    </DefaultTemplate>
  )
}