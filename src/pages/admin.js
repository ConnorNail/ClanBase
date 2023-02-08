import DefaultTemplate from '../components/DefaultLayout'
import InfoBox from '../components/InfoBox'
import useGetClanInfoImut from "../functions/useGetClanInfoImut";
import { Button, Text, Row, Col, Div, Dropdown, Icon, Anchor } from "atomize";
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
import useGetPendingMemberships from '../functions/useGetPendingMemberships';
import ClanTimeStats from '../components/ClanTimeStats';
import getClanMemberInfo from "../functions/getClanMemberProfileInfo/useGetClanMemberInfo";
import useGetAllMembersProfile from '../functions/getClanMemberProfileInfo/useGetAllMembersProfile';
import getClanMemberCharacterSeasonalTimeStats from '../functions/getClanMemberCharacterSeasonalTimeStats';
import useGetClanMemberDiscordSeasonalTimeStats from '../functions/useGetClanMemberDiscordSeasonalTimeStats';

export default function Admin() {
    const [tab, setTab] = useState('General')
    const [showDropdown, setShowDropdown] = useState(false)
    const [pending, setPending] = useState(0)

    const { data, status } = useSession()

    const userData = useGetUserInfo(status)

    const ids = getIdsForCurrentUser(userData)
    const groupInfo = getGroupsForMember(ids.membershipId, ids.membershipType)

    const clanId = groupInfo ? groupInfo?.Response?.results[0]?.group?.groupId : null

    const clanInfo = useGetClanInfoImut(clanId)
    const clanName = clanInfo?.Response?.detail?.name
    const clanCallsign = clanInfo?.Response?.detail?.clanInfo?.clanCallsign

    const { data: members, mutate: mutateMembers } = getClanMemberInfo(clanId)
    const clanMemberProfiles = useGetAllMembersProfile(members)

    const memberSeasonalTimeStats = useGetClanMemberDiscordSeasonalTimeStats(members, clanMemberProfiles)

    // Pending member count
    const pendingMembers = useGetPendingMemberships(clanId)
    const pendingMemberCount = pendingMembers?.Response?.results.length

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

    function AdminMenuButtons({ children, toggleValue }) {
        return (
            <Button
                flexGrow="1"
                bg="cbGrey2"
                textColor={tab == toggleValue ? "cbWhite" : "cbGrey1"}
                textSize="subheader"
                hoverTextColor="cbWhite"
                shadow={tab == toggleValue ? "4" : "2"}
                hoverShadow="4"
                m="0.5rem"
                h="3rem"
                style={{ lineHeight: "normal" }}
                onClick={() => setTab(toggleValue)}
            >
                {children}
                {children == 'Pending' && pendingMemberCount > 0 ?
                    <Div m={{ l: "0.5rem" }} bg="cbBlue" w="1.35rem" h="1.35rem" rounded="circle">
                        <Text textColor="cbGrey2" textSize="body">
                            {pendingMemberCount}
                        </Text>
                    </Div>
                    :
                    null
                }
            </Button>
        )
    }

    function AdminDropdown({ tabList }) {
        const menuList = (
            <Div bg="cbGrey2" m={{ t: "-0.25rem" }} rounded="0 0 5px 5px">
                {tabList.map((tabName, index) => (
                    <Div key={index}>
                        <Anchor
                            textSize="subheader"
                            textColor="cbWhite"
                            hoverTextColor="cbWhite"
                            p={{ x: "2rem", y: "0.5rem" }}
                            onClick={() => {
                                setShowDropdown(false)
                                setTab(tabName)
                            }}
                        >
                            {tabName}
                        </Anchor>
                    </Div>
                ))}
            </Div>
        )

        return (
            <Div d={{ xs: "block", lg: "none" }} m="0.5rem">
                <Dropdown
                    bg="cbGrey2"
                    focusBg="cbGrey2"
                    border="cbGrey2"
                    h="3rem"
                    direction="bottomright"
                    textSize="subheader"
                    textColor="cbWhite"
                    isOpen={showDropdown}
                    onClick={() => setShowDropdown(currentState => !currentState)}
                    openSuffix={<Icon name="UpArrow" size="30px" color="gray100" />}
                    closeSuffix={<Icon name="Menu" size="30px" color="gray100" />}
                    menu={menuList}
                >
                    {tab}
                </Dropdown>
            </Div>
        )
    }

    function AdminTabs({ tabList }) {
        return (
            <Div align="center" d={{ xs: "none", lg: "flex" }}>
                {tabList.map((tabName, index) => (
                    <Div align="center" d={{ xs: "none", md: "flex" }} flexGrow="1" key={index}>
                        {index != 0 ? <Div bg="cbWhite" h="3rem" w="0.1rem" /> : null}
                        <AdminMenuButtons toggleValue={tabName}>
                            {tabName}
                        </AdminMenuButtons>
                    </Div>
                ))}
            </Div>
        )
    }

    const availableTabs = () => {
        let tabList = ['General']
        if (canSeePending) {
            tabList.push('Pending')
        }
        if (canSendInvites) {
            tabList.push('Invitations')
        }
        tabList.push('Bans')
        if (canEditCulture) {
            tabList.push('Culture Settings')
        }
        if (memberType == 5) {
            tabList.push('General Settings')
        }
        tabList.push('Time Stats')
        return tabList
    }

    function AdminTabContent() {
        switch (tab) {
            case 'General':
                return (
                    <Div d="flex">
                        <Col>
                            <InfoBox bg={'cbGrey2'}>
                                <AdminRoster clanId={clanId} curentMemberType={memberType} members={members} mutateMembers={mutateMembers} />
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
            case 'Invitations':
                return (
                    <Div d="flex" flexDir="column">
                        <Col>
                            <InfoBox bg={'cbGrey2'} m={{ b: "0.5rem" }}>
                                <InvitedMembers clanId={clanId} />
                            </InfoBox>
                            <InfoBox bg={'cbGrey2'} m={{ b: "1rem" }}>
                                <PlayerSearchBar clanId={clanId} />
                            </InfoBox>
                        </Col>
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
            case 'Culture Settings':
                return (
                    <Div d="flex">
                        <Col>
                            <InfoBox bg={'cbGrey2'}>
                                <CultureSettings groupInfo={groupInfo} clanId={clanId} />
                            </InfoBox>
                        </Col>
                    </Div>
                )
            case 'General Settings':
                return (
                    <Div d="flex">
                        <Col>
                            <InfoBox bg={'cbGrey2'}>
                                <GeneralSettings groupInfo={groupInfo} clanId={clanId} />
                            </InfoBox>
                        </Col>
                    </Div>
                )
            case 'Time Stats':
                return (
                    <Div d="flex">
                        <Col>
                            <InfoBox bg={'cbGrey2'}>
                                <ClanTimeStats memberSeasonalTimeStats={memberSeasonalTimeStats}/>
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
                        {clanId ?
                            <>
                                <Text textColor="cbWhite" textSize="display1" m="0.5rem">
                                    {clanName ? clanName : <Icon name="Loading3" size="25px" color="cbWhite" />} [{clanCallsign ? clanCallsign : <Icon name="Loading3" size="25px" color="cbWhite" />}]
                                </Text>
                                <AdminTabs tabList={availableTabs()} />
                                <AdminDropdown tabList={availableTabs()} />
                                {status == 'authenticated' ?
                                    <AdminTabContent />
                                    :
                                    <Text textColor="cbWhite">
                                        Sign in to see clan details
                                    </Text>}
                            </>
                            :
                            <Text textColor="cbWhite" m="0.5rem" textSize="subheader">
                                Sign in to see clan details
                            </Text>
                        }
                    </InfoBox>
                </Col>
            </Div>
        </DefaultTemplate>
    )
}