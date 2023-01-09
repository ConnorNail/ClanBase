import { Image, Icon } from "atomize";
import getActivityIcon from "../../functions/getActivityIcon";

const PvEIcon = () => {
    const activityIcon = getActivityIcon(4110605575)
    const urlStart = "https://www.bungie.net"
    const iconPath = urlStart + activityIcon?.Response?.displayProperties?.icon

    return (
        <>
            {activityIcon ?
                <Image src={iconPath} h="3rem" w="auto" m={{ b: "0.25rem" }} />
                :
                <Icon name="Loading3" size="20px" color="cbGrey2" />}
        </>
    )
}

export default PvEIcon