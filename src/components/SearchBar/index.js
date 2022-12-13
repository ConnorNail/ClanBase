import { styled, useStyletron } from 'styletron-react'
import React, { useState, useEffect } from 'react';
import { Input, Icon } from "atomize";
import { useRouter } from 'next/router';
import getAuthInfo from '../../functions/getAuthInfo'

const SearchBar = () => {
    const [css] = useStyletron()

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    // Clear states on route change
    const dynamicRoute = router.asPath;
    useEffect(() => setInput(''), [dynamicRoute]);
    useEffect(() => setIsLoading(false), [dynamicRoute]);

    const headers = getAuthInfo(false, router);

    function handleSearch(e, button) {
        if (input.length > 2) {
            setIsLoading(true);
            search();
            if (button) {
                e.target.parentElement.firstChild.value = ''
            } else {
                e.target.value = ''
            }
        }
    }

    const search = async () => {
        await fetch('https://www.bungie.net/Platform/GroupV2/NameV2/', { method: 'post', headers, body: JSON.stringify({
            'groupName': input,
            'groupType': 1,
        })})
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            router.push('/'+data.Response.detail.groupId)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <Input
            placeholder="Enter Clan Name"
            rounded="circle"
            bg="cbRed"
            borderColor="cbWhite"
            hoverBorderColor="cbWhite"
            textColor="cbWhite"
            focusTextColor="cbWhite"
            hoverTextColor="cbWhite"
            h="2rem"
            onInput={e => {setInput(e.target.value)}}
            onKeyPress={e => {
                if (e.key === "Enter") {
                    handleSearch(e, false)
                }
            }}
            suffix={
                <Icon
                    name={isLoading ? "Loading" : "Search"}
                    size="20px"
                    cursor="pointer"
                    color="cbWhite"
                    onClick={(e) => handleSearch(e, true)}
                    pos="absolute"
                    top="50%"
                    right="1rem"
                    transform="translateY(-50%)"
                />
            }
        />
    )
  }
  
  export default SearchBar