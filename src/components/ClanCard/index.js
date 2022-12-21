import { Div, Text, Row, Col, Button, Icon } from "atomize";
import InfoBox from '../InfoBox'
import { useRouter } from 'next/router';
import getClanInfo from "../../functions/getClanInfo";

const ClanCard = ({ clanId, stats }) => {

    const router = useRouter();

    const removeQuery = (value) => {
        const newQuery = router.query
        const finalList = []

        // If no queries exist then do nothing
        // If there is one query remove it
        // If there are more than one querie then remove the specific one that was selected
        if (Array.isArray(newQuery.clanids)) {
            const index = newQuery.clanids.indexOf(value);
            
            if (index > -1) { // only splice array when item is found
                newQuery.clanids.splice(index, 1); // 2nd parameter means remove one item only
            }

            finalList = newQuery.clanids
        } else if (Object.keys(newQuery).length == 1) {
            finalList = []
        }

        router.push({
            pathname: '/clan-compare',
            query: { clanids: finalList },
        });
    };

    const data = getClanInfo(clanId)

    return (
        <InfoBox>
            <Div p={{ x: "1rem" }} h="25rem">
                <Row>
                    <Col d="flex" align="center">
                        <Text textSize="title">
                            {data?.Response?.detail?.name}
                        </Text>
                    </Col>
                    <Col size="flex">
                        <Button
                            h="2.5rem"
                            w="2.5rem"
                            bg="danger700"
                            hoverBg="danger600"
                            rounded="circle"
                            shadow="2"
                            hoverShadow="4"
                            onClick={(e) => removeQuery(clanId)}
                        >
                            <Icon name="DeleteSolid" size="20px" color="cbWhite" />
                        </Button>
                    </Col>
                </Row>
                <Div bg="cbWhite" w="auto" h="0.1rem" m={{ y: "0.5rem" }}></Div>
                {/* {stats.map((stat, index) => (
                    <Row p={{ y: "0.5rem" }} key={index}>
                        <Col size="8" >
                            <Text textSize="subtitle" >
                                {stat.name}:
                            </Text>
                        </Col>
                        <Col d="flex" align="center">
                            <Text textSize="subtitle">
                                {stat.value}
                            </Text>
                        </Col>
                    </Row>
                ))} */}
            </Div>
        </InfoBox>
    )
}

export default ClanCard