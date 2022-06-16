import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../../../components/DefaultLayout'
import Table from "../../../components/Table";
import React, { useState, useEffect, useMemo } from "react";
import { Div, Text, Image } from "atomize";

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key': apikey }

export default function Members({ clanid }) {
    // an alternative hook based API
    const [css] = useStyletron()

    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'https://www.bungie.net/Platform/GroupV2/' + clanid + '/Members/';

        const current = new Date()
        const startDate = current.getFullYear() + '/' + ('0' + (current.getMonth() + 1)).slice(-2) + '/' + ('0' + current.getDate()).slice(-2)
        const past = new Date()
        past.setDate(past.getDate() - 31)
        const endDate = past.getFullYear() + '/' + ('0' + (past.getMonth() + 1)).slice(-2) + '/' + ('0' + past.getDate()).slice(-2)

        async function getData() {
            const out = fetch(url, { headers })
                .then((res) => res.json())
                .then((data) => {
                    console.log("old", data.Response.results)
                    return data.Response.results
                })
                .then(async (data) => {
                    await Promise.all(
                        data.map((res, i, array) => {
                            return fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Stats/', { headers })
                                .then((res) => res.json())
                                .then((data) => { return { playerStats: data.Response.mergedAllCharacters.results } })
                                .then(async (data) => {
                                    const playerTime = await fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Profile/' + res.destinyUserInfo.membershipId + '/?components=100', { headers })
                                        .then((res) => res.json())
                                        .then(async (data) => {
                                            const char1 = await fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Character/' + data.Response.profile.data.characterIds[0] + '/Stats/?dayend=' + startDate + '&daystart=' + endDate + '&periodType=Daily', { headers })
                                                .then((res) => res.json())
                                                .then((data) => { return { playerTimeChar1: data.Response } })
                                                .catch((error) => {
                                                    console.error('Error:', error);
                                                })
                                            if (data.Response.profile.data.characterIds.length > 1) {
                                                const char2 = await fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Character/' + data.Response.profile.data.characterIds[1] + '/Stats/?dayend=' + startDate + '&daystart=' + endDate + '&periodType=Daily', { headers })
                                                    .then((res) => res.json())
                                                    .then((data) => { return { playerTimeChar2: data.Response } })
                                                    .catch((error) => {
                                                        console.error('Error:', error);
                                                    })
                                                if (data.Response.profile.data.characterIds.length > 2) {
                                                    const char3 = await fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Character/' + data.Response.profile.data.characterIds[2] + '/Stats/?dayend=' + startDate + '&daystart=' + endDate + '&periodType=Daily', { headers })
                                                        .then((res) => res.json())
                                                        .then((data) => { return { playerTimeChar3: data.Response } })
                                                        .catch((error) => {
                                                            console.error('Error:', error);
                                                        })
                                                    return combineTime({ ...char1, ...char2, ...char3 })
                                                }
                                                return combineTime({ ...char1, ...char2 })
                                            } else {
                                                return combineTime(char1)
                                            }
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                        })

                                    array[i] = { ...res, ...data, ...playerTime }
                                    console.log("update stats")
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                })
                        })
                    )
                    console.log("new", data)
                    setData(data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                })

            console.log(await out)
        }
        getData()

        function combineTime(timeStats) {
            let time = {
                allPvE: 0,
                allPvECompetitive: 0,
                allPvP: 0,
                allStrikes: 0,
                patrol: 0,
                raid: 0,
                story: 0,
                total: 0,
            }

            Object.keys(timeStats).forEach((character) => {
                Object.keys(timeStats[character]).forEach((activity) => {
                    const daily = timeStats[character][activity].daily

                    if (typeof daily != 'undefined') {
                        for (let i = 0; i < daily.length; i++) {
                            time[activity] = time[activity] + daily[i].values.totalActivityDurationSeconds.basic.value
                        }
                    }
                })
            })

            time.total = time.allPvE + time.allPvP
            return { playerTime: time }
        }

    }, [])

    function getDisplayTime(seconds) {
        return Math.trunc(seconds / 86400) + 'd ' + Math.trunc((seconds % 86400) / 3600) + 'hr ' + Math.trunc((seconds % 3600) / 60) + 'm ' + seconds % 60 + 's'
    }

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
                        Header: "Original Platform",
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
                        Header: "Online",
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
                        accessor: "playerStats.allPvP.allTime.killsDeathsRatio.basic.displayValue",
                    },
                    {
                        Header: "Combat Rating",
                        accessor: "playerStats.allPvP.allTime.combatRating.basic.displayValue",
                    },
                ]
            },
            {
                Header: "Activity in the last 31 days",
                columns: [
                    {
                        Header: "Time in PvP",
                        accessor: "playerTime.allPvP",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <Div>
                                    {getDisplayTime(value)}
                                </Div>
                            )
                        }
                    },
                    {
                        Header: "Time in PvE",
                        accessor: "playerTime.allPvE",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <Div>
                                    {getDisplayTime(value)}
                                </Div>
                            )
                        }
                    },
                    {
                        Header: "Total Time",
                        accessor: "playerTime.total",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <Div>
                                    {getDisplayTime(value)}
                                </Div>
                            )
                        }
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
                    CLAN MEMBERS
                </Text>
            </Div>
            <Div>
                <Table columns={columns} data={data} />
            </Div>
        </DefaultTemplate>
    )
}

export async function getServerSideProps(context) {
    const { clanid } = context.query

    return {
        props: {
            clanid: clanid
        },
    }
}