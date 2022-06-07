import { styled, useStyletron } from 'styletron-react'
import React, { useState } from 'react';
import { Input, Icon } from "atomize";
import { useRouter } from 'next/router'

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key' : apikey }

const SearchBar = ({ children }) => {
    const [css] = useStyletron()

    const router = useRouter()

    const tempInput = ''
    const [input, setInput] = useState('')

    function handleSearch(e) {
        setInput(tempInput)
        console.log(tempInput)
        fetchData()
    }

    const fetchData = async () => {
        console.log(tempInput)
        const res = await fetch('https://www.bungie.net/Platform/GroupV2/NameV2/', { method: 'post', headers, body: JSON.stringify({
            'groupName': tempInput,
            'groupType': 1,
        })})
        console.log(res)
        const json = await res.json()
        console.log(json.Response.detail.groupId)

        router.push('/'+json.Response.detail.groupId)
    }

    return (
        <Input
            placeholder="Search"
            m="3rem"
            onInput={e => {tempInput = e.target.value}}
            onKeyPress={e => {
                if (e.key === "Enter") {
                    handleSearch(e)
                }
            }}
            suffix={
                <Icon
                    name="Search"
                    size="20px"
                    cursor="pointer"
                    onClick={e => handleSearch(e)}
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