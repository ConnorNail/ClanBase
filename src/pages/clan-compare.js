import DefaultTemplate from '../components/DefaultLayout'
import ClanCard from '../components/ClanCard'
import InfoBox from '../components/InfoBox'
import CompareSearchBar from '../components/CompareSearchBar'
import { useRouter } from 'next/router'
import { Text, Row, Col, Div } from "atomize";
import Head from 'next/head';

export default function ClanCompare() {
    const router = useRouter()

    const maxCards = 4;

    // Get query string from URL
    const queryObj = router.query

    const clanids = []

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

    // Count the number of queries
    var clanCount = 0;
    if (Array.isArray(queryObj.clanids)) {
        clanCount = queryObj.clanids.length
        // clanids.push(...queryObj.clanids)
        for (let i = 0; i < clanCount; i++) {
            if (clanids.includes(queryObj.clanids[i])) {
                clanCount -= 1
                removeQuery(queryObj.clanids[i])
            } else {
                clanids.push(queryObj.clanids[i])
            }
        }
    } else if (typeof queryObj?.clanids !== 'undefined') {
        clanCount = 1
        clanids.push(queryObj.clanids)
    }

    return (
        <DefaultTemplate>
            <Head>
                <title>
                    Clan Compare | ClanBase
                </title>
                <meta
                    name="description"
                    content="Comapre Destiny 2 clan stats."
                    key="desc"
                />
            </Head>
            <Div p="2rem">
                {/* <InfoBox bg="cbGrey1"> */}
                <Col>
                    <Row>
                        {/* <Text textSize="title" p={{ b: "1rem" }} textColor="cbWhite">
                            CLAN COMPARE
                        </Text> */}
                    </Row>
                    <Row d="flex" justify="center">
                        {clanids.map((id, index) => (
                            <Div key={index}>
                                <ClanCard clanId={id} />
                            </Div>
                        ))}
                        {clanCount < maxCards ?
                            <InfoBox bg="cbGrey1" m="0.5rem">
                                <Div p={{ x: "1rem" }} h="37.65rem" w="14.5rem" d="flex" align="center auto">
                                    <Col>
                                        <Text textSize="title" p={{ b: "1rem" }} textAlign="center" textColor="cbWhite">
                                            Add a Clan
                                        </Text>
                                        <CompareSearchBar />
                                    </Col>
                                </Div>
                            </InfoBox> :
                            <></>
                        }
                    </Row>
                </Col>
                {/* </InfoBox> */}
            </Div>
        </DefaultTemplate>
    )
}