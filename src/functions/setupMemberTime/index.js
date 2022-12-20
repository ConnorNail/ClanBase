import React, { useMemo } from "react";
import { Div, Text } from "atomize";
import { displayEmblem, displayEmblemBackground } from "../displayEmblem";

export default function setupMemberTime(data) {

    function getDisplayTime(seconds) {
        return (
            <Div bg="info600" rounded="xl" >
                <Text textSize="body" m={{ l: "0.5rem", r: "0.5rem" }}>
                    {Math.trunc(seconds / 86400) + 'd ' + Math.trunc((seconds % 86400) / 3600) + 'hr ' + Math.trunc((seconds % 3600) / 60) + 'm ' + seconds % 60 + 's'}
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
                                    {displayEmblemBackground(row.original.playerProfile, row.original.bungieNetUserInfo?.supplementalDisplayName)}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Total Time",
                        accessor: "playerStats.totalTime",
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
                        accessor: "playerStats.allPvE.totalTime",
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
                        accessor: "playerStats.allPvECompetitive.totalTime",
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
                        accessor: "playerStats.allPvP.totalTime",
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
                        accessor: "playerStats.allStrikes.totalTime",
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
                        accessor: "playerStats.patrol.totalTime",
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
                        accessor: "playerStats.raid.totalTime",
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
                        accessor: "playerStats.story.totalTime",
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
        ],
        [data]
    );

    return [columns, data]
}