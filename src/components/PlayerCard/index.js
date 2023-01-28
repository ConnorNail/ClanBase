import React, { useState, useEffect } from 'react';
import { Notification, Icon, Div, Text, Image } from "atomize";
import getPlayerProfile from '../../functions/useGetPlayerProfile';
import getBungieNetUserById from '../../functions/useGetBungieNetUserById';
import InviteButton from '../InviteButton';
import getRecentChar from '../../functions/getRecentChar';

function PlayerCard({ clanId, playerInfo, searchMode }) {
    const baseURL = 'https://www.bungie.net/'
    const defaultIcon = 'https://www.bungie.net/img/profile/avatars/default_avatar.gif'

    // Member info
    let display = true
    let memberType
    let membershipId
    if (searchMode == 'Bungie') {
        memberType = playerInfo?.destinyMemberships[0]?.crossSaveOverride
        if (memberType == 0) {
            membershipId = playerInfo?.destinyMemberships[0]?.membershipId
            memberType = playerInfo?.destinyMemberships[0]?.membershipType
        } else {
            for (let i = 0; i < playerInfo?.destinyMemberships.length; i++) {
                if (playerInfo?.destinyMemberships[i]?.membershipType == memberType) {
                    membershipId = playerInfo?.destinyMemberships[i]?.membershipId
                }
            }
        }
    } else if (searchMode == 'D2') {
        memberType = playerInfo?.crossSaveOverride
        if (playerInfo?.membershipType == memberType || memberType == 0) {
            membershipId = playerInfo?.membershipId
            memberType = playerInfo?.membershipType
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
                <Div bg="cbGrey1" rounded="md" m="0.5rem" d="flex" align="center" shadow="2" hoverShadow="4" flexWrap="wrap">
                    <Div d="flex" align="center">
                        <Image h={{ xs: "2rem", md: "2.5rem" }} w="auto" rounded="md" src={pfp()} alt="player icon" />
                        <Text textColor="cbWhite" textSize={{ xs: "body", md: "paragraph" }} m={{ y: "0", l: "0.5rem" }}>
                            {playerInfo?.bungieGlobalDisplayName}
                        </Text>
                        <Text textColor="cbGrey2" textSize="body" m={{ y: "0" }}>
                            #{playerInfo?.bungieGlobalDisplayNameCode}
                        </Text>
                    </Div>
                    <InviteButton membershipId={membershipId} memberType={memberType} clanId={clanId} />
                </Div>
                :
                null}
        </>
    )
}

export default PlayerCard