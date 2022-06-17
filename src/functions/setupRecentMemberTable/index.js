import React, { useMemo } from "react";
import { Div, Text } from "atomize";
import { displayEmblem, displayEmblemBackground } from "../displayEmblem";

export default function setupRecentMemberTable(data) {

    function displayDate(date) {
        const prettyDate = new Date(date).toLocaleString()

        return (
            <Div bg="info600" rounded="xl" >
                <Text textSize="body" m={{ l: "0.5rem", r: "0.5rem" }}>
                    {prettyDate}
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
                        Header: "Joined On",
                        accessor: "joinDate",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {displayDate(value)}
                                </>
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