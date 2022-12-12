import { Div, Text, Row, Col } from "atomize";
import InfoBox from '../InfoBox'

const ClanCard = ({ clanName, stats }) => {
    return (
        <InfoBox>
            <Div p={{ x: "1rem" }} h="25rem">
                <Row>
                    <Text textSize="title">
                        {clanName}
                    </Text>
                </Row>
                <Div bg="cbWhite" w="auto" h="0.1rem" m={{ y: "0.5rem" }}></Div>
                {stats.map((stat, index) => (
                    <Row p={{ y: "0.5rem" }}>
                        <Col size="9">
                            <Text textSize="subtitle">
                                {stat.name}:
                            </Text>
                        </Col>
                        <Col d="flex" align="center">
                            <Text textSize="subtitle">
                                {stat.value}
                            </Text>
                        </Col>
                    </Row>
                ))}
            </Div>
        </InfoBox>
    )
}

export default ClanCard