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

export default function Admin() {
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
                    <Text textColor="cbWhite">
                        FOUNDER SETTINGS PLACEHOLDER FOR {clanId}
                    </Text>
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

    return (
        <DefaultTemplate>
            <Div d="flex" justify="center">
                <Col size="11">
                    <InfoBox bg={'cbGrey1'}>
                        {status == 'authenticated' ?
                            adminDetails()
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