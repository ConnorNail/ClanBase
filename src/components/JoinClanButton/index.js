import { Div, Image, Button } from "atomize";
import { useSession } from "next-auth/react";
import getIdsForCurrentUser from "../../functions/getIdsForCurrentUser";
import getGroupsForMember from "../../functions/getGroupsForMember";

const JoinClanButton = ({ clanInfo }) => {
    const { data, status } = useSession()
    // console.log("data", data)
    // console.log("status", status)

    // Get member profile
    // If not logged in this will return a failed request
    const ids = getIdsForCurrentUser(data)
    const groupInfo = getGroupsForMember(ids.membershipId, ids.membershipType)

    if (clanInfo && groupInfo) {
        const memberClanId = groupInfo?.Response?.results[0]?.group?.groupId
        const thisClanId = clanInfo?.Response?.detail?.groupId
        // Memberhsip Options
        // Reviewed: 0
        // Open: 1
        // Closed: 2
        const thisClanMembershipOption = clanInfo?.Response?.detail?.membershipOption

        let state

        // Check if member is in this clan
        let thisIsMemberClan
        if (memberClanId == thisClanId) {
            thisIsMemberClan = true
        } else {
            thisIsMemberClan = false
        }

        // Set state
        // - In this clan (Leave Clan) [0]
        // - Invite only (No user action) [1]
        // - Join Open clan and not in a clan (Join) [2]
        // - Pending to join this Approval Required clan (Cancel pending? or No user action) [3]
        // - Request to join this Approval Required clan and not in a clan (Send join request) [4]
        // - In a different clan (Notify that you must leave the other clan to join) [5] ?
        if (thisIsMemberClan) {
            // In this clan
            state = 0
        } else {
            switch (thisClanMembershipOption) {
                case 0:
                    // Request or Pending
                    break;
                case 1:
                    // Open
                    state = 2
                    break;
                case 2:
                    // Invite only
                    state = 1
                    break;
            }
        }

        return (
            <Button
                h="2rem"
                p={{ x: "0.75rem" }}
                textSize="caption"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                border="1px solid"
                borderColor="info700"
                hoverBorderColor="info900"
                m={{ r: "0.5rem" }}
            >
                join
            </Button>
        )
    }
}

export default JoinClanButton