import { Text, Div, Image, Icon, Row, Col } from "atomize";
import Table from "../Table";
import usetupRosterTableMini from "../../functions/useSetupRosterTableMini";

export default function ClanRosterMini({ clanMemberInfo, clanMemberProfiles }) {

    let fullMemberData = []
    const clanMemberInfoList = clanMemberInfo?.Response?.results

    if (clanMemberInfoList && clanMemberProfiles) {
        for (let i = 0; i < clanMemberProfiles.length; i++) {
            const memberProfile = clanMemberProfiles[i]?.Response?.profile
            const characterProfiles = clanMemberProfiles[i]?.Response?.characters
            const bungieInfo = clanMemberInfoList[i]?.bungieNetUserInfo
            const isOnline = clanMemberInfoList[i]?.isOnline === true ? "Online" : "Offline"

            const entry = {
                memberProfile,
                characterProfiles,
                bungieInfo,
                isOnline
            }

            // Format date for roster table
            const date = new Date()
            const memberDate = new Date(entry.memberProfile.data.dateLastPlayed)
            const dateDiff = Math.trunc((date - memberDate) / 1000 / 60 / 60 / 24)
            entry.daysSinceLastPlayed = isOnline == "Online" ? -1 : dateDiff

            fullMemberData.push(entry)
        }
    }

    const [columns, data] = usetupRosterTableMini(fullMemberData)

    return (
        <Div d="flex" justify="center" align="center">
            {data.length != 0 ? <Table columns={columns} data={data} defaultSort={'daysSinceLastPlayed'} desc={false} /> : <Icon name="Loading3" size="75px" color="cbWhite" />}
        </Div>
    )
}