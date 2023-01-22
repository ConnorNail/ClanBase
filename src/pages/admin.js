import DefaultTemplate from '../components/DefaultLayout'
import ClanCard from '../components/ClanCard'
import InfoBox from '../components/InfoBox'
import CompareSearchBar from '../components/CompareSearchBar'
import getClanInfo from "../functions/getClanInfo";
import { useRouter } from 'next/router'
import { Container, Button, Text, Row, Col, Image, Div } from "atomize";
import { useSession, signIn, signOut } from "next-auth/react"
import getIdsForCurrentUser from "../functions/getIdsForCurrentUser";
import getGroupsForMember from "../functions/getGroupsForMember";
import findMemberType from '../functions/findMemberType';
import InvitedMembers from '../components/InvitedMembers';
import PlayerSearchBar from '../components/PlayerSearchBar';
import PendingMembers from '../components/PendingMembers';
import BannedMembers from '../components/BannedMembers';
import React, { useState, useEffect } from 'react';
import AdminRoster from '../components/AdminRoster';
import CultureSettings from '../components/CultureSettings';

export default function Admin() {
    const [tab, setTab] = useState('General')

    const { data, status } = useSession()

    const ids = getIdsForCurrentUser(data)
    const groupInfo = getGroupsForMember(ids.membershipId, ids.membershipType)

    const clanId = groupInfo ? groupInfo?.Response?.results[0]?.group?.groupId : null

    const clanInfo = getClanInfo(clanId)

    // If member is admin (3) or founder (5)
    const memberType = findMemberType(clanId, ids)

    // If true then admins can send invites
    const invitePermissionOverride = clanInfo?.Response?.detail?.features?.invitePermissionOverride

    const adminDetails = () => {
        if (memberType || memberType == 0) {
            if (memberType == 5) {
                return (
                    <>
                        {/* <InvitedMembers clanId={clanId} />
                        <PlayerSearchBar clanId={clanId} /> */}
                        <Text textColor="cbWhite">
                            FOUNDER SETTINGS PLACEHOLDER FOR {clanId}
                        </Text>
                    </>
                )
            } else if (memberType == 3) {
                return (
                    <Text textColor="cbWhite">
                        ADMIN SETTINGS PLACEHOLDER FOR {clanId}
                    </Text>
                )
            } else {
                return (
                    <Text textColor="cbWhite">
                        You are not in leadership for a clan
                    </Text>
                )
            }
        } else {
            return 'loading'
        }
    }

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
                <Div bg="cbWhite" h="3rem" w="0.1rem" />
                <AdminMenuButtons toggleValue={'Invites'} m={{ x: "0.5rem" }}>
                    Invitations
                </AdminMenuButtons>
                <Div bg="cbWhite" h="3rem" w="0.1rem" />
                <AdminMenuButtons toggleValue={'Bans'} m={{ x: "0.5rem" }}>
                    Ban List
                </AdminMenuButtons>
                <Div bg="cbWhite" h="3rem" w="0.1rem" />
                <AdminMenuButtons toggleValue={'Culture'} m={{ x: "0.5rem" }}>
                    Culture Settings
                </AdminMenuButtons>
                <Div bg="cbWhite" h="3rem" w="0.1rem" />
                <AdminMenuButtons toggleValue={'Settings'} m={{ x: "0.5rem" }}>
                    General Settings
                </AdminMenuButtons>
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
                                <PendingMembers clanId={clanId} />
                                <AdminRoster clanId={clanId} curentMemberType={memberType}/>
                            </InfoBox>
                        </Col>
                    </Div>
                )
            case 'Invites':
                return (
                    <Div d="flex">
                        <Col size="4">
                            <InfoBox bg={'cbGrey2'}>
                                <InvitedMembers clanId={clanId} />
                            </InfoBox>
                        </Col>
                        <Col>
                            <InfoBox bg={'cbGrey2'}>
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
        }
    }

    return (
        <DefaultTemplate>
            <Div d="flex" justify="center">
                <Col size="11">
                    <InfoBox bg={'cbGrey1'}>
                        <AdminTabs />

                        {status == 'authenticated' ?
                            <AdminTabContent />
                            :
                            <Text textColor="cbWhite">
                                Sign in to see clan details
                            </Text>}
                    </InfoBox>
                </Col>
            </Div>
        </DefaultTemplate>
    )
}