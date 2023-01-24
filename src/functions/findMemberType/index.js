import getAdminsAndFounderOfGroup from "../useGetAdminsAndFounderOfGroup"

export default function findMemberType(clanId, currentIds) {
    // Get a list of the admins and founder
    const admins = getAdminsAndFounderOfGroup(clanId)

    if (admins) {
        // Find if the curent user is on the list of leaders
        for (let i = 0; i < admins?.Response?.results.length; i++) {
            const tempMemId = admins?.Response?.results[i]?.destinyUserInfo?.membershipId

            if (tempMemId == currentIds.membershipId) {
                // Check what kind of leaderhsip the curent user is
                // None: 0, Beginner: 1, Member: 2, Admin: 3, ActingFounder: 4, Founder: 5
                const memberType = admins?.Response?.results[i]?.memberType
                if (memberType == 3) {
                    console.log('You are an admin')
                    // Admin
                    return 3
                } else if (memberType == 4 || memberType == 5) {
                    console.log('You are the founder')
                    // Founder
                    return 5
                }
            }
        }
        // Not in a clan or not leadership
        return 0
    }

    return null
}