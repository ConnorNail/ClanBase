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

export default function Test() {

    const profiles = getClanMemberProfileInfo(2084197)
    const data = getClanMemberInfo(2084197)

    const seasonHash = getCurrentSeasonHash()
    const season = getSeasonInfo(seasonHash)
    const stats = getClanMembersAllTimeStats(data)

    console.log(stats)

    if (!data) return (
        <DefaultTemplate>
            <div>Loading...</div>
        </DefaultTemplate>
    )

    return (
        <DefaultTemplate>
            <div>API TEST SUCCESSFUL</div>
        </DefaultTemplate>
    )
}