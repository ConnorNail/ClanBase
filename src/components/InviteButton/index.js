import React, { useState, useEffect } from 'react';
import { Button, Div, Text, Image } from "atomize";
import getPlayerProfile from '../../functions/getPlayerProfile';
import getBungieNetUserById from '../../functions/getBungieNetUserById';
import sendIndividualGroupInvite from '../../functions/sendIndividualGroupInvite';

function InviteButton({ membershipId, memberType, clanId }) {
    const [sendInvite, setSendInvite] = useState(false);

    let pending = false

    // Send invite
    const invite = sendIndividualGroupInvite(membershipId, memberType, clanId, sendInvite)

    if (membershipId && memberType) {
    

    if (invite?.ErrorCode == 1) {
        pending = true
    } else {
        // Unable to invite
    }

    console.log(invite)

    return (
        <Button bg="cbGrey2" m={{ l: "auto" }} textSize="subheader" textColor="cbGrey3" hoverTextColor={pending ? "cbGrey3" : "cbBlue"}
            onClick={() => setSendInvite(true)}
        >
            {pending == true ? 'Pending' : 'Invite'}
        </Button>
    )
    }
    return null
}

export default InviteButton