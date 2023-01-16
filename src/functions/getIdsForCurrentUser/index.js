import useSWR from 'swr'
import getHeaders from '../getHeaders'

export default function getIdsForCurrentUser(userData) {
    
    userData = userData?.user?.response

    let membershipId = null
    let membershipType = null
    if (userData?.primaryMembershipId) {
        membershipId = userData?.primaryMembershipId
        for (let i = 0; i < userData?.destinyMemberships.length; i++) {
            if (userData?.destinyMemberships[i].membershipId == membershipId) {
                membershipType = userData?.destinyMemberships[i].membershipType
            }
        }
    } else if (userData?.destinyMemberships.length == 1) {
        membershipId = userData?.destinyMemberships[0].membershipId
        membershipType = userData?.destinyMemberships[0].membershipType
    }

    return { membershipId: membershipId, membershipType: membershipType }
}