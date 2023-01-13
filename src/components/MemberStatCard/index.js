import { Div, Text, Row, Col, Button, Icon } from "atomize";
import InfoBox from '../InfoBox'
import { useRouter } from 'next/router';
import getClanInfo from "../../functions/getClanInfo";
import getClanMemberInfo from "../../functions/getClanMemberProfileInfo/getClanMemberInfo";
import getClanMembersAllTimeStats from "../../functions/getClanMembersAllTimeStats";
import getAllMembersProfile from '../../functions/getClanMemberProfileInfo/getAllMembersProfile';
import Bracket from "../BracketSimple";
import CustomRadios from "../CustomRadios";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const MemberStatCard = () => {
    const [selectedValuePvE, setSelectedValuePvE] = useState(true);
    const [selectedValuePvP, setSelectedValuePvP] = useState(true);

    const data = [{ date: '1/1/22', hoursPvE: 400, hoursPvP: 10 }, { date: '1/4/22', hoursPvE: 20, hoursPvP: 30 }, { date: '1/7/22', hoursPvE: 100, hoursPvP: 1 }, { date: '1/11/22', hoursPvE: 2, hoursPvP: 11 }];

    return (
        <Div d="flex" flexDir="column" p={{ x: "1rem" }}>
            <Row>
                <Col>
                    <Text textSize="title" textColor="cbWhite">
                        Member Name#1234
                    </Text>
                </Col>
                <Col>
                    CLAN MEMBER SEARCH BAR

                </Col>
            </Row>
            <Row>
                <Col d="flex" align="center">
                    <Text textSize="subheader" textColor="cbGrey3">
                        Last Online/Curent Activity
                    </Text>
                </Col>
                <Col>
                    <Row>
                        <Text textSize="body" textColor="cbGrey3">
                            Time Played:
                        </Text>
                        <Text textSize="body" textColor="cbBlue">
                            100
                        </Text>
                    </Row>
                    <Row>
                        <Text textSize="body" textColor="cbGrey3">
                            Seasonal Time Played:
                        </Text>
                        <Text textSize="body" textColor="cbBlue">
                            100
                        </Text>
                    </Row>
                </Col>
            </Row>
            <Row bg="cbWhite" h="0.1rem" w="100%" m="0.1rem"></Row>
            <Row>
                <CustomRadios selectedValuePvE={selectedValuePvE} setSelectedValuePvE={setSelectedValuePvE} selectedValuePvP={selectedValuePvP} setSelectedValuePvP={setSelectedValuePvP} />
            </Row>
            <Bracket align="flex-start" />
            <Div>
                <Row>
                    <Text textSize="heading" textColor="cbGrey3">
                        Seasonal Time
                    </Text>
                </Row>

                <Row m={{ x: "1rem" }}>
                    <Div>
                        <LineChart width={500} height={400} data={data}>
                            {selectedValuePvE == true ?
                                <Line type="monotone" dataKey="hoursPvE" stroke="#5DD7F2" />
                                :
                                null}
                            {selectedValuePvP == true ?
                                <Line type="monotone" dataKey="hoursPvP" stroke="#5DD7F2" />
                                :
                                null}
                            <XAxis dataKey="date" stroke="#D9D9D9" />
                            <YAxis stroke="#D9D9D9" />
                            <Tooltip />
                        </LineChart>
                    </Div>
                </Row>
            </Div>
            <Bracket align="flex-end" />
        </Div>
    )
}

export default MemberStatCard