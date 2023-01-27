import DefaultTemplate from '../components/DefaultLayout'
import InfoBox from '../components/InfoBox'
import useGetClanInfoImut from "../functions/useGetClanInfoImut";
import { Button, Text, Row, Col, Div } from "atomize";
import { useSession, signIn, signOut } from "next-auth/react"
import getIdsForCurrentUser from "../functions/getIdsForCurrentUser";
import getGroupsForMember from "../functions/useGetGroupsForMember";
import findMemberType from '../functions/findMemberType';
import InvitedMembers from '../components/InvitedMembers';
import PlayerSearchBar from '../components/PlayerSearchBar';
import PendingMembers from '../components/PendingMembers';
import BannedMembers from '../components/BannedMembers';
import React, { useState, useEffect } from 'react';
import AdminRoster from '../components/AdminRoster';
import CultureSettings from '../components/CultureSettings';
import GeneralSettings from '../components/GeneralSettings';
import useGetUserInfo from '../functions/useGetUserInfo';

export default function Admin() {
    const [tab, setTab] = useState('General')

    const { data, status } = useSession()

    const userData = useGetUserInfo(status)
    console.log(userData)

    const ids = getIdsForCurrentUser(userData)
    const groupInfo = getGroupsForMember(ids.membershipId, ids.membershipType)

    const clanId = groupInfo ? groupInfo?.Response?.results[0]?.group?.groupId : null

    const clanInfo = useGetClanInfoImut(clanId)

    // If member is admin (3) or founder (5)
    const memberType = findMemberType(clanId, ids)

    // If true then admins can send invites
    const invitePermissionOverride = clanInfo?.Response?.detail?.features?.invitePermissionOverride
    const updateCulturePermissionOverride = clanInfo?.Response?.detail?.features?.updateCulturePermissionOverride

    // If the clan required approval show pending
    const canSeePending = clanInfo?.Response?.detail?.membershipOption == 0 ? true : false

    // Allow invites
    const canSendInvites = !invitePermissionOverride && memberType == 3 ? false : true
    const canEditCulture = !updateCulturePermissionOverride && memberType == 3 ? false : true

    function AdminMenuButtons({ children, toggleValue, m }) {
        return (
            <Button
                bg="cbGrey2"
                textColor={tab == toggleValue ? "cbWhite" : "cbGrey1"}
                textSize="subheader"
                hoverTextColor="cbWhite"
                shadow={tab == toggleValue ? "4" : "2"}
                hoverShadow="4" m={m}
                onClick={() => setTab(toggleValue)}
            >
                {children}
            </Button>
        )
    }

    function AdminTabs() {
        return (
            <Div d="flex" align="center">
                <AdminMenuButtons toggleValue={'General'} m={{ r: "0.5rem" }}>
                    General
                </AdminMenuButtons>
                {canSeePending ?
                    <>
                        <Div bg="cbWhite" h="3rem" w="0.1rem" />
                        <AdminMenuButtons toggleValue={'Pending'} m={{ x: "0.5rem" }}>
                            Pending
                        </AdminMenuButtons>
                    </>
                    :
                    null
                }
                {canSendInvites ?
                    <>
                        <Div bg="cbWhite" h="3rem" w="0.1rem" />
                        <AdminMenuButtons toggleValue={'Invites'} m={{ x: "0.5rem" }}>
                            Invitations
                        </AdminMenuButtons>
                    </>
                    :
                    null
                }
                <Div bg="cbWhite" h="3rem" w="0.1rem" />
                <AdminMenuButtons toggleValue={'Bans'} m={{ x: "0.5rem" }}>
                    Ban List
                </AdminMenuButtons>
                {canEditCulture ?
                    <>
                        <Div bg="cbWhite" h="3rem" w="0.1rem" />
                        <AdminMenuButtons toggleValue={'Culture'} m={{ x: "0.5rem" }}>
                            Culture Settings
                        </AdminMenuButtons>
                    </>
                    :
                    null
                }
                {memberType == 5 ?
                    <>
                        <Div bg="cbWhite" h="3rem" w="0.1rem" />
                        <AdminMenuButtons toggleValue={'Settings'} m={{ x: "0.5rem" }}>
                            General Settings
                        </AdminMenuButtons>
                    </>
                    :
                    null
                }
            </Div>
        )
    }

    function AdminTabContent() {
        switch (tab) {
            case 'General':
                return (
                    <Div d="flex">
                        <Col>
                            <InfoBox bg={'cbGrey2'}>
                                <AdminRoster clanId={clanId} curentMemberType={memberType} />
                            </InfoBox>
                        </Col>
                    </Div>
                )
            case 'Pending':
                return (
                    <Div d="flex">
                        <Col>
                            <InfoBox bg={'cbGrey2'}>
                                <PendingMembers clanId={clanId} />
                            </InfoBox>
                        </Col>
                    </Div>
                )
            case 'Invites':
                return (
                    <Div d="flex" flexDir="column">
                        <InfoBox bg={'cbGrey2'} m={{ x: "1rem", t: "1rem", b: "0.5rem" }}>
                            <InvitedMembers clanId={clanId} />
                        </InfoBox>
                        <InfoBox bg={'cbGrey2'} m={{ x: "1rem", t: "0.5rem", b: "1rem" }}>
                            <PlayerSearchBar clanId={clanId} />
                        </InfoBox>
                    </Div>
                )
            case 'Bans':
                return (
                    <Div d="flex">
                        <Col>
                            <InfoBox bg={'cbGrey2'}>
                                <BannedMembers clanId={clanId} />
                            </InfoBox>
                        </Col>
                    </Div>
                )
            case 'Culture':
                return (
                    <Div d="flex">
                        <Col>
                            <InfoBox bg={'cbGrey2'}>
                                <CultureSettings groupInfo={groupInfo} clanId={clanId} />
                            </InfoBox>
                        </Col>
                    </Div>
                )
            case 'Settings':
                return (
                    <Div d="flex">
                        <Col>
                            <InfoBox bg={'cbGrey2'}>
                                <GeneralSettings groupInfo={groupInfo} clanId={clanId} />
                            </InfoBox>
                        </Col>
                    </Div>
                )
        }
    }

    return (
        <DefaultTemplate>
            <Div d="flex" justify="center">
                <Col size="11">
                    <InfoBox bg={'cbGrey1'} minH="40rem">
                        {clanId && groupInfo ?
                            <>
                                <AdminTabs />
                                {status == 'authenticated' ?
                                    <AdminTabContent />
                                    :
                                    <Text textColor="cbWhite">
                                        Sign in to see clan details
                                    </Text>}
                            </>
                            :
                            null}
                    </InfoBox>
                </Col>
            </Div>
        </DefaultTemplate>
    )
}