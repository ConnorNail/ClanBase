import { Input, Icon, Dropdown, Div, Anchor, Col, Text, Image } from "atomize";
import DiscordTimeTable from "../DiscordTimeTable";

export default function ClanTimeStats({ memberSeasonalTimeStats }) {

    return (
        <Div p={{ x: "1rem", y: "0.5rem" }} d="flex" flexDir="column" flexWrap="wrap">
            <Text textColor="cbWhite" textSize="heading">
                Member Seasonal Time Log
            </Text>
            <Div m={{ t: "1rem" }} d={{ xs: "none", lg: "inline" }}>
                <DiscordTimeTable memberSeasonalTime={memberSeasonalTimeStats} />
            </Div>
            <Div m={{ t: "1rem" }} d={{ xs: "inline", lg: "none" }}>
                <Text textColor="cbWhite" m="0.5rem" textSize="subheader">
                    A larger device is required to view this table.
                </Text>
            </Div>
        </Div>
    )
}