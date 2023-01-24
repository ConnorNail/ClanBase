import React, { useMemo } from "react";
import { Div, Text } from "atomize";
import { displayEmblem, displayEmblemBackground } from "../displayEmblem";

export default function useSetupRecentMemberTable(data) {

    function displayDate(date) {
        const joinedDate = new Date(date)
        const currentTime = new Date()
        const diffTime = Math.abs(currentTime - joinedDate)
        const daysAgo = Math.trunc(diffTime / 1000 / 60 / 60 / 24)
        const dateDisplay = daysAgo > 1 ? " Days Ago " : (daysAgo > 0 ? " Day Ago " : " Days Ago")

        return (
            <Div d="flex">
                <Div h="2rem" w="100%" d="flex">
                    <Text textSize="caption" textColor="cbWhite" p={{ l: "0.4rem", y: "0.4rem"}}>
                        Joined
                    </Text>
                    <Text textSize="caption" textColor="cbBlue" p={{ l: "0.25rem", y: "0.4rem", r: "0.25rem" }}>
                        {daysAgo}
                    </Text>
                    <Text textSize="caption" textColor="cbWhite" p={{ r: "0.4rem", y: "0.4rem" }}>
                        {dateDisplay}
                    </Text>
                </Div>
            </Div>
        )
    }

    const columns = useMemo(
        () => [
            {
                Header: " ",
                columns: [
                    {
                        Header: "",
                        accessor: "characterProfiles",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {displayEmblem(value)}
                                </>
                            )
                        }
                    },
                    {
                        Header: " ",
                        accessor: "bungieNetUserInfo.supplementalDisplayName",
                        Cell: ({ row }) => {

                            return (
                                <>
                                    {displayEmblemBackground(row?.original?.bungieInfo?.supplementalDisplayName, row?.original?.memberProfile?.data?.userInfo?.bungieGlobalDisplayName)}
                                </>
                            )
                        }
                    },
                    {
                        Header: " ",
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