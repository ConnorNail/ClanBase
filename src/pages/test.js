import DefaultTemplate from '../components/DefaultLayout';
import InfoBox from '../components/InfoBox';
import { Container, Button, Text, Row, Col, Image, Div, Icon } from "atomize";
import React, { useState } from 'react';
import PlayerSearchBar from '../components/PlayerSearchBar';
import InvitedMembers from '../components/InvitedMembers';

export default function Test() {
    // const { data, status } = useSession()

    // const [memberIndex, setMemberIndex] = useState(0);

    // const memberInfo = getClanMemberInfo(2084197)
    // const profiles = getClanMemberProfileInfo(2084197)
    // const clanInfo = getClanInfo(2084197)
    // const clanMemberStats = getClanMembersAllTimeStats(memberInfo)

    // const currentSeasonHash = getCurrentSeasonHash();
    // const currentSeasonInfo = getSeasonInfo(currentSeasonHash);
    // const dateArray = createSubDateArray(currentSeasonInfo?.Response?.startDate, currentSeasonInfo?.Response?.endDate);

    // const allCharacterStats = getAllCharacterStats(profiles, dateArray)

    // const activityData = calcMemberSeasonalActivityTime(allCharacterStats, profiles, memberInfo)

    // console.log(activityData)

    return (
        <DefaultTemplate>
            {/* <Div d="flex">
                <Div m="0.5rem">
                    <InfoBox bg={'cbGrey1'}>
                        <ClanRoster clanMemberInfo={memberInfo} clanMemberProfiles={profiles} memberIndex={memberIndex} setMemberIndex={setMemberIndex} />
                    </InfoBox>
                </Div>
                <Div m="0.5rem">
                    <InfoBox bg={'cbGrey1'}>
                        <MemberStatCard timeData={activityData} membersInfo={memberInfo} membersProfiles={profiles} membersAllTimeStats={clanMemberStats} memberIndex={memberIndex} setMemberIndex={setMemberIndex} />
                    </InfoBox>
                </Div>
            </Div> */}
            <Div h="100rem">
                <InfoBox bg={'cbGrey1'}>
                    <PlayerSearchBar clanId={4993341} />
                </InfoBox>
                <InfoBox bg={'cbGrey1'}>
                    <InvitedMembers clanId={4993341} />
                </InfoBox>
            </Div>
        </DefaultTemplate>
    )
}