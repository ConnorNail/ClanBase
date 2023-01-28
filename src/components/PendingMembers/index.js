import React, { useState, useEffect } from 'react';
import { Input, Icon, Dropdown, Div, Anchor, Col, Text, Image } from "atomize";
import PendingPlayerCard from '../PendingPlayerCard';
import getPendingMemberships from '../../functions/useGetPendingMemberships';

const PendingMembers = ({ clanId, pending, setPending }) => {

    const pendingMembers = getPendingMemberships(clanId)
    const memberList = pendingMembers?.Response?.results

    return (
        <Div p={{ x: "1rem", y: "0.5rem" }} d="flex" flexDir="column" flexWrap="wrap">
            <Text textColor="cbWhite" textSize="heading">
                Pending Members
            </Text>
            {memberList ?
                memberList.length > 0 ?
                    memberList.map((member, index) => (
                        <Div key={index}>
                            <PendingPlayerCard clanId={clanId} playerInfo={member} />
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

export default PendingMembers