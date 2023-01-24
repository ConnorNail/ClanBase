import { Image, Icon } from "atomize";
import getActivityIcon from "../../functions/getActivityIcon";

const PvPIcon = () => {
    const activityIcon = getActivityIcon(1164760504)
    const urlStart = "https://www.bungie.net"
    const iconPath = urlStart + activityIcon?.Response?.displayProperties?.icon

    return (
        <>
            {activityIcon ?
                <Image src={iconPath} h="3rem" w="auto" m={{ b: "0.25rem" }} alt="PvP Icon"/>
                :
                <Icon name="Loading3" size="20px" color="cbGrey2" />}
        </>
    )
}

export default PvPIcon