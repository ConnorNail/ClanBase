import React, { useState, useEffect } from 'react';
import { Button, Div, Text, Image } from "atomize";
import getPlayerProfile from '../../functions/getPlayerProfile';
import getBungieNetUserById from '../../functions/getBungieNetUserById';

function getRecentChar(charInfo) {
    // When passed an object of characters will find the characterId of the most recently played character
    let char = 0;
    let date = '';

    for (const character in charInfo?.data) {
        const newDate = new Date(charInfo?.data[character]?.dateLastPlayed);

        // If the new date is more recent
        if (date == '' || date < newDate) {
            // Save the character date
            date = newDate;

            // Save characterId
            char = character;
        }
    }
    return char
}

function PlayerCard({ playerInfo, searchMode }) {
    const [sendInvite, setSendInvite] = useState(false);

    // useEffect(() => {
    //     console.log(sendInvite)
    //     setSendInvite(false)
    // }, [sendInvite]);

    const baseURL = 'https://www.bungie.net/'
    const defaultIcon = 'https://www.bungie.net/img/profile/avatars/default_avatar.gif'

    // Member info
    let display = true
    let memberType
    let membershipId
    if (searchMode == 'Bungie') {
        memberType = playerInfo?.destinyMemberships[0]?.crossSaveOverride
        for (let i = 0; i < playerInfo?.destinyMemberships.length; i++) {
            if (playerInfo?.destinyMemberships[i]?.membershipType == memberType) {
                membershipId = playerInfo?.destinyMemberships[i]?.membershipId
            }
        }
    } else if (searchMode == 'D2') {
        memberType = playerInfo?.crossSaveOverride
        if (playerInfo?.membershipType == memberType) {
            membershipId = playerInfo?.membershipId
        } else {
            display = false
        }
    }

    // Get destiny profile
    const playerProfile = getPlayerProfile(membershipId, memberType)

    const charInfo = playerProfile?.Response?.characters
    const d2Path = charInfo?.data[getRecentChar(charInfo)]?.emblemPath

    // Get bungie profile
    const bungieInfo = getBungieNetUserById(playerInfo?.bungieNetMembershipId)

    const bungiePath = bungieInfo?.Response?.profilePicturePath

    // Send invite

    // Decide on pfp path
    const pfp = () => {
        if (d2Path) {
            return baseURL + d2Path
        } else if (bungiePath) {
            return baseURL + bungiePath
        } else {
            return defaultIcon
        }
    }

    return (
        <>
            {display ?
                <Div bg="cbGrey2" rounded="md" m="0.5rem" d="flex" align="center">
                    <Image h="2.5rem" w="auto" src={pfp()} />
                    <Text textColor="cbWhite" textSize="paragraph" m={{ y: "0", l: "0.5rem" }}>
                        {playerInfo?.bungieGlobalDisplayName}
                    </Text>
                    <Text textColor="cbGrey1" textSize="body" m={{ y: "0" }}>
                        #{playerInfo?.bungieGlobalDisplayNameCode}
                    </Text>
                    <Button bg="cbGrey2" m={{ l: "auto" }} textSize="subheader" textColor="cbGrey3" hoverTextColor="cbBlue"
                    onClick={() => setSendInvite(true)}
                    >
                        Invite
                    </Button>
                </Div>
                :
                null}
        </>
    )
}

export default PlayerCard