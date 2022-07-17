import React, { useMemo } from "react";
import { Div, Text, Image } from "atomize";
import { displayEmblem, displayEmblemBackground } from "../displayEmblem";

export default function setupRosterTable(data) {

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
                                    {displayEmblemBackground(row.original.playerProfile, row.original.destinyUserInfo.LastSeenDisplayName)}
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