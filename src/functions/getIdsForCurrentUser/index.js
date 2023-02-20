import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function getIdsForCurrentUser(userData) {
    
    userData = userData?.Response

    let membershipId = null
    let membershipType = null
    if (userData?.primaryMembershipId) {
        membershipId = userData?.primaryMembershipId
        for (let i = 0; i < userData?.destinyMemberships.length; i++) {
            if (userData?.destinyMemberships[i].membershipId == membershipId) {
                membershipType = userData?.destinyMemberships[i].membershipType
                break
            }
        }
    } else if (userData?.destinyMemberships.length == 1) {
        membershipId = userData?.destinyMemberships[0].membershipId
        membershipType = userData?.destinyMemberships[0].membershipType
    } else {
        for (let i = 0; i < userData?.destinyMemberships.length; i++) {
            if (userData?.destinyMemberships[i]?.LastSeenDisplayName == userData?.destinyMemberships[i]?.bungieGlobalDisplayName && userData?.destinyMemberships.length >= 1) {
                membershipId = userData?.destinyMemberships[i].membershipId
                membershipType = userData?.destinyMemberships[i].membershipType
                break
            }
        }
    }

    return { membershipId: membershipId, membershipType: membershipType }
}