import React, { useState, useEffect } from 'react';
import { Button, Icon, Div, Text, Image } from "atomize";
import getPlayerProfile from '../../functions/useGetPlayerProfile';
import getRecentChar from '../../functions/getRecentChar';
import cancelIndividualGroupInvite from '../../functions/useCancelIndividualGroupInvite';

export default function InvitedPlayerCard({ clanId, playerInfo }) {
    const [cancelInvite, setCancelInvite] = useState(false);

    const baseURL = 'https://www.bungie.net/'
    const defaultIcon = 'https://www.bungie.net/img/profile/avatars/default_avatar.gif'

    // Member info
    const membershipId = playerInfo?.destinyUserInfo?.membershipId
    const membershipType = playerInfo?.destinyUserInfo?.membershipType

    // Get destiny profile
    const playerProfile = getPlayerProfile(membershipId, membershipType)

    const charInfo = playerProfile?.Response?.characters
    const d2Path = charInfo?.data[getRecentChar(charInfo)]?.emblemPath

    // Send invite
    const cancel = cancelIndividualGroupInvite(membershipId, membershipType, clanId, cancelInvite)
    let canceled = false

    if (cancel?.ErrorCode == 1) {
        canceled = true
    } else {
        // Unable to invite
    }

    const pfp = () => {
        if (d2Path) {
            return baseURL + d2Path
        } else {
            return defaultIcon
        }
    }

    return (
        <>
            {!canceled ?
                <Div bg="cbGrey1" rounded="md" m="0.5rem" d="flex" align="center" shadow="2" hoverShadow="4" minW="10rem" flexWrap="wrap">
                    <Div d="flex" align="center">
                        <Image h={{ xs: "2rem", md: "2.5rem" }} w="auto" rounded="md" src={pfp()} alt="player icon" />
                        <Text textColor="cbWhite" textSize={{ xs: "body", md: "paragraph" }} m={{ y: "0", l: "0.5rem" }}>
                            {playerInfo?.destinyUserInfo?.bungieGlobalDisplayName}
                        </Text>
                        <Text textColor="cbGrey2" textSize="body" m={{ y: "0" }}>
                            #{playerInfo?.destinyUserInfo?.bungieGlobalDisplayNameCode}
                        </Text>
                    </Div>
                    <Button bg="cbGrey1" m={{ sm: "0 0 0 auto" }} textSize={{ xs: "body", md: "paragraph" }} textColor="cbGrey3" hoverTextColor={"cbBlue"} h={{ xs: "2rem", md: "2.5rem" }}
                        onClick={() => setCancelInvite(true)}
                        style={{ lineHeight: "normal" }}
                    >
                        Cancel Invite
                    </Button>
                </Div>
                :
                null}
        </>
    )
}