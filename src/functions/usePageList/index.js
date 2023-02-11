import { useSession } from "next-auth/react"
import getIdsForCurrentUser from "../getIdsForCurrentUser"
import useGetUserInfo from "../useGetUserInfo"
import getGroupsForMember from "../useGetGroupsForMember"

const usePageList = () => {
    const { data, status } = useSession()

    return [
        {
            name: "LEADERBOARDS",
            link: "/clan-leaderboards"
        },
        {
            name: "MY CLAN",
            link: status == 'authenticated' ? "/clan-details" : "/signin"//clanId === null ? `/signin` : `/${clanId}`
        },
        {
            name: "COMPARE",
            link: "/clan-compare"
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