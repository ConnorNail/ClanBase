import { Div, Text, Row, Col, Button, Icon, Image, Container } from "atomize";
import InfoBox from '../InfoBox'
import { useRouter } from 'next/router';
import getClanInfo from "../../functions/getClanInfo";
import getClanMemberInfo from "../../functions/getClanMemberProfileInfo/getClanMemberInfo";
import getClanMembersAllTimeStats from "../../functions/getClanMembersAllTimeStats";
import getAllMembersProfile from '../../functions/getClanMemberProfileInfo/getAllMembersProfile';
import getClanBanner from "../../functions/getClanBanner";

const ClanBannerSimple = ({ clanId }) => {
    const clanInfo = getClanInfo(clanId)
    const clanBannerData = getClanBanner(clanInfo)
    const urlStart = 'https://www.bungie.net/'

    console.log(clanBannerData)

    return (
        <Container bgImg={urlStart + clanBannerData.clanDecalBackgroundURL} bgSize="cover" bgPos="center" w="25rem" h="25rem">
            <Image src={urlStart + clanBannerData.clanDecalForegroundURL} alt="clan banner" />
        </Container>
    )
}

export default ClanBannerSimple