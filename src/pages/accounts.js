import DefaultTemplate from '../components/DefaultLayout'
import { useSession, signIn } from "next-auth/react"
import { Row, Col, Div, Text, Button, Image, Icon } from "atomize";
import InfoBox from '../components/InfoBox';
import LoginButtonDiscord from '../components/LoginButtonDiscord';
import React, { useState, useEffect } from 'react';
import useGetUserInfo from '../functions/useGetUserInfo';
import getIdsForCurrentUser from '../functions/getIdsForCurrentUser';
import useGetGroupsForMember from '../functions/useGetGroupsForMember';
import { useRouter } from 'next/router'
import useLinkBungieAndDiscord from '../functions/useLinkBungieAndDiscord';
import useIndividualMembersIds from '../functions/useIndividualMemberIds';
import useGetDiscordUserInfo from '../functions/useGetDiscordUserInfo';

export default function Accounts() {
  const router = useRouter()
  const { token } = router.query

  const { data: session, status } = useSession()
  const [send, setSend] = useState(false)

  const userData = useGetUserInfo(status)

  const ids = getIdsForCurrentUser(userData)
  const groupInfo = useGetGroupsForMember(ids.membershipId, ids.membershipType)

  const clanId = groupInfo ? groupInfo?.Response?.results[0]?.group?.groupId.toString() : null

  const clanBaseMemberInfo = useIndividualMembersIds(ids.membershipId ? ids.membershipId.toString() : null)
  console.log(clanBaseMemberInfo)

  const discordMemberInfo = useGetDiscordUserInfo(token)
  const discordId = discordMemberInfo?.id
  const discordName = discordMemberInfo?.username

  const linkAccounts = useLinkBungieAndDiscord(discordId, discordName, ids.membershipId ? ids.membershipId.toString() : null, ids.membershipType ? ids.membershipType.toString() : null, clanId, send)
  // console.log(linkAccounts)

  useEffect(() => {
    if (status == 'authenticated' && groupInfo) {
      setSend(true)
    }
  }, [groupInfo])

  return (
    <DefaultTemplate>
      <Div d="flex" justify="center" h="40rem">
        <Col size={{ xs: "11", md: "6" }}>
          <InfoBox bg="cbGrey1" m={{ y: "0.5rem" }}>
            <Row d="flex" justify="center" p="1rem">
              <Div>
                <Text textColor="cbWhite" textSize="heading" textAlign="center" p={{ b: "1rem" }}>
                  Link accounts to ClanBase
                </Text>
                {status == 'authenticated' ?
                  <Div>
                    <Div d="flex" justify="center" align="center">
                      <Icon name="CBChecked" size="25px" color="cbBlue" />
                      <Text textSize="subheader" textColor="cbWhite" style={{ whiteSpace: "nowrap" }} p={{ x: "0.5rem" }}>
                        Signed in With Bungie
                      </Text>
                      <Image src="Shield_Crest.png" alt="discord" h="2rem" w="auto" />
                    </Div>
                    {clanBaseMemberInfo?.discordId ?
                      <Div d="flex" justify="center" align="center" m={{ t: "1rem" }}>
                        <Icon name="CBChecked" size="25px" color="cbBlue" />
                        <Text textSize="subheader" textColor="cbWhite" style={{ whiteSpace: "nowrap" }} p={{ x: "0.5rem" }}>
                          Signed in With Discord
                        </Text>
                        <Image src="discord.svg" alt="discord" h="1.5rem" w="auto" />
                      </Div>
                      :
                      <Div d="flex" justify="center" m={{ t: "1rem" }}>
                        <LoginButtonDiscord />
                      </Div>
                    }
                  </Div>
                  :
                  <Div d="flex" justify="center">
                    <Button h="3rem" p="0.5rem" bg="cbGrey2" onClick={() => signIn('bungie')} shadow="2" hoverShadow="4">
                      <Text textSize="subheader" textColor="cbWhite" style={{ whiteSpace: "nowrap" }} p={{ r: "0.5rem" }}>
                        Sign in With Bungie
                      </Text>
                      <Image src="Shield_Crest.png" alt="discord" h="2rem" w="auto" />
                    </Button>
                  </Div>
                }
              </Div>
            </Row>
          </InfoBox>
        </Col>
      </Div>
    </DefaultTemplate>
  )
}