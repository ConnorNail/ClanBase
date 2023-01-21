import React, { useState, useEffect } from 'react';
import { Input, Icon, Dropdown, Div, Anchor, Col, Text, Image } from "atomize";
import getPlayer from '../../functions/getPlayer';
import getHeaders from '../../functions/getHeaders'
import useSWRMutation from 'swr/mutation'
import PlayerCard from '../PlayerCard';
import getInvitedIndividuals from '../../functions/getInvitedIndividuals';
import PendingPlayerCard from '../PendingPlayerCard';
import getPendingMemberships from '../../functions/getPendingMemberships';
import getBannedMembers from '../../functions/getBannedMembers';
import BannedPlayerCard from '../BannedPlayerCard';

const BannedMembers = ({ clanId }) => {

    const bannedMembers = getBannedMembers(clanId)
    const memberList = bannedMembers?.Response?.results

    return (
        <Div p={{ x: "1rem", y: "0.5rem" }} d="flex" flexDir="column" flexWrap="wrap">
            <Text textColor="cbWhite" textSize="heading">
                Banned Players
            </Text>
            {memberList ?
                memberList.length > 0 ?
                    memberList.map((member, index) => (
                        <Div key={index}>
                            <BannedPlayerCard clanId={clanId} playerInfo={member} />
                        </Div>
                    ))
                    :
                    <Text textColor="cbWhite" textSize="subheader">
                        No Banned Players
                    </Text>
                :
                null}
        </Div>
    )
}

export default BannedMembers