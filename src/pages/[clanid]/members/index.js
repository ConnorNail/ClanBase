import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../../../components/DefaultLayout'
import Table from "../../../components/Table";
import React, { useState, useEffect, useMemo } from "react";
import { Div, Text, Image } from "atomize";

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key': apikey }

export default function TestTable({ data, playerData }) {
    // an alternative hook based API
    const [css] = useStyletron()

    console.log(data)

    const columns = useMemo(
        () => [
            {
                Header: "Info",
                columns: [
                    {
                        Header: "Emblem",
                        accessor: "bungieNetUserInfo.iconPath",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    <Image maxW="3rem" src={'https://www.bungie.net/' + value} />
                                </>
                            )
                        }
                    },
                    {
                        Header: "Name",
                        accessor: "destinyUserInfo.displayName"
                    },
                    {
                        Header: "User ID",
                        accessor: "destinyUserInfo.membershipId"
                    },
                    {
                        Header: "Join Date",
                        accessor: "joinDate"
                    },
                    {
                        Header: "Last Seen On",
                        accessor: "destinyUserInfo.membershipType",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {value == 1 ? 'Xbox' : value == 2 ? 'Playstation' : value == 3 ? 'Steam' : value == 4 ? 'Blizzard' : value == 5 ? 'Stadia' : 'error'}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Name",
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
            },
            {
                Header: "Stats",
                columns: [
                    {
                        Header: "KD",
                        accessor: "Response.mergedAllCharacters.results.allPvP.allTime.killsDeathsRatio.basic.displayValue",
                    },
                    {
                        Header: "Combat Rating",
                        accessor: "Response.mergedAllCharacters.results.allPvP.allTime.combatRating.basic.displayValue",
                    },
                ]
            }
        ],
        []
    );

    return (
        <DefaultTemplate>
            <Div>
                <Text textSize="display1" textColor="brand900" m={{ l: "1rem" }}>
                    Table Test with React Table
                </Text>
            </Div>
            <Table columns={columns} data={data} />
        </DefaultTemplate>
    )
}

export async function getServerSideProps(context) {
    const { clanid } = context.query
    const url1 = 'https://www.bungie.net/Platform/GroupV2/' + clanid + '/Members/' //House Fruit: 2084197 Fruit Snaccs: 4599535

    // Clan details
    const res1 = await fetch(url1, { headers })
    const json1 = await res1.json()

    const playerData = await Promise.all(
        json1.Response.results.map((res) =>
            fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Stats/', { headers }).then((res) => res.json())
        )
    )

    function mergeArrayObjects(arr1, arr2) {
        return arr1.map((item, i) => {
            return Object.assign({}, item, arr2[i])
        })
    }

    const merged = mergeArrayObjects(json1.Response.results, playerData)

    return {
        props: {
            data: merged
        },
    }
}