import React, { useMemo } from "react";
import { Div, Text } from "atomize";
import { displayEmblem, displayEmblemBackground } from "../displayEmblem";

export default function useSetupMemberTimeTable(data) {

    function getDisplayTime(seconds) {

        const hours = Math.trunc((seconds) / 3600)

        const displayHourName = hours > 1 ? " Hours " : (hours > 0 ? " Hour " : " Hours")

        return (
            <Div d="flex">
                <Div  h="2rem" w="100%" d="flex">
                <Text textSize="caption" textColor="cbBlue" p={{l: "0.4rem", y: "0.4rem", r: "0.25rem"}}>
                        {hours}
                    </Text>
                    <Text textSize="caption" textColor="cbWhite" p={{r: "0.4rem", y: "0.4rem"}}>
                        {displayHourName}
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
                        Header: "Name",
                        accessor: "bungieInfo.supplementalDisplayName",
                        Cell: ({ row }) => {

                            return (
                                <>
                                    {displayEmblemBackground(row?.original?.bungieInfo?.supplementalDisplayName, row?.original?.memberProfile?.data?.userInfo?.bungieGlobalDisplayName)}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Total Time",
                        accessor: "characterTime.seasonal.allTime",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {getDisplayTime(value)}
                                </>
                            )
                        }
                    },
                    {
                        Header: "PvE Time",
                        accessor: "characterTime.seasonal.allPvE",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {getDisplayTime(value)}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Competitive PvE Time",
                        accessor: "characterTime.seasonal.allPvECompetitive",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {getDisplayTime(value)}
                                </>
                            )
                        }
                    },
                    {
                        Header: "PvP Time",
                        accessor: "characterTime.seasonal.allPvP",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {getDisplayTime(value)}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Strike Time",
                        accessor: "characterTime.seasonal.allStrikes",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {getDisplayTime(value)}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Patrol Time",
                        accessor: "characterTime.seasonal.patrol",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {getDisplayTime(value)}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Raid Time",
                        accessor: "characterTime.seasonal.raid",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {getDisplayTime(value)}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Story Time",
                        accessor: "characterTime.seasonal.story",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {getDisplayTime(value)}
                                </>
                            )
                        }
                    },
                ]
            }
        ]
    );

    return [columns, data]
}