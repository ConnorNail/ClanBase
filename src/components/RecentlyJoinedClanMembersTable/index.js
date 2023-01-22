import { Text, Div, Image, Icon, Row, Col } from "atomize";
import setupRecentMemberTable from "../../functions/setupRecentMemberTable";
import getAllMembersProfile from "../../functions/getClanMemberProfileInfo/getAllMembersProfile";
import Table from "../Table";

export default function RecentlyJoinClanMembersTable({ clanMemberInfo }) {

    let allMemberData = []
    const allMembers = clanMemberInfo?.Response?.results

    const newMemberCount = 7
    let newMembers = []
    let newMemberIndices = []

    // Find the newest members and add to newMembers
    if (allMembers) {
        for (let i = 0; i < newMemberCount; i++) {
            let newestTime = 0
            let newMemberIndex
            for (let j = 0; j < allMembers.length; j++) {
                const member = allMembers[j]
                const joinedDate = new Date(member?.joinDate)
                const currentTime = new Date()
                const diffTime = Math.abs(currentTime - joinedDate)

                if ((newestTime > diffTime || newestTime == 0) && !newMemberIndices.includes(j)) {
                    newestTime = diffTime
                    newMemberIndex = j
                }
            }
            newMembers.push(allMembers[newMemberIndex])
            newMemberIndices.push(newMemberIndex)
        }
    }

    const newMemberData = {Response: {
        results: newMembers
    }}

    const newMemberProfiles = getAllMembersProfile(newMemberData)

    let fullMemberData = []
    if (newMemberProfiles) {
        for (let i = 0; i < newMemberProfiles.length; i++) {
            const memberProfile = newMemberProfiles[i]?.Response?.profile
            const characterProfiles = newMemberProfiles[i]?.Response?.characters
            const bungieInfo = newMembers[i]?.bungieNetUserInfo
            const joinDate = newMembers[i]?.joinDate

            const entry = {
                memberProfile,
                characterProfiles,
                bungieInfo,
                joinDate
            }

            fullMemberData.push(entry)
        }
    }

    const [columns, data] = setupRecentMemberTable(fullMemberData)

    return (
        <Div d="flex" justify="center" align="center">
            { data.length != 0 ? <Table columns={columns} data={data} defaultSort={'joinDate'} desc={true}/> : <Icon name="Loading3" size="75px" color="cbWhite"/>}
        </Div>
    )
}