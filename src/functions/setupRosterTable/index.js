import React, { useMemo } from "react";
import { Div, Text, Image } from "atomize";
import { displayEmblem, displayEmblemBackground } from "../displayEmblem";

export default function setupRosterTable(data) {

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
                        accessor: "isOnline",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <Div d="flex" justify="center" align="center">
                                    <Text textSize="caption" textColor="cbWhite" p={{ x: "0.4rem", y: "0.4rem"}}>
                                        {value}
                                    </Text>
                                    <Text bg={value == "Online" ? "success600" : "brand700"} h="0.5rem" w="0.5rem" rounded="circle" m={{ y: "0", r: "0.4rem"}}></Text>
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