import { Image, Icon } from "atomize";
import getEngramIcon from "../../functions/getEngramIcon";

const EngramIcon = () => {
    const engramItem = getEngramIcon(66825403)
    const urlStart = "https://www.bungie.net"
    const iconPath = urlStart + engramItem?.Response?.displayProperties?.icon

    return (
        <>
            {engramItem ?
                <Image src={iconPath} h="3rem" w="auto" m={{ b: "0.25rem" }} />
                :
                <Icon name="Loading3" size="20px" color="cbGrey2" />}
        </>
    )
}

export default EngramIcon