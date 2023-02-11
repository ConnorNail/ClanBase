import { useSession } from "next-auth/react"
import getIdsForCurrentUser from "../getIdsForCurrentUser"
import useGetUserInfo from "../useGetUserInfo"
import getGroupsForMember from "../useGetGroupsForMember"

const usePageList = () => {
    const { data, status } = useSession()

    const userData = useGetUserInfo(status)

    const ids = getIdsForCurrentUser(userData)
    const groupInfo = getGroupsForMember(ids.membershipId, ids.membershipType)

    const clanId = groupInfo ? groupInfo?.Response?.results[0]?.group?.groupId : null

    return [
        {
            name: "MY CLAN",
            link: "/clan-details"//clanId === null ? `/signin` : `/${clanId}`
        },
        {
            name: "COMPARE",
            link: "/clan-compare"
        },
        {
            name: "LEADERBOARDS",
            link: "/clan-leaderboards"
        },
        {
            name: "DISCORD BOT",
            link: "/discord"
        },
        {
            name: "ABOUT US",
            link: "/about-us"
        }
    ]
}

export default usePageList;