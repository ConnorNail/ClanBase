import { Div, Text, Row, Col, Button, Icon, Input } from "atomize";
import Bracket from "../BracketSimple";
import CustomRadios from "../CustomRadios";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import MemberSearchBar from "../MemberSearchBar";
import setupMemberTimeChart from "../../functions/setupMemberTimeChart";

const MemberStatCard = ({ timeData, membersInfo, membersProfiles, membersAllTimeStats, memberIndex, setMemberIndex }) => {

    const [cleanDataPvE, cleanDataPvP] = setupMemberTimeChart(timeData)

    // console.log(timeData[memberIndex])

    // Individual member stats
    const memberInfo = membersInfo ? membersInfo?.Response?.results[memberIndex] : null
    const memberProfile = membersProfiles ? membersProfiles[memberIndex] : null
    const memberAllTimeStats = membersAllTimeStats ? membersAllTimeStats[memberIndex] : null

    // Display name
    const displayName = memberInfo?.bungieNetUserInfo?.supplementalDisplayName ? memberInfo?.bungieNetUserInfo?.supplementalDisplayName : memberInfo?.destinyUserInfo?.LastSeenDisplayName

    // Last online date
    const memberDate = memberProfile ? new Date(memberProfile?.Response?.profile?.data?.dateLastPlayed) : null
    const lastOnlineDate = memberDate ? ((memberDate.getMonth() > 8) ? (memberDate.getMonth() + 1) : ('0' + (memberDate.getMonth() + 1))) + '/' + ((memberDate.getDate() > 9) ? memberDate.getDate() : ('0' + memberDate.getDate())) + '/' + memberDate.getFullYear() : null

    // All time played and season time played
    let allTimePlayed = null
    let seasonTimePlayed = null
    let seasonTimePercentage = null
    if (memberAllTimeStats && timeData) {
        // All time
        const playtime = memberAllTimeStats?.Response?.allPvP?.allTime?.secondsPlayed?.basic?.value + memberAllTimeStats?.Response?.allPvE?.allTime?.secondsPlayed?.basic?.value
        const hours = Math.floor(playtime % (3600 * 24) / 3600);
        const days = Math.floor(playtime / (3600 * 24));

        const hoursDisplay = hours > 0 ? hours + (hours == 1 ? " hour " : " hours ") : "";
        const daysDisplay = days > 0 ? days + (days == 1 ? " day " : " days ") : "";

        allTimePlayed = daysDisplay + hoursDisplay

        // Seasonal
        // console.log(timeData[memberIndex]?.characterTime?.seasonal?.allPvE)
        const playtimeSeasonal = timeData[memberIndex]?.characterTime?.seasonal?.allPvE + timeData[memberIndex]?.characterTime?.seasonal?.allPvP
        const hoursSeasonal = Math.floor(playtimeSeasonal % (3600 * 24) / 3600);
        const daysSeasonal = Math.floor(playtimeSeasonal / (3600 * 24));

        const hoursDisplaySeasonal = hoursSeasonal > 0 ? hoursSeasonal + (hoursSeasonal == 1 ? " hour " : " hours ") : "";
        const daysDisplaySeasonal = daysSeasonal > 0 ? daysSeasonal + (daysSeasonal == 1 ? " day " : " days ") : "";

        seasonTimePlayed = daysDisplaySeasonal + hoursDisplaySeasonal

        // Percentage
        seasonTimePercentage = playtime != 0 ? (playtimeSeasonal / playtime * 100).toFixed(2) : 0
    }

    const [selectedValue, setSelectedValue] = useState('PvE');

    return (
        <Div d="flex" flexDir="column" p={{ x: "1rem" }}>
            <Row>
                <Col>
                <MemberSearchBar memberInfo={membersInfo} memberProfiles={membersProfiles} setMemberIndex={setMemberIndex}/>
                </Col>
            </Row>
            <Row bg="cbWhite" h="0.1rem" w="100%" m="0.1rem"></Row>
            <Row>
                <Text textSize="heading" textColor="cbWhite">
                    {displayName}
                </Text>
            </Row>
            <Row>
                <Col d="flex" align="center" size="5">
                    <Text textSize="subheader" textColor="cbWhite">
                        Last Online:
                    </Text>
                    <Text textSize="subheader" textColor="cbBlue" m={{ x: "0.25rem" }}>
                        {lastOnlineDate}
                    </Text>
                </Col>
                <Col d="flex" justify="center" flexDir="column">
                    <Row>
                        <Text textSize="body" textColor="cbWhite">
                            Time Played (All Time):
                        </Text>
                        <Text textSize="body" textColor="cbBlue" m={{ y: "0rem", x: "0.25rem" }}>
                            {allTimePlayed}
                        </Text>
                    </Row>
                    <Row>
                        <Text textSize="body" textColor="cbWhite">
                            Time Played (Seasonal):
                        </Text>
                        <Text textSize="body" textColor="cbBlue" m={{ y: "0rem", x: "0.25rem" }}>
                            {seasonTimePlayed}
                        </Text>
                        <Text textSize="body" textColor="cbGrey2" m={{ y: "0rem" }}>
                            {seasonTimePercentage}%
                        </Text>
                    </Row>
                </Col>
            </Row>
            <Row bg="cbWhite" h="0.1rem" w="100%" m="0.1rem"></Row>
            <Row>
                <Text textSize="title" textColor="cbGrey3" p={{ t: "0.25rem" }}>
                    Seasonal Time
                </Text>
            </Row>
            <Row>
                <CustomRadios selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
            </Row>

            <Bracket align="flex-start" />

            <Div>
                <Row>
                    {cleanDataPvE && cleanDataPvP ?
                        <AreaChart width={550} height={400} data={selectedValue == 'PvE' ? cleanDataPvE[memberIndex] : cleanDataPvP[memberIndex]} margin={{ top: 30, bottom: 55, right: 15, left: -25 }}>
                            <defs>
                                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#8884d8" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="time" stroke="#5DD7F2" strokeWidth="3" fill="url(#colorTime)" />
                            <XAxis angle="-45" textAnchor="end" dataKey="date" stroke="#D9D9D9" interval="preserveEnd" />
                            <YAxis stroke="#D9D9D9" />
                            <Tooltip />
                        </AreaChart>
                        :
                        null}
                </Row>
            </Div>
            <Bracket align="flex-end" />
        </Div>
    )
}

export default MemberStatCard