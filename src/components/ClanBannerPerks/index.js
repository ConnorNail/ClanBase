import { Text, Div, Image, Icon, Row, Col } from "atomize";
import getClanBannerItem from "../../functions/useGetClanBannerItem";
import getClanBannerPerks from "../../functions/useGetClanBannerPerks";

export default function ClanLevel({ memberProfiles, clanInfo }) {

    const urlStart = "https://www.bungie.net"
    const clanCurentLevel = clanInfo?.Response?.detail?.clanInfo?.d2ClanProgressions[584850370]?.level

    let clanBannerHash
    if (memberProfiles) {
        for (let i = 0; i < memberProfiles.length; i++) {
            const characterId = memberProfiles[i]?.Response?.profile?.data?.characterIds[0]
            clanBannerHash = memberProfiles[i]?.Response?.characterEquipment?.data[characterId]?.items[12]?.itemHash

            if (clanBannerHash) {
                break
            }
        }
    }

    const clanBannerItem = getClanBannerItem(clanBannerHash)

    const clanBannerPerks = getClanBannerPerks(clanBannerItem)


    const levelsCompletedStyle = []

    if (clanCurentLevel) {
        for (let i = 0; i < 5; i++) {
            if (i < clanCurentLevel - 1) {
                levelsCompletedStyle.push("cbBlue")
            } else {
                levelsCompletedStyle.push("cbGrey2")
            }
        }
    }

    return (
        <Div d="flex" justify="center">
            {clanBannerPerks ?
                clanBannerPerks.map((perk, index) => (
                    index != 5 ?
                        <Div key={index} m={{ x: "1rem" }} w="4rem" d="flex" flexDir="column" align="center" rounded="md" border="3px solid" borderColor={levelsCompletedStyle[index]}>
                            <Image h="3rem" w="3rem" src={urlStart + perk?.Response?.displayProperties?.icon} alt="clan banner perks"/>
                            <Text textAlign="center" textColor="cbWhite" textSize="caption">
                                {perk?.Response?.displayProperties?.name}
                            </Text>
                        </Div> :
                        null
                )) :
                <Icon name="Loading3" size="30px" color="cbWhite" transform='translateY(15%)' />}
        </Div>
    )
}