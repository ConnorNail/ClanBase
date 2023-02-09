import React, { useMemo } from "react";
import { Div, Text } from "atomize";
import { displayEmblem, displayEmblemBackground } from "../displayEmblem";

export default function useSetupDiscordTimeTable(data) {

    function getDisplayTime(seconds) {

        const hours = Math.trunc((seconds) / 3600)

        const displayHourName = hours > 1 ? " Hours " : (hours > 0 ? " Hour " : " Hours")

        return (
            <Div d="flex">
                <Div h="2rem" w="100%" d="flex">
                    <Text textSize="caption" textColor="cbBlue" p={{ l: "0.4rem", y: "0.4rem", r: "0.25rem" }}>
                        {hours}
                    </Text>
                    <Text textSize="caption" textColor="cbWhite" p={{ r: "0.4rem", y: "0.4rem" }}>
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
                        Header: "Bungie Name",
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
                        Header: "Discord Name",
                        accessor: "discord.discordName",
                        Cell: ({ row }) => {

                            return (
                                <Div h="2rem" w="100%" d="flex">
                                    <Text textSize="caption" textColor={row?.original?.discord?.discordName ? "cbWhite" : "cbGrey2"} p={{ x: "0.4rem", y: "0.4rem" }}>
                                        {row?.original?.discord?.discordName ? '@' + row?.original?.discord?.discordName + '#' + row?.original?.discord?.discordDiscriminator : "No Account"}
                                    </Text>
                                </Div>
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
                        Header: "Voice Time",
                        accessor: "discord.seasonalVoiceTime",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {value || value == 0 ?
                                        getDisplayTime(value)
                                        :
                                        <Div h="2rem" w="100%" d="flex">
                                            <Text textSize="caption" textColor="cbGrey2" p={{ x: "0.4rem", y: "0.4rem" }}>
                                                NA
                                            </Text>
                                        </Div>
                                    }
                                </>
                            )
                        }
                    },
                    {
                        Header: "Messages",
                        accessor: "discord.seasonalMessageCount",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <Div h="2rem" w="100%" d="flex">
                                    <Text textSize="caption" textColor={value || value == 0 ? "cbBlue" : "cbGrey2"} p={{ x: "0.4rem", y: "0.4rem" }}>
                                        {value || value == 0 ? value : "NA"}
                                    </Text>
                                </Div>
                            )
                        }
                    }
                ]
            }
        ]
    );

    return [columns, data]
}