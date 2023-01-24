import { Input, Icon, Dropdown, Div, Anchor, Col, Text, Image } from "atomize";
import BannedPlayerCard from '../BannedPlayerCard';
import getClanMemberInfo from "../../functions/getClanMemberProfileInfo/useGetClanMemberInfo";
import AdminRosterPlayerCard from "../AdminRosterPlayerCard";

const AdminRoster = ({ clanId, curentMemberType }) => {

    const { data: members, mutate: mutateMembers } = getClanMemberInfo(clanId)
    const memberList = members?.Response?.results
    const memberCount = memberList ? memberList.length : null

    // Sort into roles
    let memberBeginnerList
    let memberMemberList
    let memberAdminList
    let memberActingFounderList
    let memberFounderList

    if (memberList) {
        memberBeginnerList = []
        memberMemberList = []
        memberAdminList = []
        memberActingFounderList = []
        memberFounderList = []
        for (let i = 0; i < memberList.length; i++) {
            const memberType = memberList[i]?.memberType
            // None: 0, Beginner: 1, Member: 2, Admin: 3, ActingFounder: 4, Founder: 5
            switch (memberType) {
                case 1:
                    memberBeginnerList.push(memberList[i])
                    break
                case 2:
                    memberMemberList.push(memberList[i])
                    break
                case 3:
                    memberAdminList.push(memberList[i])
                    break
                case 4:
                    memberActingFounderList.push(memberList[i])
                    break
                case 5:
                    memberFounderList.push(memberList[i])
                    break
            }
        }
    }

    function Roster({ list, name }) {
        return (
            <>
                {list ?
                    list.length > 0 ?
                        <>
                            <Text textColor="cbWhite" textSize="title">
                                {name}
                            </Text>
                            {list.map((member, index) => (
                                <Div key={index}>
                                    <AdminRosterPlayerCard clanId={clanId} playerInfo={member} curentMemberType={curentMemberType} mutate={mutateMembers} />
                                </Div>
                            ))}
                        </>
                        :
                        null
                    :
                    null
                }
            </>
        )
    }

    return (
        <Div p={{ x: "1rem", y: "0.5rem" }} d="flex" flexDir="column" flexWrap="wrap">
            <Text textColor="cbWhite" textSize="heading">
                Roster ({memberCount ? memberCount : null}/100)
            </Text>
            <Roster list={memberFounderList} name={'Founder'} />
            <Roster list={memberActingFounderList} name={'Acting Founder'} />
            <Roster list={memberAdminList} name={'Admins'} />
            <Roster list={memberMemberList} name={'Members'} />
            <Roster list={memberBeginnerList} name={'Beginners'} />
        </Div>
    )
}

export default AdminRoster