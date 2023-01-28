import React, { useState, useEffect } from 'react';
import { Input, Icon, Dropdown, Div, Anchor, Col, Text, Image } from "atomize";
import getInvitedIndividuals from '../../functions/useGetInvitedIndividuals';
import InvitedPlayerCard from '../InvitedPlayerCard';
import ScrollBox from '../ScrollBox';

const InvitedMembers = ({ clanId }) => {

    const invitedMembers = getInvitedIndividuals(clanId)
    const memberList = invitedMembers?.Response?.results

    return (
        <Div h="18rem" p={{ x: "1rem", y: "0.5rem" }}>
            <Text textColor="cbWhite" textSize={{ xs: "title", md: "heading" }}>
                Pending Invitations
            </Text>
            <ScrollBox h={"14.5rem"}>
                {memberList ?
                    memberList.length > 0 ?
                        <Div d="flex" flexDir="row" flexWrap="wrap">
                            {memberList.map((member, index) => (
                                <Div key={index} style={{ flex: '1 1 50%' }}>
                                    <InvitedPlayerCard clanId={clanId} playerInfo={member} />
                                </Div>
                            ))}
                        </Div>
                        :
                        <Text textColor="cbWhite" textSize="subheader">
                            No Pending Members
                        </Text>
                    :
                    null}
            </ScrollBox>
        </Div>
    )
}

export default InvitedMembers