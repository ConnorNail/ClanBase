import React, { useMemo } from "react";
import { Div, Text } from "atomize";
import { displayEmblem, displayEmblemBackground } from "../displayEmblem";

export default function setupMemberTimeTable(data) {

    function getDisplayTime(seconds) {

        const days = Math.trunc(seconds / 86400)
        // const hours = Math.trunc((seconds % 86400) / 3600)
        const hours = Math.trunc((seconds) / 3600)
        const minutes = Math.trunc((seconds % 3600) / 60)

        const displayDays = days > 1 ? days + " D " : (days > 0 ? days + " D " : "")
        const displayHours = hours > 1 ? hours + " Hours " : (hours > 0 ? hours + " Hour " : "0 Hours")
        const displayMinutes = minutes > 1 ? minutes + " M " : (minutes > 0 ? minutes + " M " : "0 M")
        const displayHourName = hours > 1 ? " Hours " : (hours > 0 ? " Hour " : " Hours")

        return (
            <Div d="flex">
                {/* <Div border={{ l: "1px solid" }} borderColor="cbBlue" w="0.1rem" m={{ y: "-0.25rem", r: "0.25rem" }}></Div> */}
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
                        accessor: "characterTime.allTime",
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
                        accessor: "characterTime.allPvE",
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
                        accessor: "characterTime.allPvECompetitive",
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
                        accessor: "characterTime.allPvP",
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
                        accessor: "characterTime.allStrikes",
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
                        accessor: "characterTime.patrol",
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
                        accessor: "characterTime.raid",
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
                        accessor: "characterTime.story",
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