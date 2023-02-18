import React, { useState, useEffect } from 'react';
import { Input, Icon, Dropdown, Div, Anchor, Col, Text, Image } from "atomize";
import getHeaders from '../../functions/useGetHeaders'
import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/router';

const CompareSearchBar = ({ clanId }) => {
    const router = useRouter();

    const header = getHeaders(false)

    const [input, setInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // Mutate request
        triggerBungie(input)

        // Close dropdown when empty
        if (input.length > 0) {
            setShowDropdown(true)
        } else {
            setShowDropdown(false)
        }
    }, [input]);

    const addQuery = (newValue) => {
        const newQuery = []
        const existingQuery = router.query

        // If no queries exist then add normally not as an array
        // If there is one query add it to the new array as an individual value
        // If there are more than one querie then add the array of exisitng queries to the new ones
        if (Array.isArray(existingQuery.clanids)) {
            newQuery.push(...existingQuery.clanids)
        } else if (Object.keys(existingQuery).length == 1) {
            newQuery.push(existingQuery.clanids)
        }

        newQuery.push(encodeURI(newValue))
        router.push({
            pathname: '/clan-compare',
            query: { clanids: newQuery },
        });
    };

    // fetch for request mutation
    // Clan general search
    async function updateBungieUser(url, { arg }) {
        return fetch(url, {
            method: 'post',
            headers: header,
            body: JSON.stringify({
                'groupName': input,
                'groupType': 1,
            })
        }).then((res) => res.json())
    }
    const { data: dataBungie, trigger: triggerBungie } = useSWRMutation('https://www.bungie.net/Platform/GroupV2/NameV2/', updateBungieUser)

    const suggestion = dataBungie

    // List elements
    const menuList = (
        <Div p={{ x: "1rem", y: "0.5rem" }} bg="cbGrey1" m={{ t: "-0.25rem" }} shadow="4" rounded="0 0 5px 5px">
            {suggestion ?
                suggestion?.Response ?
                    <Anchor d="block" p={{ y: "0.25rem" }} border={{ b: "1px solid" }} borderColor="cbWhite" textColor="cbGrey3" hoverTextColor="cbBlue"
                        onClick={() => {
                            addQuery(suggestion?.Response?.detail?.groupId)
                            setShowDropdown(false)
                            setInput('')
                        }}
                    >
                        {suggestion?.Response?.detail?.name} [{suggestion?.Response?.detail?.clanInfo?.clanCallsign}]
                    </Anchor>
                    :
                    <Icon name="Loading3" size="25px" color="cbWhite" />
                :
                <Text d="block" p={{ y: "0.25rem" }} border={{ b: "1px solid" }} borderColor="cbWhite" textColor="cbGrey3">
                    There is no clan with that name
                </Text>
            }
        </Div>
    );

    // Update input while typing
    function handleSearch(e) {
        setInput(e.target.value)
    }

    return (
        <Dropdown
            isOpen={showDropdown}
            m={{ b: "0.5rem" }}
            menu={menuList}
            bg="cbGrey1"
            focusBg="cbGrey1"
            borderColor="cbGrey1"
            focusBorderColor="cbGrey1"
            closeSuffix={<></>}
            openSuffix={<></>}
        >
            <Col>
                <Input
                    placeholder="Clan Name"
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
            </Col>
        </Dropdown>
    )
}

export default CompareSearchBar