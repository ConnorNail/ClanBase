import React, { useState, useEffect } from 'react';
import { Button, Icon, Div, Text, Image } from "atomize";
import getPlayerProfile from '../../functions/getPlayerProfile';
import getBungieNetUserById from '../../functions/getBungieNetUserById';
import CancelInviteButton from '../CancelInviteButton';
import getRecentChar from '../../functions/getRecentChar';
import cancelIndividualGroupInvite from '../../functions/cancelIndividualGroupInvite';
import approvePendingMembers from '../../functions/approvePendingMembers';
import denyPendingMembers from '../../functions/denyPendingMembers';
import CenterModal from '../CenterModal';
import banMembers from '../../functions/banMember';

export default function PendingPlayerCard({ clanId, playerInfo }) {
    const [banModal, setBanModal] = useState(false)
    const [banPending, setBanPending] = useState(false);
    const [denyPending, setDenyPending] = useState(false);
    const [approvePending, setApprovePending] = useState(false);

    const baseURL = 'https://www.bungie.net/'
    const defaultIcon = 'https://www.bungie.net/img/profile/avatars/default_avatar.gif'

    // Member info
    const membershipId = playerInfo?.destinyUserInfo?.membershipId
    const membershipType = playerInfo?.destinyUserInfo?.membershipType
    const displayName = playerInfo?.destinyUserInfo?.displayName
    const bungieGlobalDisplayName = playerInfo?.destinyUserInfo?.bungieGlobalDisplayName
    const bungieGlobalDisplayNameCode = playerInfo?.destinyUserInfo?.bungieGlobalDisplayNameCode

    // Get destiny profile
    const playerProfile = getPlayerProfile(membershipId, membershipType)

    const charInfo = playerProfile?.Response?.characters
    const d2Path = charInfo?.data[getRecentChar(charInfo)]?.emblemPath

    // Send invite
    const ban = banMembers(membershipId, membershipType, clanId, banPending)
    const deny = denyPendingMembers(membershipId, membershipType, displayName, bungieGlobalDisplayName, bungieGlobalDisplayNameCode, clanId, denyPending)
    const approve = approvePendingMembers(membershipId, membershipType, clanId, approvePending)
    let handled = false

    if (approve?.ErrorCode == 1 || deny?.ErrorCode == 1 || ban?.ErrorCode == 1) {
        handled = true
    } else {
        // Unable to complete action
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
            {!handled ?
                <Div bg="cbGrey1" rounded="md" m="0.5rem" d="flex" align="center" shadow="2" hoverShadow="4">
                    <Image h="2.5rem" w="auto" rounded="md" src={pfp()} alt="player icon"/>
                    <Text textColor="cbWhite" textSize="paragraph" m={{ y: "0", l: "0.5rem" }}>
                        {playerInfo?.destinyUserInfo?.bungieGlobalDisplayName}
                    </Text>
                    <Text textColor="cbGrey2" textSize="body" m={{ y: "0" }}>
                        #{playerInfo?.destinyUserInfo?.bungieGlobalDisplayNameCode}
                    </Text>
                    <Button bg="cbGrey1" m={{ l: "auto" }} textSize="subheader" textColor="cbGrey3" hoverTextColor={"cbBlue"}
                        onClick={() => setBanModal(true)}
                    >
                        Ban
                    </Button>
                    <Button bg="cbGrey1" textSize="subheader" textColor="cbGrey3" hoverTextColor={"cbBlue"}
                        onClick={() => setDenyPending(true)}
                    >
                        Deny
                    </Button>
                    <Button bg="cbGrey1" textSize="subheader" textColor="cbGrey3" hoverTextColor={"cbBlue"}
                        onClick={() => setApprovePending(true)}
                    >
                        Approve
                    </Button>
                </Div>
                :
                null}
            <CenterModal
                isOpen={banModal}
                onClose={() => setBanModal(false)}
                onSubmit={() => {
                    setBanPending(true)
                    setBanModal(false)
                }}
            >
                Are you sure you want to ban {playerInfo?.destinyUserInfo?.bungieGlobalDisplayName}#{playerInfo?.destinyUserInfo?.bungieGlobalDisplayNameCode}?
            </CenterModal>
        </>
    )
}