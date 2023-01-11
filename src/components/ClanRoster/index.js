import { Text, Div, Image, Icon, Row, Col } from "atomize";
import Table from "../Table";
import setupRosterTable from "../../functions/setupRosterTable";

export default function RecentlyJoinClanMembersTable({ clanMemberInfo, clanMemberProfiles }) {

    let fullMemberData = []
    const clanMemberInfoList = clanMemberInfo?.Response?.results

    if (clanMemberInfoList && clanMemberProfiles) {
        for (let i = 0; i < clanMemberProfiles.length; i++) {
            const memberProfile = clanMemberProfiles[i]?.Response?.profile
            const characterProfiles = clanMemberProfiles[i]?.Response?.characters
            const bungieInfo = clanMemberInfoList[i]?.bungieNetUserInfo
            const isOnline = clanMemberInfoList[i]?.isOnline === true ? "Online" : "Offline"

            console.log(isOnline)
            const entry = {
                memberProfile,
                characterProfiles,
                bungieInfo,
                isOnline
            }

            fullMemberData.push(entry)
        }

        console.log(fullMemberData)
    }

    const [columns, data] = setupRosterTable(fullMemberData)

    return (
        <Div d="flex" justify="center" align="center">
            {data.length != 0 ? <Table columns={columns} data={data} defaultSort={'isOnline'} desc={true} /> : <Icon name="Loading3" size="75px" color="cbWhite" />}
        </Div>
    )
}