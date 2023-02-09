import React, { useState, useEffect } from 'react';
import { Button, Row, Div, Text, Image } from "atomize";
import getPlayerProfile from '../../functions/useGetPlayerProfile';
import getRecentChar from '../../functions/getRecentChar';
import CenterModal from '../CenterModal';
import banMembers from '../../functions/useBanMember';
import kickMember from '../../functions/useKickMember';
import editGroupMembership from '../../functions/useEditGroupMembership';
import SuccessNotification from '../SuccessNotification';
import WarningNotification from '../WarningNotification';

export default function AdminRosterPlayerCard({ clanId, playerInfo, curentMemberType, mutate }) {
    const [banModal, setBanModal] = useState(false)
    const [banPending, setBanPending] = useState(false);
    const [kickPending, setKickPending] = useState(false);
    const [demotePending, setDemotePending] = useState(false);
    const [promotePending, setPromotePending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);

    const baseURL = 'https://www.bungie.net/'
    const defaultIcon = 'https://www.bungie.net/img/profile/avatars/default_avatar.gif'

    // Member info
    const membershipId = playerInfo?.destinyUserInfo?.membershipId
    const membershipType = playerInfo?.destinyUserInfo?.membershipType
    const memberType = playerInfo?.memberType
    const promoteMemberType = memberType == 3 ? memberType + 2 : memberType + 1
    const demoteMemberType = memberType == 5 ? memberType - 2 : memberType - 1

    const canKickBan = () => {
        if (memberType < curentMemberType) {
            return true
        } else {
            return false
        }
    }

    const canDemote = () => {
        if (demoteMemberType >= 1 && memberType < curentMemberType) {
            return true
        } else {
            return false
        }
    }

    const canPromote = () => {
        if (promoteMemberType < curentMemberType) {
            return true
        } else {
            return false
        }
    }

    // Get destiny profile
    const playerProfile = getPlayerProfile(membershipId, membershipType)

    const charInfo = playerProfile?.Response?.characters
    const d2Path = charInfo?.data[getRecentChar(charInfo)]?.emblemPath

    // Send invite
    const ban = banMembers(membershipId, membershipType, clanId, banPending)
    const kick = kickMember(membershipId, membershipType, clanId, kickPending)
    const promote = editGroupMembership(membershipId, membershipType, clanId, promoteMemberType, promotePending)
    const demote = editGroupMembership(membershipId, membershipType, clanId, demoteMemberType, demotePending)

    // Check if successful
    useEffect(() => {
        if (promote || demote || kick || ban) {
            if (promote?.ErrorCode == 1 || demote?.ErrorCode == 1 || kick?.ErrorCode == 1 || ban?.ErrorCode == 1) {
                // Successful
                // console.log('success', promote, demote)
                mutate()
                setSuccess(true)
            } else {
                // Unable to complete action
                setWarning(true)
            }
        }
    }, [promote, demote, kick, ban])

    const pfp = () => {
        if (d2Path) {
            return baseURL + d2Path
        } else {
            return defaultIcon
        }
    }

    return (
        <>
            <Div bg="cbGrey1" rounded="md" m="0.5rem" shadow="2" hoverShadow="4">
                <Row d="flex" align="center">
                    <Image h={{ xs: "2rem", md: "3rem" }} w="auto" rounded="md" src={pfp()} alt=""/>
                    <Text textColor="cbWhite" textSize={{ xs: "body", md: "subheader" }} m={{ y: "0", l: "0.5rem" }}>
                        {playerInfo?.destinyUserInfo?.bungieGlobalDisplayName}
                    </Text>
                    <Text textColor="cbGrey2" textSize={{ xs: "body", md: "paragraph" }} m={{ y: "0" }}>
                        #{playerInfo?.destinyUserInfo?.bungieGlobalDisplayNameCode}
                    </Text>
                </Row>
                <Row d="flex" align="center" m={{x: 0}} >
                    {canKickBan() ?
                        <Button bg="cbGrey1" textSize={{ xs: "paragraph", md: "subheader" }} h="auto" textColor="cbGrey3" hoverTextColor={"cbBlue"}
                            onClick={() => setBanModal(true)}
                        >
                            Ban
                        </Button>
                        :
                        null}
                    {canKickBan() ?
                        <Button bg="cbGrey1" textSize={{ xs: "paragraph", md: "subheader" }} h="auto" textColor="cbGrey3" hoverTextColor={"cbBlue"}
                            onClick={() => setKickPending(true)}
                        >
                            Kick
                        </Button>
                        :
                        null}
                    {canDemote() ?
                        <Button bg="cbGrey1" textSize={{ xs: "paragraph", md: "subheader" }} h="auto" textColor="cbGrey3" hoverTextColor={"cbBlue"}
                            onClick={() => setDemotePending(true)}
                        >
                            Demote
                        </Button>
                        :
                        null}
                    {canPromote() ?
                        <Button bg="cbGrey1" textSize={{ xs: "paragraph", md: "subheader" }} h="auto" textColor="cbGrey3" hoverTextColor={"cbBlue"}
                            onClick={() => setPromotePending(true)}
                        >
                            Promote
                        </Button>
                        :
                        null}
                </Row>
            </Div>
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
            <SuccessNotification success={success} setSuccess={setSuccess}>
                SUCCESS
                <br />
                <br />
                It may take some time for this change to take effect.
            </SuccessNotification>
            <WarningNotification warning={warning} setWarning={setWarning}>
                ERROR
                <br />
                <br />
                Please try again later
            </WarningNotification>
        </>
    )
}