import React, { useState, useEffect } from 'react';
import { Input, Icon, Dropdown, Div, Anchor, Col, Text, Image } from "atomize";
import getPlayer from '../../functions/useGetPlayer';
import getHeaders from '../../functions/useGetHeaders'
import useSWRMutation from 'swr/mutation'
import PlayerCard from '../PlayerCard';
import getInvitedIndividuals from '../../functions/useGetInvitedIndividuals';
import InvitedPlayerCard from '../InvitedPlayerCard';

const InvitedMembers = ({ clanId }) => {

    const invitedMembers = getInvitedIndividuals(clanId)
    const memberList = invitedMembers?.Response?.results

    return (
        <Div p={{ x: "1rem", y: "0.5rem" }} h="40rem" d="flex" flexDir="column" flexWrap="wrap">
            <Text textColor="cbWhite" textSize="heading">
                Pending Invitations
            </Text>
            {memberList ?
                memberList.length > 0 ?
                    memberList.map((member, index) => (
                        <Div key={index}>
                            <InvitedPlayerCard clanId={clanId} playerInfo={member} />
                        </Div>
                    ))
                    :
                    <Text textColor="cbWhite" textSize="subheader">
                        No Pending Members
                    </Text>
                :
                null}
        </Div>
    )
}

export default InvitedMembers