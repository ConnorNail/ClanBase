import React, { useState, useEffect } from 'react';
import { Button, Div, Text, Image } from "atomize";
import getPlayerProfile from '../../functions/getPlayerProfile';
import getBungieNetUserById from '../../functions/getBungieNetUserById';
import cancelIndividualGroupInvite from '../../functions/cancelIndividualGroupInvite';

function CancelInviteButton({ membershipId, memberType, clanId }) {
    const [cancelInvite, setCancelInvite] = useState(false);

    let pending = false

    // Send invite
    const invite = cancelIndividualGroupInvite(membershipId, memberType, clanId, cancelInvite)

    if (membershipId && memberType) {

        if (invite?.ErrorCode == 1) {
            pending = true
        } else {
            // Unable to invite
        }

        return (
            <Button bg="cbGrey2" m={{ l: "auto" }} textSize="subheader" textColor="cbGrey3" hoverTextColor={pending ? "cbGrey3" : "cbBlue"}
                onClick={() => setCancelInvite(true)}
            >
                {pending == true ? 'Pending' : 'Cancel Invite'}
            </Button>
        )
    }
    return null
}

export default CancelInviteButton