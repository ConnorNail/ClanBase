import { Input, Icon, Dropdown, Div, Anchor, Col, Text, Image } from "atomize";
import DiscordTimeTable from "../DiscordTimeTable";

export default function ClanTimeStats({ memberSeasonalTimeStats }) {

    return (
        <Div p={{ x: "1rem", y: "0.5rem" }} d="flex" flexDir="column" flexWrap="wrap">
            <Text textColor="cbWhite" textSize="heading">
                Member Time Log
            </Text>
            <DiscordTimeTable memberSeasonalTime={memberSeasonalTimeStats}/>
        </Div>
    )
}