import React, { useMemo } from "react";
import { Div, Text } from "atomize";
import { displayEmblem, displayEmblemBackground } from "../displayEmblem";

export default function useSetupQueryStatTable( data, metricId ) {
    if (data) {
        // console.log(data)
    }

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
                        accessor: "Response.characters",
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
                        accessor: "Response.profile.data.userInfo.displayName",
                        Cell: ({ cell: { value } }) => {

                            return (
                                <>
                                    {displayEmblemBackground(value, " ")}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Test",
                        accessor: "Metric",
                        Cell: props => {
                            const { original } = props.cell.row;
                            // console.log(props)
                            return (
                                <Div h="2rem" w="100%" d="flex">
                                    <Text textSize="caption" textColor={"cbWhite"} p={{ x: "0.4rem", y: "0.4rem" }}>
                                        {/* {console.log(value)} */}
                                        {original?.Response?.metrics?.data?.metrics[metricId]?.objectiveProgress?.progress}
                                    </Text>
                                </Div>
                            );
                        },
                    }
                ]
            }
        ]
    );

    return [columns, data]
}