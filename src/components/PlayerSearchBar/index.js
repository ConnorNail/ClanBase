import React, { useState, useEffect } from 'react';
import { Input, Icon, Dropdown, Div, Anchor, Col, Text, Image } from "atomize";
import getHeaders from '../../functions/useGetHeaders'
import useSWRMutation from 'swr/mutation'
import PlayerCard from '../PlayerCard';
import ScrollBox from '../ScrollBox';

const PlayerSearchBar = ({ clanId }) => {
    const header = getHeaders(false)

    const [input, setInput] = useState('');
    const [searchMode, setSearchMode] = useState('Bungie');

    // Close dropdown when empty
    useEffect(() => {
        // Mutate request
        if (input.includes('#')) {
            triggerD2({ displayName: input.split('#')[0], displayNameCode: input.split('#')[1] })
            setSearchMode('D2')
        } else {
            triggerBungie(input)
            setSearchMode('Bungie')
        }
    }, [input]);

    // fetch for request mutation
    // Bungie.net general search
    async function updateBungieUser(url, { arg }) {
        return fetch(url, {
            method: 'post',
            headers: header,
            body: JSON.stringify({
                'displayNamePrefix': arg
            })
        }).then((res) => res.json())
    }
    const { data: dataBungie, trigger: triggerBungie } = useSWRMutation('https://www.bungie.net/Platform/User/Search/GlobalName/0/', updateBungieUser)

    // Destiny search
    async function updateD2User(url, { arg }) {
        return fetch(url, {
            method: 'post',
            headers: header,
            body: JSON.stringify(arg)
        }).then((res) => res.json())
    }
    const { data: dataD2, trigger: triggerD2 } = useSWRMutation('https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/All/', updateD2User)

    let suggestions
    if (searchMode == 'Bungie') {
        suggestions = dataBungie?.Response?.searchResults
    } else if (searchMode == 'D2') {
        suggestions = dataD2?.Response
    }

    // Update input while typing
    function handleSearch(e) {
        setInput(e.target.value)
    }

    return (
        <Div p={{ x: "1rem", y: "0.5rem" }}>
            <Text textColor="cbWhite" textSize="heading">
                Invite Players
            </Text>
            <Input
                placeholder="Guardian Name"
                rounded="circle"
                bg="cbGrey1"
                borderColor="cbWhite"
                hoverBorderColor="cbWhite"
                textColor="cbWhite"
                focusTextColor="cbWhite"
                hoverTextColor="cbWhite"
                fontFamily="Primary"
                h="2rem"
                value={input}
                onChange={e => { handleSearch(e) }}
            />
            <Div h="33rem">
                <ScrollBox h={"33rem"}>
                    <Div p={{ x: "1rem", y: "0.5rem" }} d="flex" flexDir="row" flexWrap="wrap">
                        {suggestions ? suggestions.map((suggestion, index) => (
                            <Div key={index} style={{ flex: '1 1 33%' }}>
                                <PlayerCard clanId={clanId} playerInfo={suggestion} searchMode={searchMode} />
                            </Div>
                        ))
                            :
                            null
                        }
                    </Div>
                </ScrollBox>
            </Div>
        </Div>
    )
}

export default PlayerSearchBar