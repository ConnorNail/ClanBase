import { Div, Icon, Image } from "atomize";
import getClanInfo from "../../functions/useGetClanInfo";
import getClanBanner from "../../functions/useGetClanBanner";

const ClanBannerSimple = ({ clanId }) => {
    const clanInfo = getClanInfo(clanId)
    const clanBannerData = getClanBanner(clanInfo)
    const urlStart = 'https://www.bungie.net/'

    // console.log(clanBannerData)

    return (
        <>
            {clanBannerData.clanDecalBackgroundURL && clanBannerData.clanDecalForegroundURL ?
                <Div d="flex">
                    <Div bgImg={urlStart + clanBannerData.clanDecalBackgroundURL} bgSize="cover" bgPos="center" border={{ x: "1.5px solid" }} borderColor="cbWhite" w="13rem" m={{ b: "auto" }}>
                        <Image src={urlStart + clanBannerData.clanDecalForegroundURL} alt="clan banner" />
                    </Div>
                </Div>
                :
                <Icon name="Loading3" size="20px" color="cbGrey2" />}
        </>
    )
}

export default ClanBannerSimple