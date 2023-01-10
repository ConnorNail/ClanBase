import DefaultTemplate from '../components/DefaultLayout';
import getHeaders from '../functions/getHeaders';
import { useRouter } from 'next/router';
import getClanInfo from "../functions/getClanInfo";
import getClanMemberInfo from "../functions/getClanMemberProfileInfo/getClanMemberInfo";
import getAllMembersProfile from "../functions/getClanMemberProfileInfo/getAllMembersProfile";
import getClanMemberProfileInfo from "../functions/getClanMemberProfileInfo";
import getSeasonInfo from '../functions/getClanMemberCharacterSeasonalTimeStats/getSeasonInfo';
import getCurrentSeasonHash from '../functions/getClanMemberCharacterSeasonalTimeStats/getCurrentSeasonHash';
import getClanMembersAllTimeStats from "../functions/getClanMembersAllTimeStats";
import getAllCharacterStats from '../functions/getClanMemberCharacterSeasonalTimeStats/getAllCharacterStats';
import getClanBanner from '../functions/getClanBanner';
import ClanBannerSimple from '../components/ClanBannerSimple'
import InfoBox from '../components/InfoBox';
import Bracket from '../components/BracketSimple';
import { Container, Button, Text, Row, Col, Image, Div, Icon } from "atomize";
import createSubDateArray from '../functions/getClanMemberCharacterSeasonalTimeStats/createSubDateArray';
import calcMemberSeasonalTime from '../functions/calcMemberSeasonalTime';
import setupMemberTimeTable from '../functions/setupMemberTimeTable';
import Table from '../components/Table';
import getClanMemberCharacterSeasonalTimeStats from '../functions/getClanMemberCharacterSeasonalTimeStats';
import TimeTable from '../components/TimeTable';
import ClanLevel from '../components/ClanLevel';

export default function Test() {

    const memberInfo = getClanMemberInfo(2084197)
    const profiles = getClanMemberProfileInfo(2084197)
    const clanInfo = getClanInfo(2084197)

    console.log(clanInfo)

    

    return (
        <DefaultTemplate>
            <InfoBox bg={'cbGrey1'}>
                <ClanLevel clanInfo={clanInfo}/>
            </InfoBox>
        </DefaultTemplate>
    )
}