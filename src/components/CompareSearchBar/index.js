import React, { useState, useEffect } from 'react';
import { Input, Icon } from "atomize";
import { useRouter } from 'next/router';
import getAuthInfo from '../../functions/getAuthInfo'

const CompareSearchBar = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    // Clear states on route change
    const dynamicRoute = router.asPath;
    useEffect(() => setInput(''), [dynamicRoute]);
    useEffect(() => setIsLoading(false), [dynamicRoute]);

    const headers = getAuthInfo(false, router);

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

    function handleSearch(e, button) {
        if (input.length > 2) {
            setIsLoading(true);
            search(); // Uncoment when API is back up ***************************************
            if (button) {
                e.target.parentElement.firstChild.value = ''
            } else {
                e.target.value = ''
            }
            // addQuery(input) // Do not pass input but instead pass clanId once recieved from search() ***************************************
        }
    }

    const search = async () => {
        await fetch('https://www.bungie.net/Platform/GroupV2/NameV2/', {
            method: 'post', headers, body: JSON.stringify({
                'groupName': input,
                'groupType': 1,
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.Response.detail.groupId)
                addQuery(data.Response.detail.groupId)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Input
            placeholder="Clan Name"
            rounded="circle"
            bg="cbRed"
            borderColor="cbWhite"
            hoverBorderColor="cbWhite"
            textColor="cbWhite"
            focusTextColor="cbWhite"
            hoverTextColor="cbWhite"
            h="2rem"
            onInput={e => { setInput(e.target.value) }}
            onKeyPress={e => {
                if (e.key === "Enter") {
                    handleSearch(e, false)
                }
            }}
            suffix={
                <Icon
                    name={isLoading ? "Loading" : "Add"}
                    size="20px"
                    cursor="pointer"
                    color="cbWhite"
                    onClick={(e) => handleSearch(e, true)}
                    pos="absolute"
                    top="50%"
                    right="0.5rem"
                    transform="translateY(-50%)"
                />
            }
        />
    )
}

export default CompareSearchBar