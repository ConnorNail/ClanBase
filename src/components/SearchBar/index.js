import { styled, useStyletron } from 'styletron-react'
import React, { useState, useEffect } from 'react';
import { Input, Icon } from "atomize";
import { useRouter } from 'next/router'
import getAuthInfo from '../../functions/getAuthInfo'

const SearchBar = () => {
    const [css] = useStyletron()

    const router = useRouter();

    const headers = getAuthInfo();

    const [input, setInput] = useState('')

    function handleSearch(e, button) {
        if (input.length > 2) {
            search()
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
            bg="#E72F1DBF"
            borderColor="#F1E9E6"
            textColor="#F1E9E6"
            h="3rem"
            onInput={e => {setInput(e.target.value)}}
            onKeyPress={e => {
                if (e.key === "Enter") {
                    handleSearch(e, false)
                }
            }}
            suffix={
                <Icon
                    name="Search"
                    size="20px"
                    cursor="pointer"
                    color="#F1E9E6"
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