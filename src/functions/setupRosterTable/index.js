import React, { useMemo } from "react";
import { Div, Text, Button } from "atomize";
import { displayEmblem, displayEmblemBackground } from "../displayEmblem";

export default function setupRosterTable(data, memberIndex, setMemberIndex) {

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
                        accessor: "daysSinceLastPlayed",
                        Cell: ({ row }) => {
                            return (
                                <>
                                    {row?.original?.isOnline == "Online" ?
                                        <Div d="flex" justify="center" align="center">
                                            <Text textSize="caption" textColor="cbWhite" p={{ x: "0.4rem", y: "0.4rem" }}>
                                                {row?.original?.isOnline}
                                            </Text>
                                            <Text bg="cbGreen" h="0.5rem" w="0.5rem" rounded="circle" m={{ y: "0", r: "0.4rem" }}></Text>
                                        </Div>
                                        :
                                        <Div d="flex" justify="center" align="center">
                                            <Text textSize="caption" textColor="cbBlue" p={{ l: "0.4rem", y: "0.4rem" }}>
                                                {row?.original?.daysSinceLastPlayed}
                                            </Text>
                                            <Text textSize="caption" textColor="cbWhite" p={{ x: "0.4rem", y: "0.4rem" }}>
                                                days ago
                                            </Text>
                                        </Div>}
                                </>
                            )
                        }
                    },
                    {
                        Header: "",
                        accessor: "button",
                        Cell: ({ row }) => {
                            return (
                                <Button
                                    h="2rem"
                                    textSize="caption"
                                    textColor="cbWhite"
                                    hoverTextColor="cbBlue"
                                    bg="cbGrey2"
                                    hoverBg="cbGrey1"
                                    rounded="0"
                                    id={row?.id}
                                    onClick={(a) => setMemberIndex(a?.target?.id)}
                                >
                                    Stats
                                </Button>
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