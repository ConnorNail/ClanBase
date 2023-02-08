import useSWR from 'swr'

export default function useGetDiscordMembers(memberSeasonalTime) {

    const getKey = () => {
        let keys = []
        if (memberSeasonalTime) {
            for (const member of memberSeasonalTime) {
                const destinyMembershipId = member?.memberProfile?.data?.userInfo?.membershipId
                const destinyMembershipType = member?.memberProfile?.data?.userInfo?.membershipType

                keys.push(window.location.origin + '/api/IndividualMemberIds?destinyMembershipId=' + destinyMembershipId + '&destinyMembershipType=' + destinyMembershipType)
            }
            return keys
        }
        return null
    }

    const { data, error } = useSWR(getKey, (keys) =>
        Promise.all(keys.map((key) => fetch(key).then((res) => res.json())))
    )

    return data
}