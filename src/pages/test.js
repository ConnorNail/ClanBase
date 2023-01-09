import DefaultTemplate from '../components/DefaultLayout';
import getHeaders from '../functions/getHeaders';
import { useRouter } from 'next/router';
import getClanInfo from "../functions/getClanInfo";
import getClanMemberInfo from "../functions/getClanMemberProfileInfo/getClanMemberInfo";
import getAllMembersProfile from "../functions/getClanMemberProfileInfo/getAllMembersProfile";
import getClanMemberProfileInfo from "../functions/getClanMemberProfileInfo";
import getSeasonInfo from '../functions/getClanMemberStatsInfo/getSeasonInfo';
import getCurrentSeasonHash from '../functions/getClanMemberStatsInfo/getCurrentSeasonHash';
import getClanMembersAllTimeStats from "../functions/getClanMembersAllTimeStats";
import getAllCharacterStats from '../functions/getClanMemberStatsInfo/getAllCharacterStats';
import getClanBanner from '../functions/getClanBanner';
import ClanBannerSimple from '../components/ClanBannerSimple'
import InfoBox from '../components/InfoBox';
import Bracket from '../components/BracketSimple';
import { Container, Button, Text, Row, Col, Image, Div } from "atomize";
import createSubDateArray from '../functions/getClanMemberStatsInfo/createSubDateArray';
import calcMemberSeasonalTime from '../functions/calcMemberSeasonalTime';

export default function Test() {

    const profiles = getClanMemberProfileInfo(2084197)

    const currentSeasonHash = getCurrentSeasonHash();
    const currentSeasonInfo = getSeasonInfo(currentSeasonHash);
    const dateArray = createSubDateArray(currentSeasonInfo?.Response?.startDate, currentSeasonInfo?.Response?.endDate);

    const allCharacterStats = getAllCharacterStats(profiles, dateArray)

    const memberSeasonalTime = calcMemberSeasonalTime(allCharacterStats, profiles)

    console.log(memberSeasonalTime)

    // console.log(allCharacterStats)

    return (
        <DefaultTemplate>
            <InfoBox bg={'cbGrey1'}>

                {allCharacterStats?.data ? "DONE!" : "LOADING"}
            </InfoBox>
            {/* <ClanBannerSimple clanId={2084197}/> */}
            <div>API TEST SUCCESSFUL</div>
        </DefaultTemplate>
    )
}