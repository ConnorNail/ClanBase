import React, { useMemo } from "react";
import { Div, Text, Image } from "atomize";

export default function setupRosterTable(data) {

    function getRecentChar(charInfo) {
        // When passed an object of characters will find the characterId of the most recently played character
        let char = 0;
        let date = '';

        for (const character in charInfo.characters.data) {
            const newDate = new Date(charInfo.characters.data[character].dateLastPlayed);

            // If the new date is more recent
            if (date == '' || date < newDate) {
                // Save the character date
                date = newDate;

                // Save characterId
                char = character;
            }
        }

        return char
    }
    
    function displayEmblem(charInfo) {
        // When passed character data will display an emblem
        const path = charInfo.characters.data[getRecentChar(charInfo)].emblemPath

        return (
            <Div d="flex" flexDir="column" textAlign="center">
                <Image h="3rem" w="3rem" src={'https://www.bungie.net/' + path}/>
            </Div>
        )
    }

    function displayEmblemBackground(charInfo, children) {
        // When passed character data will display an emblem
        const colors = charInfo.characters.data[getRecentChar(charInfo)].emblemColor

        return (
            <Div bg={'rgba(' + colors.red + ',' + colors.green + ',' + colors.blue + ',1)'} h="3rem" m={{l: '-1.5rem'}}>
                <Text textColor="white" p='1rem'>
                    {children}
                </Text>
            </Div>
        )
    }

    const columns = useMemo(
        () => [
            {
                Header: "Info",
                columns: [
                    {
                        Header: "",
                        accessor: "playerProfile",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {displayEmblem(value)}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Name",
                        accessor: "bungieNetUserInfo.supplementalDisplayName",
                        Cell: ({ row }) => {

                            return (
                                <>
                                    {displayEmblemBackground(row.original.playerProfile, row.original.bungieNetUserInfo.supplementalDisplayName)}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Online",
                        accessor: "isOnline",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <Div bg={value ? "success600" : "danger600"} rounded="xl" >
                                    <Text textSize="body" m={{ l: "0.5rem", r: "0.5rem" }}>
                                        {value ? 'Online' : 'Offline'}
                                    </Text>
                                </Div>
                            )
                        }
                    },
                ]
            }
        ],
        []
    );

    return [columns, data]
}