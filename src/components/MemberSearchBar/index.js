import React, { useState, useEffect } from 'react';
import { Input, Icon, Dropdown, Div, Anchor, Col } from "atomize";

const MemberSearchBar = ({ memberInfo, memberProfiles, setMemberIndex }) => {
    if (memberInfo && memberProfiles) {
        const memberInfoList = memberInfo?.Response?.results
        const memberProfileList = memberProfiles

        const [input, setInput] = useState('');
        const [showDropdown, setShowDropdown] = useState(false);

        // Creat list of names
        const names = []
        for (let i = 0; i < memberInfoList.length; i++) {
            if (memberInfoList[i]?.bungieNetUserInfo?.supplementalDisplayName) {
                names.push({ name: memberInfoList[i]?.bungieNetUserInfo?.supplementalDisplayName, index: i })
            } else if ({ name: memberProfileList[i]?.Response?.profile?.data?.userInfo?.bungieGlobalDisplayName, index: i }) {
                names.push({ name: memberProfileList[i]?.Response?.profile?.data?.userInfo?.bungieGlobalDisplayName, index: i })
            } else {
                return null
            }
        }

        // Filter names by input for seggestions
        let suggestions = []
        suggestions = names.filter((data, index) => {
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.name.toLocaleLowerCase().startsWith(input.toLocaleLowerCase())
        });
        suggestions.splice(4)

        // List elements
        const menuList = (
            <Div p={{ x: "1rem", y: "0.5rem" }} bg="cbGrey1">
                {suggestions.map((suggestion, index) => (
                    <Anchor d="block" p={{ y: "0.25rem" }} key={index} border={{ b: "1px solid" }} borderColor="cbWhite" textColor="cbGrey3" hoverTextColor="cbBlue"
                        onClick={() => {
                            setMemberIndex(suggestion.index)
                            setShowDropdown(false)
                            setInput('')
                        }}
                    >
                        {suggestion.name}
                    </Anchor>
                ))}
            </Div>
        );

        // Update input while typing
        function handleSearch(e) {
            setInput(e.target.value)
            setShowDropdown(true);
        }

        // Close dropdown when empty
        useEffect(() => {
            if (input.length > 0) {
                setShowDropdown(true)
            } else {
                setShowDropdown(false)
            }
        }, [input]);

        return (
            <>
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
                            placeholder="Clan Member Name"
                            rounded="circle"
                            bg="cbGrey1"
                            borderColor="cbWhite"
                            hoverBorderColor="cbWhite"
                            textColor="cbWhite"
                            focusTextColor="cbWhite"
                            hoverTextColor="cbWhite"
                            h="2rem"
                            value={input}
                            onChange={e => { handleSearch(e) }}
                        />
                    </Col>
                </Dropdown>
            </>
        )
    }

    return null
}

export default MemberSearchBar