import React, { useState, useEffect } from 'react';
import { Button, Div, Text, Image } from "atomize";
import sendIndividualGroupInvite from '../../functions/useSendIndividualGroupInvite';

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

        return (
            <Button bg="cbGrey1" m={{ sm: "0 0 0 auto" }} textSize={{ xs: "body", md: "paragraph" }} textColor="cbGrey3" hoverTextColor={pending ? "cbGrey3" : "cbBlue"} h={{ xs: "2rem", md: "2.5rem" }}
                onClick={() => setSendInvite(true)}
            >
                {pending == true ? 'Pending' : 'Invite'}
            </Button>
        )
    }
    return null
}

export default InviteButton