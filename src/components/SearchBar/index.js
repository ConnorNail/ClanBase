import { styled, useStyletron } from 'styletron-react'
import React, { useState } from 'react';
import { Input, Icon } from "atomize";
import { useRouter } from 'next/router'

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key' : apikey }

const SearchBar = ({ children }) => {
    const [css] = useStyletron()

    const router = useRouter()

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
            router.push('/'+data.Response.detail.groupId)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <Input
            placeholder="Enter Clan Name"
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