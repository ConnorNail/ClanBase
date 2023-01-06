import DefaultTemplate from '../components/DefaultLayout';
import getAuthInfo from '../functions/getAuthInfo';
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

export default function Test() {

    const profiles = getClanMemberProfileInfo(2084197)
    // const clanInfo = getClanInfo(2084197)
    // const data = getClanBanner(clanInfo)

    // console.log(data)

    // if (!data) return (
    //     <DefaultTemplate>
    //         <div>Loading...</div>
    //     </DefaultTemplate>
    // )

    return (
        <DefaultTemplate>
            <ClanBannerSimple clanId={2084197}/>
            <div>API TEST SUCCESSFUL</div>
        </DefaultTemplate>
    )
}